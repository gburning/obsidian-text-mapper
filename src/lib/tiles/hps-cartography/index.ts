import "./styles.css";
import fontUglyQua from "./assets/UglyQua-webfont.woff";
import fontUglyQuaItalic from "./assets/UglyQua-Italic-webfont.woff";

// <style>@font-face {font-family: "salterio-trash";src: url('${resolveAsset(
//     "assets/salterio_trash.ttf"
// )}');}</style>
export async function getDefinitions() {
    return `
<style>@import url("https://fonts.googleapis.com/css2?family=MedievalSharp&family=Amarante&family=UnifrakturCook:wght@700&display=swap");</style>
<style>@font-face {font-family: "UglyQua"; src: url('${fontUglyQua}') format('woff');}</style>
<style>@font-face {font-style: italic; font-family: "UglyQua"; src: url('${fontUglyQuaItalic}') format('woff');}</style>

text font-size="40pt" dy="15px" font-family="UglyQua" font-style="italic"
label font-size="40pt" dy="5px" font-family="UglyQua" font-style="italic"

trail path attributes stroke="#e3bea3" stroke-width="6" fill="none"
river path attributes transform="translate(20,10)" stroke="#6ebae7" stroke-width="8" fill="none" opacity="0.7"
canyon path attributes transform="translate(20,10)" stroke="black" stroke-width="24" fill="none" opacity="0.2"

# invisible stuff that we need to create correct PDF files
dry attributes fill="black" opacity="0.1"
port attributes opacity="0"

# debug
red attributes fill="red" opacity="0.8" transform="scale(0.5)"
`;
}

// <image id="ruined_keep" href="${resolveAsset(
//     "assets/ruined_keep.png"
// )}" height="200" width="200" transform-origin="center" x="-100" y="-100" />

// <image id="inn" href="${resolveAsset(
//     "assets/inn.png"
// )}" height="200" width="200" transform-origin="center" />
