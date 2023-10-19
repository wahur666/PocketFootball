import { io } from "socket.io-client";
import { Main } from "./ui/main.tsx";
import { h, render } from "preact";
import "../css/tailwind.css";
import "@picocss/pico/css/pico.min.css";
import "../css/style.css";

const socket = io("http://192.168.1.111:4000/");

socket.on("connect", () => {
    console.log("qew");
});

socket.on("connect_error", (e) => {
    console.log("failed", e);
});

socket.on("disconnect", reason => {
    console.log("disonnect", reason);
});

render(h(Main, {}), document.getElementById("root")!)
