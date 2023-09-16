import * as Phaser from "phaser";

export default abstract class Unit extends Phaser.GameObjects.Sprite {

    teamRed: boolean;
    SIZE = 64;
    graphics: Phaser.GameObjects.Graphics;
    selected: boolean = false;

    protected constructor(scene: Phaser.Scene, x: number, y: number, texture: string, teamRed: boolean) {
        super(scene, x, y, texture);
        this.teamRed = teamRed;
        this.scene.add.existing(this);
        this.graphics = this.scene.add.graphics();
    }

    update(time: number, delta: number) {
        this.graphics.clear();
        if (this.selected) {
            this.graphics.lineStyle(2, 0xFFFF00);
            this.graphics.strokeCircle(this.x, this.y, this.SIZE * this.scale * 0.66)
        }
    }


}
