import * as Phaser from "phaser";
import ScaleModes = Phaser.Scale.ScaleModes;
import GameScene from "./GameScene.ts";
export const SHARED_CONFIG = {
    width: 1280,
    height: 720,
    debug: {
        arcade: false,
        hexes: false,
        navMesh: false,
        autoLoadGame: true,
    },
};


const config: Phaser.Types.Core.GameConfig & typeof SHARED_CONFIG = {
    ...SHARED_CONFIG,
    type: Phaser.WEBGL,
    scene: [GameScene],
    scale: {
        mode: ScaleModes.RESIZE,
    },
    backgroundColor: "#021114",
    render: {
        pixelArt: true,
    },
    canvas: document.getElementById("cv1") as HTMLCanvasElement,
    disableContextMenu: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: SHARED_CONFIG.debug.arcade,
        },
    },
};

let game: Phaser.Game;

window.addEventListener("load", () => {
    game = new Phaser.Game(config);
})

window.addEventListener("unload", () => {
    game.destroy(true, false);
})

window.addEventListener("resize", () => {
    let canvas = document.getElementById("cv1") as HTMLCanvasElement
    console.log(canvas.width, canvas.height);
})

console.log("Hello world");
