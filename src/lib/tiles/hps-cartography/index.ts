import "./styles.css";
import fontUglyQua from "./assets/UglyQua-webfont.woff";
import fontUglyQuaItalic from "./assets/UglyQua-Italic-webfont.woff";
import imageAssets from "./assets/**/*.png";

const { tiles, icons } = imageAssets as unknown as Record<
    string,
    Record<string, string>
>;

// TODO: Move @font-face declarations to .css file when URL imports is fixed
// TODO: "tree shake" images that don't wind up being used
// TODO: Option to apply border by default:
//      `<pattern id="hex-border" height="225" width="225"><image href="${border}" height="225" width="225" /></pattern>`,
//      `default attributes fill="url(#hex-border)" stroke="none"`,
// TODO: Document the widths/heights used (they seem to be required for some reason)
export async function getDefinitions() {
    const res: string[] = [
        // Options
        "option horizontal",
        "option coordinates-format {x}.{y}",
        // Defaults
        `default attributes fill="none" stroke="none"`,
        `glow stroke="white" stroke-width="5pt" stroke-linejoin="round"`,
        // Fonts
        `<style>@font-face {font-family: "UglyQua"; src: url('${fontUglyQua}') format('woff');}</style>`,
        `<style>@font-face {font-style: italic; font-family: "UglyQua"; src: url('${fontUglyQuaItalic}') format('woff');}</style>`,
        // Text styles
        `text font-size="16pt" dy="5px" font-family="UglyQua" font-style="normal"`,
        `label font-size="24pt" dy="15px" font-family="UglyQua" font-style="italic"`,
        // Paths
        `trail path attributes stroke="#e3bea3" stroke-width="6" fill="none"`,
        `river path attributes transform="translate(20,10)" stroke="#6ebae7" stroke-width="8" fill="none" opacity="0.7"`,
        `canyon path attributes transform="translate(20,10)" stroke="black" stroke-width="24" fill="none" opacity="0.2"`,
    ];

    Object.entries(icons).forEach(([key, value]) => {
        // Remove the file extension from the key
        const _key = key.replace(/\.(png|jpg|jpeg|svg)$/, "");
        res.push(
            `<image id="${_key}" href="${value}" height="225" width="225" y="-112.5" x="-112.5" transform="scale(0.8)" />`
        );
    });

    Object.entries(tiles).forEach(([key, value]) => {
        // Remove the file extension from the key
        const _key = key.replace(/\.(png|jpg|jpeg|svg)$/, "");
        res.push(
            `<image id="${_key}" href="${value}" height="225" width="225" y="-112.5" x="-112.5" />`
        );
    });

    return res;
}
