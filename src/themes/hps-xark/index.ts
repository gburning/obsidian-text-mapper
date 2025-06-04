import type { Theme } from "../../lib/theme";
import { getAssetUri, getElementIdFromPath } from "../../lib/util";
// ../ is required as the glob plugin will see it as conflicting with other, identical, patterns
import { modules as assets } from "../hps-xark/assets/**/*.png#default";

export const hpsXark: Theme = {
    displayName: "The Tiles of Xark!",
    id: "hps-xark",
    getDefinitions() {
        const res: string[] = [
            "option coordinates-format {x}.{y}",
            `default attributes fill="none" stroke="none"`,
        ];

        assets.forEach(({ default: path }) => {
            res.push(
                `<image id="hps-x-${getElementIdFromPath(
                    path
                )}" href="${getAssetUri(
                    path
                )}" height="225" width="225" y="-112.5" x="-112.5" />`
            );
        });

        return res;
    },
};
