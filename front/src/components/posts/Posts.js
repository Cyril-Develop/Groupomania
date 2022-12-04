import "./posts.scss";
import AddIcon from "@mui/icons-material/Add";
import Logo from '../../assets/logo-groupo.svg'
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";
import Loader from "../loader/Loader";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from '@tanstack/react-query';

export default function Posts() {

    const {currentUser} = useContext(AuthContext);
    const token = currentUser.token;

    const [modalCreate, setModalCreate] = useState(false);

    const { isLoading, error, data } = useQuery(['posts'], () =>
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/post`, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
        .then(res => {
            return res.data; 
        })        
    );

    const [currentUserRole, setCurrentUserRole] = useState();

    useEffect(() => {
		axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, {
			headers: {
				'authorization': `bearer ${token}`
			}
		})
		.then(res => {
			setCurrentUserRole(res.data.role);
		})
	}, [token, currentUser.userId]);

    return (
        <main className="posts">
            <button className="posts_btn" type='button' onClick={() => setModalCreate(true)}>
                Nouvelle publication <AddIcon />
            </button>
            {modalCreate && <CreatePost setModalCreate={setModalCreate}/>}
            {error ? <img src={Logo} alt="logo groupomania" style={{width: "90%", maxWidth: "500px"}}/> 
                : isLoading 
                ? <Loader/> 
                : data.map((post) => (
                <Post post={post} key={post.id} currentUserRole={currentUserRole}/>
            ))}
        </main>
    )
};
