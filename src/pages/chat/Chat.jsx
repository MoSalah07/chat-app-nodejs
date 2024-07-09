import { useCallback, useEffect, useRef, useState } from "react";
// Mui
import { Paper } from "@mui/material";
// Components
import SideBar from "./components/SideBar";
import ChatBox from "./components/chatbox/ChatBox";
import Profile from "./components/profile/Profile";
// React Router Dom
import { useNavigate } from "react-router-dom";
// Socket
import io from "socket.io-client";
// Axios
import axios from "axios";

function Chat() {
  const [session] = useState(
    JSON.parse(localStorage.getItem("user-session")) || null
  );
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [roomData, setRoomData] = useState({ room: null, receiver: null });
  const [allMsg, setAllMsg] = useState([]);
  const [replyMsg, setReplyMsg] = useState(null);
  const socketRef = useRef();

  // const { state } = useLocation();
  const navigate = useNavigate();

  console.log(replyMsg);

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
    const socket = io.connect("http://localhost:5000");
    socketRef.current = socket;
    // console.log(socket);
    socket.on("connect", () => setIsConnected(true));
    socket.off("disconnect", () => setIsConnected(false));
  }, [navigate, session]);

  useEffect(() => {
    if (isConnected) {
      socketRef.current.emit("ADD_USER", session);
      socketRef.current.on("USER_ADDED", (usersOnline) => {
        setOnlineUsers(usersOnline);
      });

      socketRef.current.on("RECEIVER_MSG", (data) => {
        // console.log(data);
        setAllMsg((prevMessages) => [...prevMessages, data]);
      });

      socketRef.current.on("DELETED_MSG", (data) => {
        // console.log(data);
        setAllMsg((prevMessages) => {
          return prevMessages.filter((message) => message._id !== data.msg._id);
        });
      });

      return () => socketRef.current.disconnect();
    }
  }, [isConnected, session]);

  const handleSendMsg = useCallback(
    (msg) => {
      if (socketRef.current.connected) {
        let sender = session;
        sender.socketId = socketRef.current.id;
        const data = {
          msg,
          receiver: roomData.receiver,
          sender,
        };
        if (replyMsg) {
          data.replyMsg = replyMsg;
        }
        socketRef.current.emit("SEND_MSG", data);
        setReplyMsg(null);
        // setAllMsg((prevMessages) => [...prevMessages, data]);
      }
    },
    [replyMsg, roomData.receiver, session]
  );

  const handleDeleteMsg = useCallback(
    async (id) => {
      try {
        const {
          data: { data },
        } = await axios.delete(`http://localhost:5000/message/${id}`);
        if (socketRef.current.connected) {
          const infoDataMessage = {
            msg: data,
            receiver: roomData.receiver,
          };
          console.log(data);
          socketRef.current.emit("DELETE_MSG", infoDataMessage);
          setAllMsg((prevMessages) => {
            return prevMessages.filter((message) => message._id !== data._id);
          });
        }
      } catch (err) {
        return err;
      }
    },
    [roomData.receiver]
  );

  if (!session) return null;

  return (
    <Paper square elevation={0} sx={{ width: "100%", display: "flex" }}>
      <SideBar
        user={session}
        onlineUsers={onlineUsers}
        roomData={roomData}
        setRoomData={setRoomData}
        setAllMsg={setAllMsg}
      />
      <ChatBox
        roomData={roomData}
        handleSendMsg={handleSendMsg}
        allMsg={allMsg}
        session={session}
        handleDeleteMsg={handleDeleteMsg}
        replyMsg={replyMsg}
        setReplyMsg={setReplyMsg}
      />
      <Profile user={session} />
    </Paper>
  );
}

export default Chat;
