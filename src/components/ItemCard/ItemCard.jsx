import React, { useState, useEffect, useRef } from 'react';

import InputCurrencyField from '../InputCurrencyField/InputCurrencyField'

//import TokenDataContext from '../../../TokenDataContext';

import './ItemCard.css'

//import './InputBox.css'


function ItemCard(props) {
    //const appContext = useContext(TokenDataContext);

    const { Label, Price, Image,Quantity ,OnQuantityChanged } = props;
    const [quantity, setQuantity] = useState(Quantity);

    useEffect(() => {
        setQuantity(Quantity);
    }, [Quantity]);

    const handleQTYChanged = (e) => {
        OnQuantityChanged(e);
    }

    return (
        <div className="ItemCard-container">
            <img src={Image} alt="item" className='ItemCard-image' />
            <div className="ItemCard-text-container">
                <div className="ItemCard-text">
                    {Label}
                </div>
                <div className="ItemCard-text">
                    {Price} Baht
                </div>
            </div>
            <div className="ItemCard-qty-container">
                <div className="ItemCard-qty-text">
                    Quantity :
                </div>
                <div>
                    <InputCurrencyField 
                        MaxAmount={999}
                        AllowPoint={false}
                        NumLength={3}
                        DecLength={0}
                        DefaultValue={quantity}
                        OnTextChanged={(e) => { handleQTYChanged(e); }}
                        OnBlur={() => { }} //for validate
                        AllowPaste={false}
                        DisplayPoint={false}
                    />
                </div>
            </div>
        </div>

    );
}



export default ItemCard;

