import { ReactNode } from 'react'

interface IAddNoteBtn {
    onClick?: () => void
    children: ReactNode
}
export const AddNoteBtn = ({ children, onClick }: IAddNoteBtn) => {
    return (
        <div
            className="flex h-20 items-center gap-4 cursor-pointer hover:bg-white/[20%] p-3"
            onClick={onClick}
        >
            <div>
                <svg
                    className="block"
                    width="24"
                    height="24"
                    role="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M13 11V3.5c0-.276-.214-.5-.505-.5h-.99a.507.507 0 0 0-.505.5V11H3.5c-.276 0-.5.214-.5.505v.99c0 .279.23.505.5.505H11v7.5c0 .276.214.5.505.5h.99c.279 0 .505-.23.505-.5V13h7.5c.276 0 .5-.214.5-.505v-.99a.507.507 0 0 0-.5-.505H13z"
                    ></path>
                </svg>
            </div>

            <div className="truncate">{children}</div>
        </div>
    )
}
