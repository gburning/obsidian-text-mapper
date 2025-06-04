import "./styles.css";
import type { Theme } from "src/lib/theme";

export const fontUglyQua: Theme = {
    displayName: "Font - Ugly Qua",
    id: "font-uqly-qua",
    getDefinitions() {
        return [
            `glow stroke="white" stroke-width="5pt" stroke-linejoin="round"`,
            `text font-size="16pt" dy="5px" font-family="UglyQua" font-style="normal"`,
            `label font-size="24pt" dy="15px" font-family="UglyQua" font-style="italic"`,
        ];
    },
};
