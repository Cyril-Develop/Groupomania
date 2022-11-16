import './updatePost.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";

export default function UpdatePost({ setModalUpdate, setModalMenu, post }) {

    const closeModal = () => {
        setModalMenu(false);
        setModalUpdate(true);
    };
    ///////////////////////////////////////////////////////////

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const [image, setImage] = useState(post.imagePost);
    const [content, setContent] = useState(post.content);
    const [title, setTitle] = useState(post.title);

    const queryClient = useQueryClient();

    const mutation = useMutation((formData) => {
        return axios.put(`http://localhost:8080/api/post/${post.id}`, formData, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })}
    ,{
        onSuccess: () => {
        queryClient.invalidateQueries( ['posts'] )
        },
    });

    const editPost = (e) => {
        e.preventDefault();
        console.log('Clique sur le bouton');
        const formData = new FormData();
        formData.append('image', image !== post.imagePost ? image : post.imagePost);
        formData.append('title', title);
        formData.append('content', content);
        mutation.mutate(formData);
        setModalMenu(false);
    };

    return (
        <>
            <div className='modal' >
                <div className="modal_content">
                    <button onClick={closeModal} className="close-modal">
                        <CloseIcon/>
                    </button>
                    <form>
                        <div>
                            <label htmlFor="title">Titre</label>
                            <input type="text" id="title" name="title" onChange={e => setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" cols="50" rows="5" name="description" style={{resize : 'none'}} onChange={e => setContent(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label className="change_image" htmlFor="image">
                                <AddPhotoAlternateIcon />Remplacer l'image
                            </label>
                            <input type="file" id="image" style={{display:'none'}} name="image" onChange={e => setImage(e.target.files[0])} />
                            <button  type="submit" onClick={editPost}>Modifier la publication</button>
                        </div>
                        <div>
                            {image !== post.imagePost ? <img src={URL.createObjectURL(image)} alt="illustration de publication" className="image_preview"/> : <img src={image} alt="illustration de publication" className="image_preview"/>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};
