import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { AddNoteBtn, ForbiddenPage, NoteLink, useErrorNotification } from '..'
import { useInsertNote } from '../../hooks'
import { asyncWrap, fetchNotes, getUser } from '../../helpers'
import { UserIcon } from '../ui/UserIcon'
import { queryClient } from '../../App'
import { useNotes } from '../../store'
import { useEffect } from 'react'

export const notesLoader = async () => {
    const [notes, error] = await asyncWrap(fetchNotes())
    queryClient.setQueryData(['user'], notes ?? [])

    return {
        isError: error,
        notes: notes ?? [],
    }
}

export const Notes = () => {
    const { userId: userIdFromParams } = useParams()
    const setNotes = useNotes((state) => state.setNotes)
    const user = getUser()
    const data = useLoaderData() as Awaited<ReturnType<typeof notesLoader>>
    const notes = useNotes((state) => state.notes)
    const errorNotify = useErrorNotification()

    const navigate = useNavigate()

    const insertNoteMutation = useInsertNote()

    const handleAddBtnClick = async () => {
        const newNote = {
            name: 'Без названия',
            payload: 'текст',
        }

        insertNoteMutation(newNote)
    }

    useEffect(() => {
        setNotes(data.notes)
    }, [])

    if (user?.id === undefined) {
        navigate('/')
    }

    if (user?.id !== Number(userIdFromParams) || user.id === undefined) {
        return <ForbiddenPage />
    }

    if (data.isError) {
        errorNotify(
            'Не получилось загрузить заметки',
            'попробуйте ещё раз',
            `${Date.now()}`
        )
    }

    return (
        <main className="w-screen h-screen p-2 lg:p-10 lg:pt-20 overflow-hidden flex flex-col relative">
            <div className="absolute right-10 top-5">
                <UserIcon />
            </div>
            <div className="rounded-md flex w-full border border-slate-300 overflow-hidden flex-auto">
                <>
                    <nav className="flex flex-col overflow-hidden w-80 shrink-0">
                        <>
                            <AddNoteBtn
                                onClick={handleAddBtnClick}
                                className={notes.length === 0 ? 'border-b' : ''}
                            >
                                Новая заметка
                            </AddNoteBtn>
                            {notes.map((n) => (
                                <NoteLink
                                    id={n.id}
                                    payload={n.payload}
                                    name={n.name}
                                    createdAt={n.createdAt}
                                    userId={n.userId}
                                    href={`${n.id}`}
                                    className="last-of-type:border-b"
                                    key={n.id}
                                />
                            ))}
                        </>
                    </nav>
                    <section className="border-l border-slate-300 w-full flex flex-col">
                        <Outlet />
                    </section>
                </>
            </div>
        </main>
    )
}
