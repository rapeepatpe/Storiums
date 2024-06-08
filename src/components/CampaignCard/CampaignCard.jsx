import React, { useState, useEffect, useRef } from 'react';

import InputCurrencyField from '../InputCurrencyField/InputCurrencyField'

//import TokenDataContext from '../../../TokenDataContext';

import './CampaignCard.css'

//import './InputBox.css'


function CampaignCard(props) {
    //const appContext = useContext(TokenDataContext);

    const { Label, Type, Discount, OnDiscountChanged, Disable } = props;

    const [ discount, setDiscount ] = useState(Discount);


    useEffect(() => {
        setDiscount(Discount);
    }, [Discount]);

    const handleDiscountChanged = (e) => {
        OnDiscountChanged(e);
    }
    

    return (
            <div className="CampaignCard-campaign-container">
            <div className="CampaignCard-campaign-text">
                    {Label} : 
                </div>
            <div className="CampaignCard-campaign-Input">
                <InputCurrencyField 
                    MaxAmount={Type === "Percentage" ? 100 : 99999}
                    AllowPoint={false}
                    NumLength={Type === "Percentage" ? 3 : 5}
                    DecLength={0}
                    DefaultValue={discount}
                    OnTextChanged={(e) => { handleDiscountChanged(e); }}v

                    OnBlur={() => { }}
                    AllowPaste={false}
                    DisplayPoint={false}
                    Disable={Disable}
                    />
                </div>
            </div>
    );
}



export default CampaignCard;

