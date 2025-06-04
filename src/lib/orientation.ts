import { Region } from "./region.ts";

/**
 * Represents a 2D point with x and y coordinates
 */
export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `${this.x.toFixed(1)},${this.y.toFixed(1)}`;
    }

    eq(pt: Point): boolean {
        return this.x == pt.x && this.y == pt.y;
    }
}

/**
 * Handles hex grid orientation and coordinate conversion between hex coordinates and SVG pixel coordinates
 * 
 * Supports both flat-top and pointy-top hex orientations:
 * - Flat-top: Hexagons have flat sides at top/bottom
 * - Pointy-top: Hexagons have points at top/bottom
 * 
 * @todo Replace magic numbers with named constants (HEX_SIZE = 100, MARGIN = 60)
 * @todo Add unit tests to verify coordinate conversion accuracy
 */
export class Orientation {
    flatTop: boolean;
    swapEvenOdd: boolean; // TODO: Rename to rowColumnOffset for clarity
    dy: number;
    dx: number;
    labelOffset: number;

    constructor(flatTop: boolean = true, swapEvenOdd: boolean = false) {
        this.flatTop = flatTop;
        this.swapEvenOdd = swapEvenOdd;
        if (this.flatTop) {
            this.dx = 100; // TODO: Replace with HEX_SIZE constant
            this.dy = (100 * Math.sqrt(3)) / 2;
            this.labelOffset = 0.8;
        } else {
            this.dx = (100 * Math.sqrt(3)) / 2;
            this.dy = 100; // TODO: Replace with HEX_SIZE constant
            this.labelOffset = 0.58;
        }
    }

    /**
     * Calculates the SVG viewbox dimensions based on the hex regions
     * to ensure all hexes are visible with proper margins
     * 
     * @todo Use Number.POSITIVE_INFINITY and Number.NEGATIVE_INFINITY instead of undefined
     */
    viewbox(regions: Region[]): number[] {
        const xMargin = 60 + this.dx;
        const yMargin = 60 + this.dy;
        let min_x_overall = undefined;
        let max_x_overall = undefined;
        let min_y_overall = undefined;
        let max_y_overall = undefined;

        const pixels: Point[] = regions.map((r) =>
            this.pixels(new Point(r.x, r.y), 0, 0)
        );

        for (const pixel of pixels) {
            if (min_x_overall == undefined || pixel.x < min_x_overall) {
                min_x_overall = pixel.x;
            }
            if (min_y_overall == undefined || pixel.y < min_y_overall) {
                min_y_overall = pixel.y;
            }
            if (max_x_overall == undefined || pixel.x > max_x_overall) {
                max_x_overall = pixel.x;
            }
            if (max_y_overall == undefined || pixel.y > max_y_overall) {
                max_y_overall = pixel.y;
            }
        }

        return [
            min_x_overall - xMargin,
            min_y_overall - yMargin,
            max_x_overall + xMargin,
            max_y_overall + yMargin,
        ];
    }

    /**
     * Returns the points for the six corners of a hexagon
     * in clockwise order starting from the leftmost (flat-top) 
     * or topmost (pointy-top) corner
     */
    hexCorners(): Point[] {
        if (this.flatTop) {
            return [
                new Point(-this.dx, 0),
                new Point(-this.dx / 2, this.dy),
                new Point(this.dx / 2, this.dy),
                new Point(this.dx, 0),
                new Point(this.dx / 2, -this.dy),
                new Point(-this.dx / 2, -this.dy),
            ];
        } else {
            return [
                new Point(0, -this.dy),
                new Point(this.dx, -this.dy / 2),
                new Point(this.dx, this.dy / 2),
                new Point(0, this.dy),
                new Point(-this.dx, this.dy / 2),
                new Point(-this.dx, -this.dy / 2),
            ];
        }
    }

    /**
     * Converts hex grid coordinates to SVG pixel coordinates
     * 
     * @param pt The hex grid coordinates (x,y)
     * @param offsetX Optional x offset in pixels
     * @param offsetY Optional y offset in pixels
     * @returns SVG pixel coordinates
     * 
     * @todo Break down the complex calculation into helper methods
     * @todo Add explanatory diagram in comments
     */
    pixels(pt: Point, offsetX: number = 0, offsetY: number = 0): Point {
        if (this.flatTop) {
            // evenOdd handles the staggered nature of hex grids
            // TODO: Rename evenOdd to rowColumnOffset
            const evenOdd = (this.swapEvenOdd ? 1 : 0) * (pt.x % 2);
            const x = (pt.x * this.dx * 3) / 2 + offsetX;
            const y =
                (pt.y + evenOdd) * this.dy * 2 -
                (Math.abs(pt.x) % 2) * this.dy +
                offsetY;
            return new Point(x, y);
        } else {
            // evenOdd handles the staggered nature of hex grids
            // TODO: Rename evenOdd to rowColumnOffset
            const evenOdd = (this.swapEvenOdd ? 1 : 0) * (pt.y % 2);
            const x =
                (pt.x + evenOdd) * this.dx * 2 -
                (Math.abs(pt.y) % 2) * this.dx +
                offsetX;
            const y = (pt.y * this.dy * 3) / 2 + offsetY;
            return new Point(x, y);
        }
    }
}
