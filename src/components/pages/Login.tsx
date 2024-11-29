import { Link } from 'react-router-dom'
import { FetchButton, Input } from '../ui'
import { useTitle } from '../../hooks/utilsHooks'

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useErrorNotification } from '../ui/Notifications/hooks'
import { useUser } from '../../store'
import { supabase } from '../../supabase'
import { useAuthRedirect } from '../../hooks'

const Login = () => {
  useTitle('Войти в заметочную')
  const { setAuth } = useUser()
  const { setUser } = useUser()

  useAuthRedirect()

  const showErrorNotification = useErrorNotification()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const isButtonAvalable = login.trim().length > 0 && password.trim().length > 0

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { data, error } = await supabase
      .from('users')
      .select('login, id')
      .eq('login', login)

    if (!data || error) {
      showErrorNotification('Не удалось войти', 'Неправильный логин или пароль')
      return
    }

    setAuth(true)
    // @ts-expect-error: Cannot find name
    _tmr.push({ type: 'reachGoal', id: 3582359, goal: 'login' })
    setUser(data[0].login, data[0].id)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    dispatch: Dispatch<SetStateAction<string>>
  ) => {
    dispatch(e.target.value.trim())
  }

  return (
    <>
      <form
        className="flex flex-col w-full max-w-[375px] min-h-[500px] items-center p-10 gap-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1>Вход</h1>
        <Input
          onFocus={(e) => (e.currentTarget.type = 'text')}
          placeholder="Логин"
          className="mt-6 w-full"
          defaultValue={login}
          onChange={(e) => handleChange(e, setLogin)}
          required
          autoComplete="off"
        />
        <Input
          onFocus={(e) => (e.currentTarget.type = 'password')}
          placeholder="Пароль"
          className="w-full"
          defaultValue={password}
          onChange={(e) => handleChange(e, setPassword)}
          required
          autoComplete="off"
        />

        <FetchButton disabled={!isButtonAvalable} isFetching={false} type="submit">
          Войти
        </FetchButton>

        <p className=" mt-2">
          У вас нету аккаунта? <Link to="/signup">Создайте его!</Link>
        </p>
      </form>
    </>
  )
}

export { Login }
