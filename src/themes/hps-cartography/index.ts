import type { Theme } from "../../lib/theme";
import { getAssetUri, getElementIdFromPath } from "../../lib/util";

import { modules as icons } from "./assets/icons/*.png#default";
import { modules as tiles } from "./assets/tiles/*.png#default";

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

        icons.forEach(({ default: path }) => {
            res.push(
                `<image id="hps-c-${getElementIdFromPath(
                    path
                )}" href="${getAssetUri(
                    path
                )}" height="225" width="225" y="-112.5" x="-112.5" transform="scale(0.8)" />`
            );
        });

        tiles.forEach(({ default: path }) => {
            res.push(
                `<image id="hps-c-${getElementIdFromPath(
                    path
                )}" href="${getAssetUri(
                    path
                )}" height="225" width="225" y="-112.5" x="-112.5" />`
            );
        });

        return res;
    },
};
