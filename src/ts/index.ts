import * as Phaser from "phaser";
import ScaleModes = Phaser.Scale.ScaleModes;
import GameScene from "./GameScene.ts";
import { io } from "socket.io-client";
import { Main } from "./ui/main.tsx";
import { render } from "preact";
import "../css/tailwind.css";
import "@picocss/pico/css/pico.min.css";
import "../css/style.css";

export const SHARED_CONFIG = {
    width: 300,
    height: 600,
    debug: {
        arcade: false,
        hexes: false,
        navMesh: false,
        autoLoadGame: true
    }
};


const config: Phaser.Types.Core.GameConfig & typeof SHARED_CONFIG = {
    ...SHARED_CONFIG,
    type: Phaser.WEBGL,
    scene: [GameScene],
    scale: {
        mode: ScaleModes.RESIZE
    },
    backgroundColor: "#107210",
    render: {
        pixelArt: true
    },
    canvas: document.getElementById("cv1") as HTMLCanvasElement,
    disableContextMenu: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: SHARED_CONFIG.debug.arcade
        }
    }
};

let game: Phaser.Game;

window.addEventListener("load", () => {
    game = new Phaser.Game(config);
});

window.addEventListener("unload", () => {
    game.destroy(true, false);
});

window.addEventListener("resize", () => {
    let canvas = document.getElementById("cv1") as HTMLCanvasElement;
    console.log(canvas.width, canvas.height);
});

console.log("Hello world");

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

render(Main(), document.getElementById("root")!)
