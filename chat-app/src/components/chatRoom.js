import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = ({ socket, userId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id && id.length > 0) {
      socket.emit("join_session", { roomId: id });
    }

    return () => {
      socket.emit("leave_session", { roomId: id });
    };
  }, [id]);

  const updateMessagesState = (messageToSend, senderId) => {
    console.log(senderId);
    const messagesClone = [...messages];
    messagesClone.push({ message: messageToSend, sender: senderId });
    setMessages(messagesClone);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      updateMessagesState(data.message, data.userId);
    });
  }, [socket, messages]);

  const noMessages = <p>No messages to show</p>;

  const renderMessage = (messageObj, key, isMessageReceived) => (
    <div
      key={`message-${key}`}
      className={`message-container ${
        isMessageReceived ? "" : "justify-flex-end"
      }`}
    >
      <p>
        {messageObj.message} (
        {!isMessageReceived
          ? `Received from ${messageObj.sender}`
          : `Sent by You`}
        )
      </p>
    </div>
  );

  const renderMessages = useMemo(
    () => (
      <>
        {messages.map((message, key) =>
          renderMessage(message, key, message.sender === userId)
        )}
      </>
    ),
    [messages]
  );

  const sendMessage = () => {
    if (message.length === 0) {
      alert("Message cannot be empty!");
      return;
    }

    const messageToSend = message;
    socket.emit("send_message", { roomId: id, message: messageToSend, userId });
    updateMessagesState(messageToSend, userId);
    setMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1>Chat room</h1>
      <div className="chat-box">
        {messages.length === 0 ? noMessages : renderMessages}
        <input
          type="text"
          placeholder="Enter message here"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          value={message}
        />

        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default ChatRoom;
