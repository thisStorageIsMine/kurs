import markdownit from "markdown-it"

export class MarkdownService {
    private md = new markdownit()

    render(text: string) {
        return this.md.render(text)
    }
}

export const md = new MarkdownService()
