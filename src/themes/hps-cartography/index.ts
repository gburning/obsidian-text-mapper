import type { Theme } from "src/lib/theme";
import imageAssets from "./assets/**/*.png";
import { getAssetUri } from "../../lib/util";

const { tiles, icons } = imageAssets as unknown as Record<
    string,
    Record<string, string>
>;

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
            // Paths
            `trail path attributes stroke="#e3bea3" stroke-width="6" fill="none"`,
            `river path attributes transform="translate(20,10)" stroke="#6ebae7" stroke-width="8" fill="none" opacity="0.7"`,
            `canyon path attributes transform="translate(20,10)" stroke="black" stroke-width="24" fill="none" opacity="0.2"`,
        ];

        Object.entries(icons).forEach(([key, value]) => {
            // Remove the file extension from the key
            const _key = key.replace(/\.(png|jpg|jpeg|svg)$/, "");
            res.push(
                `<image id="${_key}" href="${getAssetUri(
                    value
                )}" height="225" width="225" y="-112.5" x="-112.5" transform="scale(0.8)" />`
            );
        });

        Object.entries(tiles).forEach(([key, value]) => {
            // Remove the file extension from the key
            const _key = key.replace(/\.(png|jpg|jpeg|svg)$/, "");
            res.push(
                `<image id="${_key}" href="${getAssetUri(
                    value
                )}" height="225" width="225" y="-112.5" x="-112.5" />`
            );
        });

        return res;
    },
};
