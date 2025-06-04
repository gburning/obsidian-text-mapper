import type { Plugin } from "obsidian";

// TODO: Include more properties from base type?
type PluginContext = Pick<Plugin, "app" | "manifest">;
let _pluginContext: PluginContext | undefined = undefined;

export const PluginContext = new Proxy<PluginContext>({} as PluginContext, {
    get(_, prop, receiver) {
        if (!_pluginContext) {
            throw new Error(
                `Cannot access '${String(
                    prop
                )}' - PluginContext not initialized with providePluginContext.`
            );
        }

        return Reflect.get(_pluginContext, prop, receiver);
    },
});

export function providePluginContext(plugin: Plugin) {
    _pluginContext = plugin;
}
