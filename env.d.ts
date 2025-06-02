// Support file types that use the ["copy" loader](https://esbuild.github.io/content-types/#copy)
declare module "*.css" {}

// fonts
declare module "*.woff" {
    const src: string;
    export default src;
}
declare module "*.ttf" {
    const src: string;
    export default src;
}

// Support file types that use the ["dataurl" loader](https://esbuild.github.io/content-types/#data-url)

// images
declare module "*.png" {
    const src: string;
    export default src;
}
declare module "*.jpg" {
    const src: string;
    export default src;
}
declare module "*.jpeg" {
    const src: string;
    export default src;
}
declare module "*.svg" {
    const src: string;
    export default src;
}
