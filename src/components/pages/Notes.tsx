import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { ForbiddenPage, NoteLink } from '..'
import { ReactNode } from 'react'
import { useNotesStore, useUser } from '../../store'
import { useQuery } from 'react-query'
import { supabase } from '../../supabase'
import { TNote } from '../../types'

interface IAddNoteBtn {
  onClick?: () => void
  children: ReactNode
}
const AddNoteBtn = ({ children, onClick }: IAddNoteBtn) => {
  return (
    <div
      className="flex h-20 items-center gap-4 cursor-pointer hover:bg-white/[20%] p-3"
      onClick={onClick}
    >
      <div>
        <svg className="block" width="24" height="24" role="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13 11V3.5c0-.276-.214-.5-.505-.5h-.99a.507.507 0 0 0-.505.5V11H3.5c-.276 0-.5.214-.5.505v.99c0 .279.23.505.5.505H11v7.5c0 .276.214.5.505.5h.99c.279 0 .505-.23.505-.5V13h7.5c.276 0 .5-.214.5-.505v-.99a.507.507 0 0 0-.5-.505H13z"
          ></path>
        </svg>
      </div>

      <div className="truncate">{children}</div>
    </div>
  )
}

export const Notes = () => {
  const { user: userFromParams } = useParams()
  const authentificatedUser = useUser((state) => state.user?.name)
  const userId = useUser((state) => state.user?.id)
  const setNotes = useNotesStore((state) => state.setNotes)

  const navigate = useNavigate()

  const { data, isError, isFetching } = useQuery({
    queryKey: authentificatedUser,
    queryFn: async () => {
      if (!userId) {
        throw new Error('User id was not provided')
      }

      const { data, error } = await supabase
        .from('notes')
        .select('created_at, name, payload, id, slug')
        .eq('user_id', userId)

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  })

  if (authentificatedUser === undefined) {
    navigate('/')
  }

  if (authentificatedUser !== userFromParams || userId === undefined) {
    return <ForbiddenPage />
  }

  if (isFetching) {
    return <h1>Загрузка</h1>
  }

  if (isError || !data) {
    throw new Error('Произошла ошибка')
  }

  const notes: TNote[] = data.map((n) => {
    return {
      createdAt: n.created_at,
      name: n.name,
      id: n.id,
      payload: n.payload,
      slug: n.slug,
    }
  })

  setNotes(notes)

  return (
    <main className="w-screen h-screen p-2 lg:p-10 overflow-hidden flex flex-col">
      <div className="rounded-md flex w-full border border-slate-300 overflow-hidden flex-auto">
        <nav className="flex flex-col overflow-hidden">
          <AddNoteBtn>Новая заметка</AddNoteBtn>
          {notes.map((n) => (
            <NoteLink
              slug={n.slug}
              id={n.id}
              payload={n.payload}
              name={n.name}
              createdAt={n.createdAt}
              href={n.name}
              className="last-of-type:border-b"
            />
          ))}
        </nav>
        <section className="grow-[2]">
          <Outlet />
        </section>
      </div>
    </main>
  )
}
