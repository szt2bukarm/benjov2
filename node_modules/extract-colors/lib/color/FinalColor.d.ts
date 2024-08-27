import { FinalColor } from "../types/Color";
import Color from "./Color";
/**
 * Normalize color
 *
 * @param color Initial color
 * @param pixels Pixel count of this color
 *
 * @returns Normalized color
 */
export declare const createFinalColor: (color: Color, pixels: number) => FinalColor;
