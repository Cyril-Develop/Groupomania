import './menuPost.scss'
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdatePost from '../updatePost/UpdatePost';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";

export default function MenuPost({ setModalMenu, post }) {

    const [modalUpdate, setModalUpdate] = useState(false);

   //Suppression d'un post

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const queryClient = useQueryClient();

   const mutation = useMutation(() => {
        return axios.delete(`http://localhost:8080/api/post/${post.id}`,  {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
    },{
        onSuccess: () => {
        queryClient.invalidateQueries( ['posts'] )
        },
    });

    const deletePost = () => {
        mutation.mutate();
        setModalMenu(false);
    };

    return (
        <div className='post_menu'>
            <div className="post_menu_item" onClick={ () => setModalUpdate(true)}>
                <span><ContentCutIcon/> Modifier</span>
            </div>
            <div className="post_menu_item" onClick={deletePost}>
                <span><DeleteForeverIcon/> Supprimer</span>
            </div>
            {modalUpdate && <UpdatePost post={post} setModalUpdate={setModalUpdate} setModalMenu={setModalMenu} />}
        </div>
    )
};
