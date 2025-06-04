import {
    MarkdownPostProcessorContext,
    MarkdownRenderChild,
    Plugin,
} from "obsidian";

import { ParseError } from "./lib/error";
import { TextMapperParser } from "./lib/parser";

import "./assets/styles.css";

import * as hpsCartography from "./themes/hps-cartography";
import { providePluginContext } from "./lib/context";

export default class TextMapperPlugin extends Plugin {
    async onload() {
        console.log("Loading Obsidian TextMapper.");
        providePluginContext(this);

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
            const tileSets = [await hpsCartography.getDefinitions()];
            ctx.addChild(new TextMapper(el, ctx.docId, source, tileSets));
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
        tileSets: string[][]
    ) {
        super(containerEl);
        this.textMapperEl = this.containerEl.createDiv({ cls: "textmapper" });

        const totalSource = source.split("\n").concat(...tileSets);

        const parser = new TextMapperParser(docId);
        parser.process(totalSource);
        parser.svg(this.textMapperEl);
    }
}
