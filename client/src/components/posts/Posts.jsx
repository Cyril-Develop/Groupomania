import AddIcon from "@mui/icons-material/Add";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Logo from '../../assets/logo-groupo.svg';
import { AuthContext } from "../../context/authContext";
import CreatePost from "../createPost/CreatePost";
import Loader from "../loader/Loader";
import Post from "../post/Post";
import "./posts.scss";

export default function Posts() {

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const [modalCreate, setModalCreate] = useState(false);

    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post`, {
                headers: {
                    'authorization': `bearer ${token}`
                }
            })
            return res.data;
        }
    })

    const [currentUserRole, setCurrentUserRole] = useState();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/user/${currentUser.userId}`, {
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
            {modalCreate && <CreatePost setModalCreate={setModalCreate} />}
            {error ? <img src={Logo} alt="logo groupomania" style={{ width: "90%", maxWidth: "500px" }} />
                : isLoading
                    ? <Loader />
                    : data.map((post) => (
                        <Post post={post} key={post.id} currentUserRole={currentUserRole} />
                    ))}
        </main>
    )
};
