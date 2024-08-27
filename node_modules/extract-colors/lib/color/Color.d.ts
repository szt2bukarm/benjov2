/**
 * Informations like saturation or count of pixels in image.
 *
 * @class
 * @classdesc Calculate some informations and store data about color.
 */
export default class Color {
    _red: number;
    _green: number;
    _blue: number;
    _hex: number;
    _count: number;
    private __saturation;
    private __hue;
    private __lightness;
    private __intensity;
    /**
     * Set red, green and blue colors to create the Color object.
     */
    constructor(red: number, green: number, blue: number, hex?: number);
    /**
     * Distance between two colors.
     * - Minimum is 0 (between two same colors)
     * - Maximum is 1 (for example between black and white)
     */
    static distance(colorA: Color, colorB: Color): number;
    clone(): Color;
    updateHSL(): void;
    /**
     * Hue from 0 to 1
     */
    get _hue(): number;
    /**
     * Saturation from 0 to 1
     */
    get _saturation(): number;
    /**
     * Lightness from 0 to 1
     */
    get _lightness(): number;
    /**
     * Color intensity from 0 to 1
     */
    get _intensity(): number;
}
