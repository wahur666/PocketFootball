import "./main.css";
import Phaser from "phaser";
import { useEffect, useLayoutEffect, useRef } from "preact/hooks";
import GameScene from "../GameScene.ts";
import ScaleModes = Phaser.Scale.ScaleModes;


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
        mode: ScaleModes.NONE
    },
    backgroundColor: "#107210",
    render: {
        pixelArt: true
    },
    disableContextMenu: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: SHARED_CONFIG.debug.arcade
        }
    }
};


export function Main() {
    let game: Phaser.Game;
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        game = new Phaser.Game({
            ...config,
            width: canvas.current!.getBoundingClientRect().width,
            height: canvas.current!.getBoundingClientRect().height!,
            canvas: canvas.current!
        });
        return () => game.destroy(true, false);
    }, []);

    return (<div
        class={`flex flex-col absolute top-0 bottom-0 left-0 right-0  container justify-between`} style={{
            backgroundColor: "#107210"
    }}>
        <div class={`flex justify-center `}>
            <h1 class={"p-0 m-0"}>Pocket Football</h1>
        </div>
        <canvas id={"cv1"} ref={canvas} class={"flex-1"} />
        <div class={""}>
            <button>Hollow world</button>
        </div>
    </div>);
}
