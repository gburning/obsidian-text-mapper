import type { Theme } from "../../lib/theme";
import { getAssetUri } from "../../lib/util";

import _icons from "./assets/icons/*.png";
import _tiles from "./assets/tiles/*.png";

const tiles = _tiles as unknown as { default: string }[];
const icons = _icons as unknown as { default: string }[];

// TODO: Document the widths/heights used (they seem to be required for some reason)
export const hpsCartography: Theme = {
    displayName: "HPS Cartography Tiles",
    id: "hps-cartography",
    getDefinitions() {
        const res: string[] = [
            // Options
            "option hex-type pointy-top",
            "option coordinates-format {x}.{y}",
            // Defaults
            `default attributes fill="none" stroke="none"`,
        ];

        Object.entries(icons).forEach(([key, value]) => {
            // Remove the file extension from the key
            const _key = key.replace(/\.(png|jpg|jpeg|svg)$/, "");
            res.push(
                `<image id="hps-c-${_key}" href="${getAssetUri(
                    value
                )}" height="225" width="225" y="-112.5" x="-112.5" transform="scale(0.8)" />`
            );
        });

        Object.entries(tiles).forEach(([key, value]) => {
            // Remove the file extension from the key
            const _key = key.replace(/\.(png|jpg|jpeg|svg)$/, "");
            res.push(
                `<image id="hps-c-${_key}" href="${getAssetUri(
                    value
                )}" height="225" width="225" y="-112.5" x="-112.5" />`
            );
        });

        return res;
    },
};
