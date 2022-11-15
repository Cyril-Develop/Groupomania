import './updatePost.scss'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

export default function UpdatePost({ setModalUpdate, setModalMenu }) {

    const closeModal = () => {
        setModalMenu(false);
        setModalUpdate(true);
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
                        <input type="text" id="title" name="title" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" cols="50" rows="5" name="description" style={{resize : 'none'}} ></textarea>
                    </div>
                    <div>
                        <label className="change_image" htmlFor="image">
                            <AddPhotoAlternateIcon />Ajouter une image
                        </label>
                        <input type="file" id="image" style={{display:'none'}} name="image" />
                        <button type="submit">Modifier</button>
                    </div>
                    {/* <div>
                    </div> */}
                </form>
            </div>
        </div>
    </>
  )
}
