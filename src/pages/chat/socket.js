import { io } from "socket.io-client";
const URLDOMAIN = "http://localhost:5000";

const socket = io(URLDOMAIN);

export default socket;
