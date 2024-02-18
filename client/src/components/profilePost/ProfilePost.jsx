import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Logo from '../../assets/logo-groupo.svg';
import Post from '../post/Post';
import './profilePost.scss';

export default function ProfilePost({ id, token, currentUserRole }) {

    const { isLoading, error, data } = useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post/${id}`, {
                headers: {
                    'authorization': `bearer ${token}`
                }
            })
            return res.data;
        }
    })

    return (
        <main className='profilePost'>
            {
                error ?
                    <img src={Logo} alt="logo groupomania" /> :
                    isLoading ?
                        'Chargement...' :
                        data.map((p) => (
                            <Post key={p.id} post={p} currentUserRole={currentUserRole} />
                        ))
            }
        </main>
    )
}