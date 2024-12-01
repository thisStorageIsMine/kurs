import { Outlet, useNavigate, useParams } from 'react-router-dom'
import {
    AddNoteBtn,
    ForbiddenPage,
    Loader,
    NoteLink,
    useDeleteNotification,
    useLoadNotification,
} from '..'
import { useUser } from '../../store'
import { useInsertNote, useNotesQueryOptions } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

export const Notes = () => {
    const { userId: userIdFromParams } = useParams()
    const authentificatedUser = useUser((state) => state.user?.name)
    const userId = useUser((state) => state.user?.id)

    const [isInitialRender, setIsInitialRender] = useState(true)

    const navigate = useNavigate()
    const createLoadNotification = useLoadNotification()
    const deleteNotification = useDeleteNotification()

    const insertNoteMutation = useInsertNote()

    const notesQueryOptions = useNotesQueryOptions({
        onStart: () => createLoadNotification('Заметки загружаются', 'load'),
        onSettled: () => deleteNotification('load'),
    })

    const queryOptions = useMemo(() => notesQueryOptions(), [notesQueryOptions])

    const { data: notes, isError, isFetching } = useQuery(queryOptions)

    const handleAddBtnClick = async () => {
        const newNote = {
            id: -1,
            name: 'Без названия',
            payload: 'текст',
            createdAt: new Date().toISOString(),
            lastEdit: new Date().toISOString(),
        }

        insertNoteMutation.mutate(newNote)
    }

    useEffect(() => {
        if (!isInitialRender || isFetching) return

        setIsInitialRender(false)
    }, [isFetching])

    if (authentificatedUser === undefined) {
        navigate('/')
    }

    if (userId !== Number(userIdFromParams) || userId === undefined) {
        return <ForbiddenPage />
    }

    if ((isError || !notes) && isFetching === false) {
        throw new Error('Произошла ошибка. Попробуйте перезагрузить страницу')
    }

    return (
        <main className="w-screen h-screen p-2 lg:p-10 overflow-hidden flex flex-col">
            <div className="rounded-md flex w-full border border-slate-300 overflow-hidden flex-auto">
                {isFetching && isInitialRender ? (
                    <Loader className="flex-auto" />
                ) : (
                    <>
                        <nav className="flex flex-col overflow-hidden w-80 shrink-0">
                            <>
                                <AddNoteBtn onClick={handleAddBtnClick}>
                                    Новая заметка
                                </AddNoteBtn>
                                {notes?.map((n) => (
                                    <NoteLink
                                        id={n.id}
                                        payload={n.payload}
                                        name={n.name}
                                        lastEdit={n.lastEdit}
                                        href={`${n.id}`}
                                        className="last-of-type:border-b"
                                        key={n.id}
                                    />
                                ))}
                            </>
                        </nav>
                        <section className="border-l border-slate-300 w-full">
                            <Outlet />
                        </section>
                    </>
                )}
            </div>
        </main>
    )
}
