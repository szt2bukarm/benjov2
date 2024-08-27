export function useHeaven(): any;
export default HeavenScroll;
/**
 *  A React context provider that enables smooth scroll on its children.
 *
 *  @param style        Style object to overide the default styling of the parent element.
 *  @param disable      Whether or not the scroll effect will be enabled.
 *  @param velocity     A value from 0 to 1 that determines the strength of the effect.
 *  @param rootId       The id of the root component to hard set the height.
 *  @param resetHeight  An array of dependencies to listen for height resetting.
 */
declare function HeavenScroll({ children, style, resetHeight, disable, velocity, rootId }: {
    children: any;
    style?: {};
    resetHeight?: any[];
    disable?: boolean;
    velocity?: number;
    rootId?: string;
}): any;
