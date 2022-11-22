import "./posts.scss";
import Post from "../post/Post";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Logo from '../../assets/logo-groupo.svg'
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from '@tanstack/react-query';
import CreatePost from "../createPost/CreatePost";
import Loader from "../loader/Loader";

export default function Posts() {
    ////////////////////////////////////////////////////////
    //Création toggle pour afficher le formulaire d'ajout

    const [modalCreate, setModalCreate] = useState(false);

    ////////////////////////////////////////////////////////
    //Récupération et affichage de tous les posts
    const {currentUser} = useContext(AuthContext);
    const token = currentUser.token;

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

    return (
        <main className="posts">
            <button className="posts_btn" role={'Create publication'} type='button' onClick={() => setModalCreate(true)}>
                Nouvelle publication <AddIcon />
            </button>
            {modalCreate && <CreatePost setModalCreate={setModalCreate}/>}
            {error ? <img src={Logo} alt="logo groupomania" style={{width: "90%", maxWidth: "500px"}}/> 
                : isLoading 
                ? <Loader/> 
                : data.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </main>
    )
};
