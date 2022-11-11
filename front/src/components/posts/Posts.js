import "./posts.scss";
import Post from "../post/Post";
import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

export default function Posts() {

    const [modal, setmodal] = useState(false);

    const handleModal = () => {
        setmodal(!modal);
    };

    const posts = [
        {
            id: 1,
            name: "John Doe",
            userId: 1,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
            profilePic:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            id: 2,
            name: "John Doe",
            userId: 1,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
            profilePic:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
        },
        {
            id: 3,
            name: "Jane Doe",
            userId: 2,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
            profilePic:
                "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
            desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
        },
    ];

    const { currentUser } = useContext(AuthContext);

    const token = currentUser.token;

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');

	const handleFile = (e) => {
		setImage(e.target.files[0]);     
	}

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDesc = (e) => {
        setdescription(e.target.value);
    }

   

    const handlePost  = (e) => {

        e.preventDefault();
   
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', description);
        axios.post('http://localhost:8080/api/post', formData, {
            headers: {
                'authorization': `bearer ${token}`
            }
        })
            .then(res => {
                console.log(res);
                setmodal(!modal);
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
                            <label htmlFor="titlePost">Titre</label>
                            <input type="text" id="titlePost" onChange={handleTitle}/>
                        </div>
                        <div>
                            <label htmlFor="descPost">Description</label>
                            <textarea id="descPost" cols="50" rows="5" style={{resize : 'none'}} onChange={handleDesc}></textarea>
                        </div>
                        <div>
                            <label className="change_image" htmlFor="imagePost">
                                <AddPhotoAlternateIcon />Ajouter un image
                            </label>
                            <input type="file" id="imagePost" style={{display:'none'}} onChange={handleFile}/>
                            <button onClick={handlePost} type="submit">Publier</button>
                        </div>
                    </form>
                </div>
            </div>
}
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
}
