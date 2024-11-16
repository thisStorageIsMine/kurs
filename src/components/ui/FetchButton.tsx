import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import cn from 'classnames'

export interface IFetchButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    onClick?: () => void;
    isFetching: boolean;
    disabled: boolean
}

const FetchButton = ({onClick, isFetching, disabled, children, className, ...props}: IFetchButtonProps) => {
    return (
        <button 
            className={`mt-6 w-2/3 ${cn(isFetching ? "animate-pulse brightness-50 cursor-progress" : "", className)}`}
            disabled={disabled}
            onClick={onClick}
            {...props}    
        >
                {children}
        </button>
    )
}

export {FetchButton}