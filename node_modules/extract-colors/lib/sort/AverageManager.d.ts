import Color from "../color/Color";
export declare class AverageManager {
    _hue: number;
    _saturation: number;
    _lightness: number;
    private _groups;
    constructor(hue: number, saturation: number, lightness: number);
    addColor(color: Color): void;
    getGroups(): Color[];
}
