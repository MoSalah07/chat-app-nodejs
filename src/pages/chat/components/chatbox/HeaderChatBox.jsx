/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { orange } from "@mui/material/colors";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";

function HeaderChatBox({ roomData }) {
  return (
    <nav className="w-full">
      <Card
        sx={{
          maxWidth: "100%",
          bgcolor: orange["400"],
          borderRadius: 0,
        }}
      >
        <CardHeader
          avatar={
            <>
              <div className="flex items-center justify-center mr-2">
                <IconButton>
                  <ArrowBackIcon className="text-orange-950" />
                </IconButton>
              </div>
              <Avatar>R</Avatar>
            </>
          }
          action={
            <>
              <IconButton aria-label="settings" sx={{ marginTop: "8px" }}>
                <PermPhoneMsgIcon />
              </IconButton>
            </>
          }
          sx={{ textTransform: "capitalize" }}
          title={roomData.receiver.name}
          subheader={
            <Typography sx={{ textTransform: "lowercase" }} variant="caption">
              {roomData.receiver.email}
            </Typography>
          }
        />
      </Card>
    </nav>
  );
}

export default HeaderChatBox;
