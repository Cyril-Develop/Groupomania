import './accord.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from 'react';

export default function Accord() {

    const [toggle, setToggle] = useState(false);
    const [heightEl, setHeightEl] = useState();

    const toggleState = () => {  
        setToggle(!toggle);
    };

    const refHeight = useRef();

    useEffect(() => {

        setHeightEl(`${refHeight.current.scrollHeight}px`);

    }, []);

  return (
    <div className='accord'>
        <div onClick={toggleState} className="accord_visible">
            <h2>Ajouter une publication</h2>
            <FontAwesomeIcon icon={faChevronDown} style={{fontSize: '25px'}}/>
        </div>
        <div 
            ref={refHeight} 
            className={toggle ? 'accord_toggle animated'  : 'accord_toggle'}
            style={{height: toggle ? `${heightEl}` : '0px'}}>
            <form>
                <textarea name="" id="" cols="30" rows="10" placeholder='Ma nouvelle publication....'></textarea>
                <div className="accord_interaction">
                    <label htmlFor="imagePost"><FontAwesomeIcon icon={faCameraRetro} />Ajouter une image</label>
                    <input type="file" id="imagePost" style={{display: 'none'}}/>
                    <button type='submit'>Publier</button>
                </div>
            </form>
        </div>
    </div>
  )
}
