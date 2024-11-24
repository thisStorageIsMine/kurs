import { useState, createElement, ChangeEvent, useCallback, ChangeEventHandler, } from "react"
import cn from 'classnames'

export interface EditableTextProps {
    text: string
    as: string
    className?: string
    editorClassName?: string
    onChange?: (text: string, e: ChangeEvent<HTMLTextAreaElement>) => void
}
export const EditableText = ({ text, as, className, editorClassName, onChange }: EditableTextProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
        if (!onChange) return

        onChange(e.target.value, e)
    }, [])

    if (!isEditing) {
        return createElement(as, { "className": className, "children": text, "onDoubleClick": () => setIsEditing(true) })
    }

    const setEditorRef = (node: HTMLTextAreaElement | null) => {
        if (node && isEditing) {
            node.focus()
        }
    }

    return (
        <div className={cn("", editorClassName)}>
            <textarea className={cn("w-full h-full bg-white text-black font-medium")} onChange={handleChange} onBlur={() => setIsEditing(false)} ref={setEditorRef}>{text}</textarea>
        </div>
    )
}