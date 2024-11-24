import markdownIt from "markdown-it"

export type TMdInit = ConstructorParameters<typeof markdownIt>
export type TMdOptions = TMdInit[0]




export class MarkdownService {
    private md: markdownIt

    constructor(options: TMdOptions) {
        this.md = new markdownIt(options)
    }

    render(str: string) {
        return this.md.render(str)
    }
}

export const md = new MarkdownService({
    "html": false,
})
