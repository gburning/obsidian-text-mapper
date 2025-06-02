import {
    MarkdownPostProcessorContext,
    MarkdownRenderChild,
    Plugin,
} from "obsidian";
import { join } from "path";

import { ParseError } from "./lib/error.ts";
import { TextMapperParser } from "./lib/parser.ts";

import "./assets/styles.css";

import * as hpsCartography from "./lib/tiles/hps-cartography/index.ts";

export function resolvePluginAsset(plugin: Plugin, assetPath: string) {
    return plugin.app.vault.adapter.getResourcePath(
        join(
            plugin.app.vault.configDir,
            "plugins",
            plugin.manifest.id,
            assetPath
        )
    );
}

export default class TextMapperPlugin extends Plugin {
    async onload() {
        console.log("Loading Obsidian TextMapper.");
        super.registerMarkdownCodeBlockProcessor(
            "text-mapper",
            this.processMarkdown.bind(this)
        );
    }

    async processMarkdown(
        source: string,
        el: HTMLElement,
        ctx: MarkdownPostProcessorContext
    ): Promise<any> {
        try {
            const tiles = [await hpsCartography.getDefinitions()];
            ctx.addChild(new TextMapper(el, ctx.docId, source, tiles));
        } catch (e) {
            console.log("text mapper error", e);
            ctx.addChild(new ParseError(el));
        }
    }

    onunload() {}
}

export class TextMapper extends MarkdownRenderChild {
    textMapperEl: HTMLDivElement;

    constructor(
        containerEl: HTMLElement,
        docId: string,
        source: string,
        tiles: string[]
    ) {
        super(containerEl);
        this.textMapperEl = this.containerEl.createDiv({ cls: "textmapper" });

        const totalSource = source
            .split("\n")
            .concat(...tiles.map((tile) => tile.split("\n")));

        const parser = new TextMapperParser(docId);
        parser.process(totalSource);
        parser.svg(this.textMapperEl);
    }
}
