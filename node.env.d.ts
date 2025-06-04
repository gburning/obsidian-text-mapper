declare module "esbuild-plugin-glob-import" {
    import type { Plugin } from "esbuild";

    interface GlobImportOptions {
        camelCase?: boolean;
        filter?: RegExp;
        namespace?: string;
        exportAll?: boolean;
    }

    export default function globImport(options?: GlobImportOptions): Plugin;
}

declare module "esbuild-plugin-import-pattern" {
    import type { Plugin } from "esbuild";

    // export const createResolution: (
    //     path: string,
    //     resolveDir: string
    // ) => {
    //     namespace: string;
    //     path: string;
    //     pluginData: { resolveDir: string };
    // };

    export const importPatternPlugin: (options?: {
        separator?: string;
    }) => Plugin;
}
