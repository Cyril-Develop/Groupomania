import './createPost.scss'
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreatePost({setModalCreate}) {

    const {currentUser} = useContext(AuthContext);
    const token = currentUser.token;

    const [formError, setFormError] = useState('');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const queryClient = useQueryClient();

    const formData = new FormData();
    const mutation = useMutation(() => {
            formData.append('image', image);
            formData.append('title', title);
            formData.append('content', content);

        return axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/post`, formData, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
    },{
        onSuccess: () => {
          queryClient.invalidateQueries( ['posts'] )
        },
    });
    
    const handlePost = e => {
        e.preventDefault();
        if(title === ""){
            setFormError('Merci de renseigner un titre');
        }  else if (image && image.size > 1000000) {
            setFormError('les images ne doivent pas dépasser 1Mo');
        } else {
            mutation.mutate();
            setFormError('');
            setTitle("");
            setContent("");
            setImage(null);
            setModalCreate(false);
        }   
    };

  return (
    <>
        <div className='modal'>
            <div className="modal_content">
                <button 
                    aria-label='Close modal' 
                    type="button" rel="nofollow" 
                    onClick={() => setModalCreate(false)} className="close-modal">
                    <CloseIcon/>
                </button>
                <form>
                    <div>
                        <label htmlFor="title">Titre <span>{title.length}/50</span></label>   
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            maxLength={50}
                            value={title} 
                            onChange={ e => setTitle(e.target.value)}
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
                            value={content} 
                            style={{resize : 'none'}} 
                            onChange={e => setContent(e.target.value)}>
                        </textarea>
                        {formError && <p className="error">{formError}</p>}
                    </div>
                    <div>
                        <label className="change_image" htmlFor="image">
                            <PhotoIcon/> image
                        </label>
                        <input 
                            accept="image/png, image/jpeg, image/jpg, image/gif" 
                            type="file" id="image" 
                            style={{display:'none'}} 
                            name="image" 
                            onChange={e => setImage(e.target.files[0])}
                        />
                        <button onClick={handlePost} type="submit">Publier</button>
                    </div>
                    <div>
                        {image && <img src={URL.createObjectURL(image)} alt="illustration de publication" className="image_preview"/>}
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
