import './menuPost.scss'
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdatePost from '../updatePost/UpdatePost';
import { useState } from 'react';

export default function MenuPost({ setModalMenu }) {

    const [modalUpdate, setModalUpdate] = useState(false);

   


    return (
        <div className='post_menu'>
            <div className="post_menu_item" onClick={ () => setModalUpdate(true)}>
                <span><ContentCutIcon/> Modifier</span>
            </div>
            <div className="post_menu_item">
                <span><DeleteForeverIcon/> Supprimer</span>
            </div>
            {modalUpdate && <UpdatePost setModalUpdate={setModalUpdate} setModalMenu={setModalMenu} />}
        </div>
    )
};
