// Support for various [esbuild loaders](https://esbuild.github.io/content-types)

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

// types for glob imports using esbuild-plugin-import-pattern

type GlobImportResults<T> = {
    paths: string[];
    modules: T[];
    entries: [path: string, content: T][];
};

declare module "*.png#default" {
    type T = GlobImportResults<{ default: string }>;

    export const entries: T["entries"];
    export const modules: T["modules"];
    export const paths: T["paths"];
}
