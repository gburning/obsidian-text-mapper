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

export function getFileNameWithoutExtension(path: string): string {
    const match = path.match(/([^\/]+)(\.[^.]+)$/);
    if (!match) {
        throw new Error(`Could not extract file name from path: ${path}`);
    }
    return match[1];
}

export function getElementIdFromPath(path: string): string {
    const fileName = getFileNameWithoutExtension(path);
    return fileName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
}
