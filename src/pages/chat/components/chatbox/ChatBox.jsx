/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import HeaderChatBox from "./HeaderChatBox";
import ChatArea from "./ChatArea";
import Footer from "./Footer";

function ChatBox({
  roomData,
  handleSendMsg,
  allMsg,
  session,
  handleDeleteMsg,
  replyMsg,
  setReplyMsg,
}) {
  return (
    <Box
      sx={{
        width: "50vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {roomData?.room ? (
        <>
          <HeaderChatBox roomData={roomData} />
          <ChatArea
            allMsg={allMsg}
            session={session}
            handleDeleteMsg={handleDeleteMsg}
            setReplyMsg={setReplyMsg}
          />
          <Footer
            handleSendMsg={handleSendMsg}
            replyMsg={replyMsg}
            setReplyMsg={setReplyMsg}
          />
        </>
      ) : (
        <>Please Select a User to Chat</>
      )}
    </Box>
  );
}

export default ChatBox;
