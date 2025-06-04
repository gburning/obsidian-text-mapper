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
