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
