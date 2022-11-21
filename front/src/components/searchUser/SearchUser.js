import './searchUser.scss'
import axios from "axios";
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

export default function SearchUser() {

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`http://localhost:8080/api/user`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            setSearchResult(res.data);
        };
        fetchUsers();
    }, []);

    const resetSearch = () => {
        setQuery('');
    }
    
    return (
        <div className='search'>
            <input 
                type="text" 
                placeholder="Rechercher un utilisateur" 
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />   
            <ul className='search_list'>
                {query && searchResult.filter(user => user.lastname.toLowerCase().includes(query.toLowerCase())
                ).map(user => (
                    <li className='search_list_item' key={user.id} >
                        <Link to={`/profile/${user.id}`} onClick={resetSearch}>
                            <div><img src={user.imageProfile} alt="Utilisateur groupomania" /></div>
                            <p>{user.firstname} {user.lastname}</p>
                        </Link>                       
                    </li>                     
                ))}
            </ul>
        </div>
    )
};
