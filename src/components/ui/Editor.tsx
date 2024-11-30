import { EditableText } from './EditableText'

import {
    MDXEditor,
    codeBlockPlugin,
    codeMirrorPlugin,
    headingsPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    thematicBreakPlugin,
} from '@mdxeditor/editor'

import cn from 'classnames'

export interface NoteProps {
    name: string
    payload: string
    className?: string
    onEdit?: (payload: string) => void
    onHeaderEdit?: (name: string) => void
}
export const Editor = ({ name, payload, className, onEdit, onHeaderEdit }: NoteProps) => {
    return (
        <div className={cn('w-full h-full text-sm', className)}>
            <div className="px-8 py-5">
                <EditableText
                    placeholder="Название"
                    text={name}
                    as="h3"
                    editorClassName="bg-transparent outline-none resize-none h-auto"
                    className="h-auto"
                    onChange={onHeaderEdit}
                />
            </div>

            <MDXEditor
                markdown={payload}
                contentEditableClassName='outline-none max-w-none text-lg px-8 py-5 caret-yellow-500 bg-transparent prose prose-neutral prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[""] prose-code:after:content-[""] caret-purple'
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    linkPlugin(),
                    quotePlugin(),
                    markdownShortcutPlugin(),
                    thematicBreakPlugin(),
                    codeBlockPlugin(),
                    codeMirrorPlugin(),
                    // toolbarPlugin({
                    //     toolbarContents: () => (
                    //         <>
                    //             <UndoRedo />
                    //         </>
                    //     ),
                    //     toolbarClassName: "flex flex-row h-10"
                    // })
                ]}
                placeholder="текст"
                onChange={onEdit}
                key={payload}
            />
        </div>
    )
}
