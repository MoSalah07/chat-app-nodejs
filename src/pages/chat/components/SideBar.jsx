/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "./Header";
import { Tabs, Tab, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ChatList from "./ChatList";

function SideBar({ user, onlineUsers, setRoomData, roomData, setAllMsg }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <aside className="w-[25vw] flex flex-col h-screen">
      <Header user={user} />
      <Tabs
        aria-label="basic tabs example"
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ minHeight: "inherit" }}
      >
        <Tab
          icon={<ChatBubbleOutlineIcon />}
          label={
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Chat List
            </Typography>
          }
          iconPosition="start"
          sx={{ minHeight: "inherit" }}
        />
        <Tab
          icon={<PersonIcon />}
          label={
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              User List
            </Typography>
          }
          iconPosition="start"
        />
      </Tabs>
      {/* Show List When choise Chat List Or User List*/}
      {value === 0 && (
        <ChatList
          currentUser={user}
          onlineUsers={onlineUsers}
          roomData={roomData}
          setRoomData={setRoomData}
          setAllMsg={setAllMsg}
        />
      )}
      {value === 1 && <div>1</div>}
    </aside>
  );
}

export default SideBar;
