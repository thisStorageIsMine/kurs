import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'

export interface IInputProps
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    'bg-[#353434] px-4 py-2 rounded-lg font-medium border border-transparent hover:border-purple focus:bg-[#f9f9f9] focus:outline-none focus:text-black',
                    className
                )}
                {...props}
            />
        )
    }
)

export { Input }
