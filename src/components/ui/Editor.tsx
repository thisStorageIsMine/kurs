import { EditableText } from './EditableText'

import {
    MDXEditor,
    headingsPlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
} from '@mdxeditor/editor'

import cn from 'classnames'
import { Modal } from '.'
import { useRef } from 'react'

export interface NoteProps {
    name: string
    payload: string
    className?: string
    onEdit?: (payload: string) => void
    onHeaderEdit?: (name: string) => void
    onDelete: () => void
}
export const Editor = ({
    name,
    payload,
    className,
    onEdit,
    onDelete,
    onHeaderEdit,
}: NoteProps) => {
    const modalRef = useRef<HTMLDialogElement>(null)

    const handleTrashClick = async () => {
        if (!modalRef.current) {
            await onDelete()
            return
        }

        modalRef.current.showModal()
    }

    const handleDeletingCancel = async () => {
        if (!modalRef.current) {
            return
        }

        modalRef.current.close()
    }

    const handleDelete = async () => {
        await onDelete()

        if (modalRef.current) {
            modalRef.current.close()
        }
    }

    return (
        <div className={cn('w-full h-full text-sm', className)}>
            <div className="w-full px-8 py-5 text-2xl font-bold max-h-20 overflow-hidden flex justify-between items-center">
                <EditableText
                    placeholder="Название"
                    text={name}
                    as="h3"
                    editorClassName="bg-transparent outline-none resize-none h-auto"
                    className="h-auto"
                    onChange={onHeaderEdit}
                    key={name}
                />

                <button className="[all:_unset] focus-visible:outline-none focus:outline-none">
                    <svg
                        className="size-5 fill-slate-200 cursor-pointer hover:fill-slate-400 transition-colors active:scale-90"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={handleTrashClick}
                    >
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                    </svg>
                </button>
            </div>

            <MDXEditor
                markdown={payload}
                contentEditableClassName='outline-none max-w-none text-lg px-8 py-5 caret-yellow-500 bg-transparent prose prose-neutral prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[""] prose-code:after:content-[""] caret-purple'
                plugins={[
                    linkPlugin(),
                    linkDialogPlugin(),
                    headingsPlugin(),
                    listsPlugin(),
                    markdownShortcutPlugin(),
                ]}
                onChange={onEdit}
                key={payload}
            />

            <Modal
                acceptText="Удалить"
                cancelText="Отменить"
                ref={modalRef}
                onAccept={handleDelete}
                onCancel={handleDeletingCancel}
            >
                Вы точно хотите удалить заметку? После этого её нельзя будет восстановить.
            </Modal>
        </div>
    )
}
