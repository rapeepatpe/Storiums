import React, { } from 'react';

//import TokenDataContext from '../../../TokenDataContext';

import './HeaderTag.css'

//import './InputBox.css'

function HeaderTag(props){
    //const appContext = useContext(TokenDataContext);

    const { Label, Color } = props;


    return (
        <div className={Color === "Red" ? "HeaderTag-container-red" : "HeaderTag-container"}>
            <div className={Color === "Red" ? "HeaderTag-text-red" : "HeaderTag-text"}>
                {Label}
            </div>
        </div>
        
    );
}



export default HeaderTag;

