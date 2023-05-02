import "./App.css";
import { io } from "socket.io-client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/homePage";
import ChatRoom from "./components/chatRoom";

// Port of your backend server
const port = 5000;

const socket = io(`http://localhost:${port}`);
// Using this as dummy user ids
const userId = Date.now();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/chatroom/:id",
    element: <ChatRoom socket={socket} userId={userId} />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
