import showdown from "showdown"
import jsdom from "jsdom"

const dom = new jsdom.JSDOM();

const converter = new showdown.Converter()

export default function HTMLToMarkdown(html: string): string {
  return converter.makeMarkdown(html, dom.window.document)
}

