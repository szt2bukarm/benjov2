import Color from "../color/Color";
export declare class AverageGroup {
    colors: Color[];
    private _average;
    addColor(color: Color): void;
    isSamePalette(color: Color, hue: number, saturation: number, lightness: number): boolean;
    get average(): Color;
}
