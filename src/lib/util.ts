import { PluginContext } from "./context";

export function getAssetUri(path: string): string {
    const normalizedPath = [
        PluginContext.app.vault.configDir,
        "plugins",
        PluginContext.manifest.id,
        path,
    ].join("/");

    return PluginContext.app.vault.adapter.getResourcePath(normalizedPath);
}

interface AssetInfo {
    name: string;
    path: string;
    content: string;
}

interface AssetTree {
    [key: string]: AssetTree | string;
}

/**
 * Flatten glob imported assets into a more usable format.
 */
export function flattenAssets(assets: AssetTree): AssetInfo[] {
    const result: AssetInfo[] = [];

    function doFlatten(assets: AssetTree, prefix: string) {
        for (const key in assets) {
            const value = assets[key];
            const newPrefix = prefix ? `${prefix}/${key}` : key;

            if (typeof value === "string") {
                // It's a file
                result.push({
                    name: key,
                    path: newPrefix,
                    content: value,
                });
            } else {
                // It's a directory
                doFlatten(value, newPrefix);
            }
        }
    }

    doFlatten(assets, "");

    return result;
}
