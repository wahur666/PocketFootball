import Unit from "./Unit.ts";

export enum GridElementType {
    OutOfBound,
    Goal,
    Field
}

export class GridElement {
    x: number;
    y: number;
    gridElementType: GridElementType;
    unit: Unit | null;

    constructor(x: number, y: number, gridElementType: GridElementType) {
        this.x = x;
        this.y = y;
        this.gridElementType = gridElementType;
        this.unit = null;
    }
}
