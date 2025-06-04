import "./assets/styles.css";

import {
    MarkdownPostProcessorContext,
    MarkdownRenderChild,
    Plugin,
} from "obsidian";

import { ParseError } from "./lib/error";
import { TextMapperParser } from "./lib/parser";
import type { Theme } from "./lib/theme";
import { providePluginContext } from "./lib/context";

import { fontUglyQua } from "./themes/font-uqly-qua";
import { hpsCartography } from "./themes/hps-cartography";
import { hpsDoodle } from "./themes/hps-doodle";
import { hpsXark } from "./themes/hps-xark";

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
            const themes = [fontUglyQua, hpsCartography, hpsDoodle, hpsXark];
            ctx.addChild(new TextMapper(el, ctx.docId, source, themes));
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
        themes: Theme[]
    ) {
        super(containerEl);
        this.textMapperEl = this.containerEl.createDiv({ cls: "textmapper" });

        const parser = new TextMapperParser(docId, themes);
        parser.process(source);
        parser.svg(this.textMapperEl);
    }
}
