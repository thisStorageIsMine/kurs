import { ChangeEventHandler, useState } from 'react'
import { MarkdownService } from '../../helpers';

export interface NoteProps {
    name: string;
    payload: string;
    md: MarkdownService
}
export const Note = ({ name, payload, md }: NoteProps) => {
    const [text, setText] = useState(payload)
    const renderedText = md.render(text)

    const handleChange: ChangeEventHandler<HTMLDivElement> = (e) => setText(e.target.textContent || "")

    return (
        <div className="w-full h-full bg-white text-black text-sm" contentEditable={true} onChange={handleChange}>
            {renderedText}
        </div>
    )
}