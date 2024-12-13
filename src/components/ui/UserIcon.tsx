import cn from 'classnames'
import { getUser } from '../../helpers'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useSingOut } from '../../hooks/useSignOut'
import { Modal } from '.'

export interface IUserIconProps extends React.HTMLAttributes<HTMLDivElement> {}
export const UserIcon = ({ className, ...props }: IUserIconProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const contaierRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cb = (e: MouseEvent) => {
            if (!contaierRef.current || !e.target) return

            if (contaierRef.current.contains(e.target as Node)) return

            setIsOpen(false)
        }

        window.addEventListener('click', cb)

        return () => window.removeEventListener('click', cb)
    }, [])

    return (
        <div
            className={cn('size-10 bg-user cursor-pointer relative ', className)}
            {...props}
            onClick={() => setIsOpen(true)}
            ref={contaierRef}
        >
            <UserDropdown
                className={`absolute top-14 right-0 ${isOpen ? 'flex' : 'hidden'}`}
                ref={dropdownRef}
            />
        </div>
    )
}

export const UserDropdown = forwardRef<HTMLDivElement, IUserIconProps>(
    ({ className }, ref) => {
        const user = getUser()
        const signOut = useSingOut()
        const modalRef = useRef<HTMLDialogElement>(null)

        const handleDelete = () => signOut()
        const handleDeletingCancel = () => {
            if (!modalRef.current) {
                return
            }

            modalRef.current.close()
        }

        return (
            <div
                className={cn(
                    'w-60 flex flex-col gap-3 rounded-lg shadow-md bg-[#313030] py-3 px-5 cursor-default min-h-32 justify-between',
                    className
                )}
                ref={ref}
            >
                <h2 className="self-center text-xl">
                    {user?.login ?? 'Так, почему ты не залогинен?'}
                </h2>

                <button
                    className="w-36 py-1 px-2  text-sm shrink-0 self-center"
                    onClick={signOut}
                >
                    Выйти из аккаунта
                </button>

                <Modal
                    acceptText="Выйти"
                    cancelText="Отменить"
                    ref={modalRef}
                    onAccept={handleDelete}
                    onCancel={handleDeletingCancel}
                >
                    Вы точно хотите удалить заметку? После этого её нельзя будет
                    восстановить.
                </Modal>
            </div>
        )
    }
)
