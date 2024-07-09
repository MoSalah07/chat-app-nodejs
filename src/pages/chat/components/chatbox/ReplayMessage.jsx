/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ReplayMessage({ replyMsg, setReplyMsg }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "57px",
        background: "#ddd",
        p: 1,
        borderLeft: "4px solid",
        borderColor: "primary.light",
      }}
    >
      <Typography>{replyMsg.sender.name}</Typography>
      <Typography variant="caption">{replyMsg.msg}</Typography>
      <Button
        onClick={() => setReplyMsg(null)}
        aria-label="close"
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <CloseIcon />
      </Button>
    </Box>
  );
}

export default ReplayMessage;
