import { Dispatch, SetStateAction } from "react"
import { ErrorNotify } from "./ErrorNotify"
import { INotification } from "./Provider"
import { SuccessNotify } from "./SuccessNotify"

export interface INotificationContainerProps {
    nots: (INotification)[]
    setNots: Dispatch<SetStateAction<(INotification)[]>>
}

const NotificationContainer = ({ nots, setNots }: INotificationContainerProps) => {
    return (
        <div className="absolute w-[420px] bottom-10 right-10 gap-4 flex flex-col">
            {nots.map((notify, id) => {
                const onClose = () => {
                    setNots(state => state.filter((_, i) => i !== id))
                }
                const title = notify.title,
                    text = notify.text

                return (
                    notify.type === 'error'
                        ? <ErrorNotify title={title} text={text} onClose={onClose} key={id} />
                        : <SuccessNotify title={title} text={text} onClose={onClose} key={id} />
                )
            })}
        </div>
    )
}

export { NotificationContainer }