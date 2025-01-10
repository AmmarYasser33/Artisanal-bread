import { io } from "socket.io-client";
import { BASE_URL } from "./util/Globals";

const socket = io(BASE_URL, {
  transports: ["websocket"],
});

export default socket;
