import { useState } from 'react';
import { useQuery } from 'react-query';
import { SupabaseService } from '../supabase';

const useCheckLogin = (login: string, onStart?: () => void, onSettled?: () => void,) => {
    const [isLoginExist, setIsLoginExist] = useState(false);

    const { isFetching, isError } = useQuery({
        queryKey: ['getLogin', login],
        queryFn: async () => {
            onStart ? onStart() : null

            const [data, error] = await SupabaseService.getRow('users', ['login'], [['login', login]])

            if (error || !data) {
                throw new Error('Failed to check login avalability')
            }

            setIsLoginExist(data.length !== 0)
        },
        refetchOnMount: false,
        onSettled: onSettled,
    })


    return { isLoginExist, isFetching, isError };
};

export { useCheckLogin };
