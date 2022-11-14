import "./posts.scss";
import Post from "../post/Post";
import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Logo from '../../assets/logo-groupo.svg'
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Posts() {
    ////////////////////////////////////////////////////////
    //Création toggle pour afficher le formulaire d'ajout

    const [modal, setmodal] = useState(false);

    const handleModal = () => {
        setmodal(!modal);
        setFormError('');
        setTitle("");
        setContent("");
        setImage(null);
    };

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
    ////////////////////////////////////////////////////////
    //Création d'un post et mis à jour de la liste des posts sans refresh

    const [formError, setFormError] = useState('');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    const queryClient = useQueryClient();

    const formData = new FormData();
    const mutation = useMutation((formData) => {
            formData.append('image', image);
            formData.append('title', title);
            formData.append('content', content);

        return axios.post("http://localhost:8080/api/post", formData, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
    },{
        onSuccess: () => {
          queryClient.invalidateQueries( ['posts'] )
        },
    })

    const handlePost = e => {
        e.preventDefault();
        if(title === "" || content === ""){
            setFormError('Veuillez remplir tous les champs');
        } else {
            mutation.mutate(formData);
            setFormError('');
            setTitle("");
            setContent("");
            setImage(null);
            setmodal(!modal);
        }
    };

    return (
        <div className="posts">
            <button onClick={handleModal}>
                Nouvelle publication <AddIcon />
            </button>
{modal && 
            <div className='modal' >
                <div className="modal_content">
                <button onClick={handleModal} className="close-modal">
                    <CloseIcon/>
                </button>
                    <form>
                        <div>
                            <label htmlFor="title">Titre</label>
                            <input type="text" id="title" name="title" value={title} onChange={ e => setTitle(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" cols="50" rows="5" name="description" value={content} style={{resize : 'none'}} onChange={e => setContent(e.target.value)}></textarea>
                            {formError && <p className="error">{formError}</p>}
                        </div>
                        <div>
                            <label className="change_image" htmlFor="image">
                                <AddPhotoAlternateIcon />Ajouter une image
                            </label>
                            <input type="file" id="image" style={{display:'none'}} name="image" onChange={e => setImage(e.target.files[0])}/>
                            <button onClick={handlePost} type="submit">Publier</button>
                        </div>
                        <div>
                            {image && <img src={URL.createObjectURL(image)} alt="illustration de publication" className="image_preview"/>}
                        </div>
                    </form>
                </div>
            </div>
}
            {error ? <img src={Logo} alt="logo groupomania" /> 
                : isLoading 
                ? "Chargement..." 
                : data.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
}
