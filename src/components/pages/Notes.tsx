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
import { useNotesQueryOptions } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { queryClient } from '../../App'
import { TNote } from '../../types'
// import { supabase } from '../../supabase'

export const Notes = () => {
    const { userId: userIdFromParams } = useParams()
    const authentificatedUser = useUser((state) => state.user?.name)
    const [isInitialRender, setIsInitialRender] = useState(true)
    const userId = useUser((state) => state.user?.id)
    const navigate = useNavigate()
    const createLoadNotification = useLoadNotification()
    const deleteNotification = useDeleteNotification()

    const notesQueryOptions = useNotesQueryOptions({
        onStart: () => createLoadNotification('Заметка загружается', 'load'),
        onSettled: () => deleteNotification('load'),
    })

    const { data: notes, isError, isFetching } = useQuery(notesQueryOptions())

    const handleAddBtnClick = async () => {
        queryClient.setQueriesData<TNote[]>(
            {
                queryKey: notesQueryOptions().queryKey,
                type: 'all',
            },
            (prev) => {
                if (!prev || prev.find((n) => n.id === -1)) return prev

                const newNote: TNote = {
                    id: -1,
                    name: '',
                    payload: '',
                    createdAt: new Date().toISOString(),
                }
                return [...prev, newNote]
            }
        )
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
        throw new Error('Произошла ошибка')
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
                                        createdAt={n.createdAt}
                                        href={`${n.id}`}
                                        className="last-of-type:border-b"
                                        key={n.id}
                                    />
                                ))}
                            </>
                        </nav>
                        <section className="border-l border-slate-300">
                            <Outlet />
                        </section>
                    </>
                )}
            </div>
        </main>
    )
}
