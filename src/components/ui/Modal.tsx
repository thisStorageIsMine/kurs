import { ReactNode, forwardRef, memo } from 'react'
import { createPortal } from 'react-dom'

export interface IModalProps {
    onCancel: () => void
    onAccept: () => void
    children: ReactNode
    cancelText: string
    acceptText: string
}
export const Modal = memo(
    forwardRef<HTMLDialogElement, IModalProps>(
        ({ children, onAccept, onCancel, cancelText, acceptText }, outerRef) => {
            return (
                <>
                    {createPortal(
                        <dialog
                            className="max-w-[480px] px-10 pt-10 py-5 shadow rounded-2xl   backdrop:bg-black backdrop:bg-opacity-80"
                            ref={outerRef}
                        >
                            <div className="flex flex-col gap-10">
                                <div className="text-xl">{children}</div>
                                <div className="flex whitespace-nowrap gap-4 text-sm">
                                    <button className="grow" onClick={onCancel}>
                                        {cancelText}
                                    </button>
                                    <button
                                        className="grow bg-purple text-black"
                                        onClick={onAccept}
                                    >
                                        {acceptText}
                                    </button>
                                </div>
                            </div>
                        </dialog>,
                        document.body
                    )}
                </>
            )
        }
    )
)
