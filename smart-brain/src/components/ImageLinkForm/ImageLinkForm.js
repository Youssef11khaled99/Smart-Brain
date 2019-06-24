import React from "react";
import './ImageLinkForm.css';
const ImageLinkFrom = ({ onChangeInput, onSubmit }) => {
    return (
        <div>
            <p className='f3 fw4'> 
                {' This Magic will detect faces in your pictures. GIt it a try.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'> 
                    <input className="f4 pa2 w-70 center" type='tex' onChange= {onChangeInput} />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkFrom;