import { memo } from 'react'

export interface ISuccessNotifyProps {
    title: string
    text: string
    onClose: () => void
}

const SuccessNotify = memo(({ title, text, onClose }: ISuccessNotifyProps) => {
    return (
        <div className="w-full rounded-lg overflow-hidden relative items-stretch shadow-xl bg-white text-[#333342]">
            <div className="flex flex-1 flex-col gap-3 p-2">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="text-sm">{text}</p>
            </div>

            <button
                className="flex w-14 grow-0 basis-12 items-center justify-center p-3 text-lg self-stretch font-semibold hover:bg-slate-300"
                onClick={onClose}
            >
                x
            </button>
        </div>
    )
})

export { SuccessNotify }
