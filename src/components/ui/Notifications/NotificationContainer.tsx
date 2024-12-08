import { Dispatch, SetStateAction, memo } from 'react'
import { ErrorNotify } from './ErrorNotify'
import { INotification } from './Provider'
import { SuccessNotify } from './SuccessNotify'
import { LoadNotification } from '.'

export interface INotificationContainerProps {
    nots: INotification[]
    setNots: Dispatch<SetStateAction<INotification[]>>
}

const NotificationContainer = memo(({ nots, setNots }: INotificationContainerProps) => {
    return (
        <div className="absolute w-[420px] bottom-10 right-10 gap-4 flex flex-col">
            {nots.map((notify, id) => {
                const onClose = () => {
                    setNots((state) => state.filter((_, i) => i !== id))
                }
                const title = notify.title,
                    text = notify.text

                switch (notify.type) {
                    case 'error':
                        return (
                            <ErrorNotify
                                title={title}
                                text={text}
                                onClose={onClose}
                                key={id}
                            />
                        )
                    case 'success':
                        return (
                            <SuccessNotify
                                title={title}
                                text={text}
                                onClose={onClose}
                                key={id}
                            />
                        )
                    case 'load':
                        return <LoadNotification text={notify.text} key={id} />
                }
            })}
        </div>
    )
})
export { NotificationContainer }
