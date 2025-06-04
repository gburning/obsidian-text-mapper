import type { Theme } from "../../lib/theme";
import { getAssetUri, getElementIdFromPath } from "../../lib/util";
// ../ is required as the glob plugin will see it as conflicting with other, identical, patterns
import { modules as assets } from "../hps-doodle/assets/**/*.png#default";

export const hpsDoodle: Theme = {
    displayName: "HPS Doodle Tiles",
    id: "hps-doodle",
    getDefinitions() {
        const res: string[] = [
            // Options
            "option coordinates-format {x}.{y}",
            // Defaults
            `default attributes fill="none" stroke="none"`,
        ];

        assets.forEach(({ default: path }) => {
            res.push(
                `<image id="hps-d-${getElementIdFromPath(
                    path
                )}" href="${getAssetUri(
                    path
                )}" height="225" width="225" y="-112.5" x="-112.5" />`
            );
        });

        return res;
    },
};
