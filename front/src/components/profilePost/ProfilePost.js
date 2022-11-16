import axios from 'axios'
import Logo from '../../assets/logo-groupo.svg'
import { useQuery } from '@tanstack/react-query';
import Post from '../../components/post/Post';

export default function ProfilePost({id, token}) {

    const { isLoading, error, data } = useQuery(['posts'], () =>
		axios.get(`http://localhost:8080/api/post/${id}`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(res => {
			return res.data; 
		})        
	);

  return (
    <>
        {error ? 
        <img src={Logo} alt="logo groupomania" /> : 
        isLoading ? 
        'Chargement...' : 
        data.map((p) => (
            <Post key={p.id} post={p} />
        ))
        }
    </>
  )
}
