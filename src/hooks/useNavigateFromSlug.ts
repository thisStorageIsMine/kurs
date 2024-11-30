import { useNavigate } from 'react-router-dom'

export const useNavigateFromSlug = () => {
  const navigate = useNavigate()

  return (userId: number, availableSlugs: string[]) => {
    if (availableSlugs.length === 0) {
      navigate(`/${userId}/`)
      return
    }

    navigate(`/${userId}/${availableSlugs[0]}`)
  }
}
