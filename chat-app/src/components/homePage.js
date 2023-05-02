import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const joinRoom = () => {
    if (roomId.length === 0) {
      alert("Room id cannot be empty!");
      return;
    }
    navigate(`/chatroom/${roomId}`);
  };

  return (
    <div>
      <p>Enter room id to join chat room</p>
      <input
        type="text"
        placeholder="Room Id"
        onChange={(e) => setRoomId(e.target.value)}
      ></input>
      <button onClick={joinRoom}>Join</button>
    </div>
  );
};

export default HomePage;
