/* eslint-disable react/prop-types */
import { Box, Stack, Chip, List } from "@mui/material";
import SinderMsg from "./SinderMsg";
import ReceiverMsg from "./ReceiverMsg";

function ChatArea({ allMsg, session, handleDeleteMsg, setReplyMsg }) {
  return (
    <Box sx={{ overflowY: "auto", flex: "1 0 0", background: "#f9f9f9" }}>
      <Stack
        direction="row"
        justifyContent={"center"}
        sx={{
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "#f9f9f9",
        }}
      >
        <Chip label="Today" />
      </Stack>
      <List
        sx={{
          p: 0,
          overflowY: "auto",
          flex: "1 0 0",
          gap: "2px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {allMsg &&
          Array.isArray(allMsg) &&
          allMsg.length > 0 &&
          allMsg.map((message) =>
            message.sender._id === session._id ? (
              <SinderMsg
                key={message._id}
                handleDeleteMsg={handleDeleteMsg}
                setReplyMsg={setReplyMsg}
                {...message}
                message={message}
                session={session}
              />
            ) : (
              <ReceiverMsg
                key={message._id}
                handleDeleteMsg={handleDeleteMsg}
                setReplyMsg={setReplyMsg}
                {...message}
                message={message}
                session={session}
              />
            )
          )}
      </List>
    </Box>
  );
}

export default ChatArea;
