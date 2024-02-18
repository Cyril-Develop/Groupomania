import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";
import UpdatePost from '../updatePost/UpdatePost';
import './menuPost.scss';

export default function MenuPost({ setModalMenu, post }) {

    const [modalUpdate, setModalUpdate] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: () => {
            return axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post/${post.id}`, {
                headers: {
                    'authorization': `bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
        },
    });

    const deletePost = () => {
        mutate();
        setModalMenu(false);
    };

    return (
        <ul className='post_menu'>
            <li>
                <Link className="post_menu_item" onClick={() => setModalUpdate(true)}><ContentCutIcon /> Modifier</Link>
            </li>
            <li>
                <Link className="post_menu_item" onClick={deletePost}><DeleteForeverIcon /> Supprimer</Link>
            </li>
            {modalUpdate && <UpdatePost post={post} setModalUpdate={setModalUpdate} setModalMenu={setModalMenu} />}
        </ul>
    )
};
