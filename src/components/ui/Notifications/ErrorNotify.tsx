export interface IErrorNotifyProps {
    title: string
    text: string
    onClose: () => void
}

const ErrorNotify = ({ title, text, onClose }: IErrorNotifyProps) => {
    return (
        <div className="flex w-full rounded-lg overflow-hidden relative items-stretch shadow-xl bg-red-500 text-white">
            <div className="flex flex-1 flex-col gap-3 p-2">
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="text-sm">{text}</p>
            </div>

            <button
                className="bg-[unset] border-none flex w-14 grow-0 basis-12 items-center justify-center p-3 text-lg self-stretch font-semibold hover:bg-red-400"
                onClick={onClose}
            >
                x
            </button>
        </div>
    )
}

export { ErrorNotify }
