import {
    useState,
    createElement,
    ChangeEvent,
    useCallback,
    ChangeEventHandler,
} from 'react'
import cn from 'classnames'

export interface EditableTextProps {
    text: string | null
    as: string
    placeholder: string
    className?: string
    editorClassName?: string
    onChange?: (text: string, e: ChangeEvent<HTMLTextAreaElement>) => void
}
export const EditableText = ({
    text,
    as,
    placeholder,
    className,
    editorClassName,
    onChange,
}: EditableTextProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [content, setContent] = useState(text)

    const elem = createElement(as, {
        className: className,
        children: content,
        onDoubleClick: () => setIsEditing(true),
    })

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
        if (!onChange) return

        setContent(e.target.value)
        onChange(e.target.value, e)
    }, [])

    const setEditorRef = (node: HTMLTextAreaElement | null) => {
        if (node && isEditing) {
            node.focus()
        }
    }

    return (
        <span
            className={cn(
                'flex hover:outline-slate-700  p-2 pl-0 rounded text-inherit cursor-text',
                isEditing ? 'w-full' : 'w-fit',
                editorClassName
            )}
        >
            <textarea
                className={cn(
                    'font-medium w-full outline-none focus:outline-none resize-none bg-inherit',
                    isEditing ? 'block' : 'hidden'
                )}
                onChange={handleChange}
                rows={1}
                placeholder={placeholder}
                onBlur={() => setIsEditing(false)}
                ref={setEditorRef}
                value={content ?? ''}
            />

            {isEditing ? <></> : elem}
        </span>
    )
}
