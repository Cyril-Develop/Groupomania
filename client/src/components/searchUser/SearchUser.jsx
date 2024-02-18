import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import './searchUser.scss';

export default function SearchUser() {

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            setSearchResult(res.data);
        };
        fetchUsers();
    }, [token]);

    const resetSearch = () => {
        setQuery('');
    };

    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Rechercher un utilisateur"
                value={query}
                aria-label='Rechercher un utilisateur'
                title="Rechercher un utilisateur"
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul className='search_list'>
                {query && searchResult.filter(user => (user.lastname.toLowerCase().includes(query.toLowerCase()) ||
                    user.firstname.toLowerCase().includes(query.toLowerCase()))
                ).map(user => (
                    <li className='search_list_item' key={user.id} >
                        <Link to={`/profile/${user.id}`} onClick={resetSearch}>
                            <img src={user.imageProfile} alt="Utilisateur groupomania" />
                            <p>{user.firstname} {user.lastname}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};
