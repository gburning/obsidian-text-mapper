import type { Theme } from "src/lib/theme";
import _imageAssets from "./assets/**/*.png";
import { flattenAssets, getAssetUri } from "../../lib/util";

const imageAssets = flattenAssets(
    _imageAssets as unknown as Record<string, string>
);

export const hpsDoodle: Theme = {
    displayName: "The Tiles of Xark!",
    id: "hps-xark",
    getDefinitions() {
        const res: string[] = [
            // Options
            "option coordinates-format {x}.{y}",
            // Defaults
            `default attributes fill="none" stroke="none"`,
        ];

        imageAssets.forEach((asset) => {
            // Remove the file extension from the key
            const _key = asset.name.replace(/\.(png|jpg|jpeg|svg)$/, "");
            res.push(
                `<image id="hps-d-${_key}" href="${getAssetUri(
                    asset.content
                )}" height="225" width="225" y="-112.5" x="-112.5" />`
            );
        });

        return res;
    },
};
