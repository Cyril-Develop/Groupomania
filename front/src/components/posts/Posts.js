import "./posts.scss";
import Post from "../post/Post";
import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from '@tanstack/react-query';

export default function Posts() {

    const [modal, setmodal] = useState(false);

    const handleModal = () => {
        setmodal(!modal);
    };

    ////////////////////////////////////////////////////////
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

console.log(data);

////////////////////////////////////////////////////////
    const [image, setImage] = useState(null);
    const [inputValues, setInputValues] = useState({
        title: '',
        description: ''
    });

    const handleValues = (e) => {
        const { name, value } = e.target;
        setInputValues({...inputValues,[name]: value});    
    }
    
	const handleFile = (e) => {
        setImage(e.target.files[0]);     
	}

    const handlePost  = (e) => {
        e.preventDefault();
   
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', inputValues.title);
        formData.append('content', inputValues.description);
        axios.post('http://localhost:8080/api/post', formData, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                //setmodal(!modal);
                window.location.reload();
            })
            .catch(err => { 
                console.log(err);
            })       
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
                            <input type="text" id="title" name="title" onChange={handleValues}/>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" cols="50" rows="5" name="description" style={{resize : 'none'}} onChange={handleValues}></textarea>
                        </div>
                        <div>
                            <label className="change_image" htmlFor="image">
                                <AddPhotoAlternateIcon />Ajouter une image
                            </label>
                            <input type="file" id="image" style={{display:'none'}} name="image" onChange={handleFile}/>
                            <button onClick={handlePost} type="submit">Publier</button>
                        </div>
                    </form>
                </div>
            </div>
}
            {error ? "Impossible d'afficher les publications" 
                : isLoading 
                ? "Chargement..." 
                : data.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
}
