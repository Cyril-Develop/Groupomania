import './updatePost.scss';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import axios from "axios";
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function UpdatePost({ setModalUpdate, setModalMenu, post }) {

    const closeModal = () => {
        setModalMenu(false);
        setModalUpdate(true);
    };
    ///////////////////////////////////////////////////////////

    const { currentUser } = useContext(AuthContext);
    const token = currentUser.token;

    const [image, setImage] = useState(post.imagePost);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [formError, setFormError] = useState('');

    const queryClient = useQueryClient();

    const mutation = useMutation((formData) => {
        return axios.put(`${process.env.REACT_APP_BASE_URL}/api/post/${post.id}`, formData, {
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
        if(title === "" || content === "" || image.size > 1000000){
            setFormError('Veuillez remplir tous les champs, les images ne doivent pas dépasser 1Mo');
        }  else {
            const formData = new FormData();
            formData.append('image', image !== post.imagePost ? image : post.imagePost);
            formData.append('title', title);
            formData.append('content', content);
            mutation.mutate(formData);
            setModalMenu(false);
        }
    };

    return (
        <>
            <div className='modal' >
                <div className="modal_content">
                    <button aria-label='Close modal' type="button" rel="nofollow" onClick={closeModal} className="close-modal">
                        <CloseIcon/>
                    </button>
                    <form>
                        <div>
                            <label htmlFor="title">Titre <span>{title.length}/50</span> </label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title"
                                maxLength={50}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description <span>{content.length}/200</span> </label>
                            <textarea 
                                id="description" 
                                cols="50" 
                                rows="5" 
                                name="description"
                                maxLength={200}  
                                style={{resize : 'none'}} 
                                onChange={e => setContent(e.target.value)}>
                            </textarea>
                            {formError && <p className="error">{formError}</p>}
                        </div>
                        <div>
                            <label className="change_image" htmlFor="image">
                                <PhotoIcon/> image
                            </label>
                            <input accept="image/png, image/jpeg, image/jpg, image/gif" type="file" id="image" style={{display:'none'}} name="image" onChange={e => setImage(e.target.files[0])} />
                            <button  type="submit" onClick={editPost}>Modifier</button>
                        </div>
                        <div>
                            {!image ? '' : image !== post.imagePost ? <img src={URL.createObjectURL(image)} alt="illustration de publication" className="image_preview"/> : <img src={image} alt="illustration de publication" className="image_preview"/>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};
