import { NavLink } from "react-router-dom"
import { TNote } from "../../types"
import cn from 'classnames'


export interface INoteProps extends React.HTMLAttributes<HTMLLinkElement>, TNote {
    href: string
}
export const NoteLink = ({ name, text, createdAt, href, className }: INoteProps) => {
    const date = new Date(createdAt).toLocaleDateString("ru-RU")

    return (
        <NavLink className={({ isActive }) => cn("border-t-[1px] border-slate-200 p-3 flex flex-col justify-between h-20 text-white hover:text-current hover:bg-white/[20%]", isActive ? "bg-white/[20%]" : "", className)} to={href}>
            <div className="font-medium text-sm flex items-center truncate">{name}</div>

            <div className="max-w-full truncate flex gap-2 text-xs text-slate-300">
                <div>{date}</div>
                <div>{text}</div>
            </div>
        </NavLink>
    )
}