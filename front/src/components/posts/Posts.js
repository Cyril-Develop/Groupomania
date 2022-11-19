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
        axios.get("http://localhost:8080/api/post", {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
        .then(res => {
            return res.data; 
        })        
    );

    return (
        <div className="posts">
            <button onClick={() => setModalCreate(true)}>
                Nouvelle publication <AddIcon />
            </button>
            {modalCreate && <CreatePost setModalCreate={setModalCreate}/>}
            {error ? <img src={Logo} alt="logo groupomania" style={{width: "90%", maxWidth: "500px"}}/> 
                : isLoading 
                ? <Loader/> 
                : data.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
};
