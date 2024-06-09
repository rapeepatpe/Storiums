import React, { useState, useEffect } from 'react';
import './App.css';

import HeaderTag from './components/HeaderTag/HeaderTag';
import ItemCard from './components/ItemCard/ItemCard';
import CampaignCard from './components/CampaignCard/CampaignCard';



import TShirtImage from './img/T-Shirt.png';
import HatImage from './img/Hat.png';
import HoodieImage from './img/Hoodie.png';
import BagImage from './img/Bag.png';
import BeltImage from './img/Belt.png'
import WatchImage from './img/Watch.png';

const TSHIRT_PRICE = 350;
const HAT_PRICE = 250;
const HOODIE_PRICE = 700;
const WATCH_PRICE = 850;
const BELT_PRICE = 230;
const BAG_PRICE = 640;

function App() {

    const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);

    const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);

    const [tshirtQTY,   setTshirtQTY    ] = useState(0);
    const [hatQTY,      setHatQTY       ] = useState(0);
    const [hoodieQTY,   setHoodieQTY    ] = useState(0);
    const [watchQTY,    setWatchQTY     ] = useState(0);
    const [beltQTY,     setBeltQTY      ] = useState(0);
    const [bagQTY,      setBagQTY       ] = useState(0);

    const [clothingTotalPrice, setClothingTotalPrice] = useState(0);
    const [electronicsTotalPrice, setElectronicsTotalPrice] = useState(0);
    const [accessoriesTotalPrice, setAccessoriesTotalPrice] = useState(0);

    const [discountFixAmount, setDiscountFixAmount] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");

    const [discountByPoint, setDiscountByPoint] = useState("");
    const [discountPercentageCategory, setDiscountPercentageCategory] = useState("");
    const [currentCategory, setCurrentCategory] = useState("Clothing");

    const [onEveryPrice, setOnEveryPrice] = useState("");
    const [discountSpecialCampaign, setDiscountSpecialCampaign] = useState("");


    const [currentCampaign, setCurrentCampaign] = useState("Coupon");

    



    const handleQtyTShirt = (e) => {
        setTshirtQTY(e);
    }

    const handleQtyHat = (e) => {
        setHatQTY(e);
    }

    const handleQtyHoodie = (e) => {
        setHoodieQTY(e);
    }

    const handleQtyWatch = (e) => {
        setWatchQTY(e);
    }

    const handleQtyBelt = (e) => {
        setBeltQTY(e);
    }

    const handleQtybag = (e) => {
        setBagQTY(e);
    }



    useEffect(() => {

        let _clothingTotal = (tshirtQTY * TSHIRT_PRICE) + (hoodieQTY * HOODIE_PRICE);
        let _accessoriesTotal = (hatQTY * HAT_PRICE) + (beltQTY * BELT_PRICE) + (bagQTY * BAG_PRICE);
        let _electronicsTotal = (watchQTY * WATCH_PRICE);

        let _calTotal = _clothingTotal + _accessoriesTotal + _electronicsTotal;

        setClothingTotalPrice(_clothingTotal);
        setAccessoriesTotalPrice(_accessoriesTotal);
        setElectronicsTotalPrice(_electronicsTotal);

        setTotalPriceBeforeDiscount(_calTotal);
        
    }, [tshirtQTY, hatQTY, hoodieQTY, watchQTY, beltQTY, bagQTY]);

    useEffect(() => {
        
        let _calTotalDiscount = totalPriceBeforeDiscount;
       
        if (discountFixAmount !== 0 && discountFixAmount !== "") {
            if (discountFixAmount < _calTotalDiscount) {
                _calTotalDiscount = _calTotalDiscount - discountFixAmount;
            }
            else {
                _calTotalDiscount = 0;
            }
            

        }
        else if (discountPercentage !== 0 && discountPercentage !== "") {
            if (discountPercentage <= 100) {
                _calTotalDiscount = _calTotalDiscount - (_calTotalDiscount * (discountPercentage / 100));
            }
            else {
                _calTotalDiscount = 0;
            }
            
        }

        if ((discountPercentageCategory !== 0 && discountPercentageCategory !== "")) {

            let _tmpPercenCategory = discountPercentageCategory <= 100? discountPercentageCategory : 100;

            if (currentCategory === "Clothing") {
                _calTotalDiscount = _calTotalDiscount - (clothingTotalPrice * (_tmpPercenCategory / 100));
            }
            else if (currentCategory === "Accessories") {
                _calTotalDiscount = _calTotalDiscount - (accessoriesTotalPrice * (_tmpPercenCategory / 100));
            }
            else if (currentCategory === "Electronics") {
                _calTotalDiscount = _calTotalDiscount - (electronicsTotalPrice * (_tmpPercenCategory / 100));
            }
            
            
        }

        else if (discountByPoint !== 0 && discountByPoint !== "") {
            if (discountByPoint > (20 / 100) * _calTotalDiscount) {
                _calTotalDiscount = _calTotalDiscount - (_calTotalDiscount * (20 / 100));
            }
            else {
                _calTotalDiscount = _calTotalDiscount - discountByPoint;
            }
            
        }

        if ((onEveryPrice !== 0 && onEveryPrice !== "") && (discountSpecialCampaign !== 0 && discountSpecialCampaign !== "")) {
            _calTotalDiscount = _calTotalDiscount - ((Math.floor(_calTotalDiscount / onEveryPrice)) * discountSpecialCampaign)

        }

        if(_calTotalDiscount < 0){
            _calTotalDiscount = 0;
        }

        setTotalPriceAfterDiscount(_calTotalDiscount);
        

    }, [totalPriceBeforeDiscount, discountFixAmount, discountPercentage, discountByPoint, discountPercentageCategory, currentCategory, onEveryPrice, discountSpecialCampaign ]);


    const handleCouponClick = (e) => {
        setCurrentCampaign("Coupon");
    }

    const handleOnTopClick = (e) => {
        setCurrentCampaign("OnTop");
    }

    const handleSeasonalClick = (e) => {
        setCurrentCampaign("Seasonal");
    }

    const handleFixAmountDiscount = (e) => {
        setDiscountFixAmount(e);
    }

    const handlePercentageDiscount = (e) => {
        setDiscountPercentage(e);
    }

    const handlePointDiscount = (e) => {
        setDiscountByPoint(e);
    }

    const handleSelectedCategory = (e) => {
        setCurrentCategory(e.target.value);
    }

    const handlePercentageCategoryDiscount = (e) => {
        setDiscountPercentageCategory(e);
    }

    const handleOnEveryPrice = (e) => {
        setOnEveryPrice(e);
    }

    const handleSpecialCampaignDiscount = (e) => {
        setDiscountSpecialCampaign(e);
    }

    const renderCouponCampaign = () => {
        if (currentCampaign === "Coupon") {
            return (
                <div className="App-campaigns-card-container">
                    <CampaignCard Label="Fixed amount" Discount={discountFixAmount} OnDiscountChanged={(e) => { handleFixAmountDiscount(e); }} Disable={discountPercentage !== "" ? true : false} />
                    <CampaignCard Label="Percentage discount" Type="Percentage" Discount={discountPercentage} OnDiscountChanged={(e) => { handlePercentageDiscount(e); }} Disable={discountFixAmount !== "" ? true : false} />
                </div>
            );
        }
    }

    const renderOnTopCampaign = () => {
        if (currentCampaign === "OnTop") {
            return (
                <div className="App-campaigns-card-container">
                    <div className="App-campaigns-category-container">
                        <CampaignCard Label="Percentage discount by item category" Type="Percentage" Discount={discountPercentageCategory} OnDiscountChanged={(e) => { handlePercentageCategoryDiscount(e); }} Disable={discountByPoint !== "" ? true : false} />
                        <div className="App-dropdown-container">
                            
                            <select className="App-dropdown" onChange={(e) => { handleSelectedCategory(e); }} >
                                <option className="App-dropdown"  value="Clothing">Clothing</option>
                                <option className="App-dropdown"  value="Accessories">Accessories</option>
                                <option className="App-dropdown"  value="Electronics">Electronics</option>
                            </select>
                        </div>

                    </div> 
                    <CampaignCard Label="Discount by points (Max 20%)" Discount={discountByPoint} OnDiscountChanged={(e) => { handlePointDiscount(e); }} Disable={discountPercentageCategory !== "" ? true : false}  />
                </div>  
            );
        }
    }

    const renderSeasonalCampaign = () => {
        if (currentCampaign === "Seasonal") {
            return (
                <div className="App-campaigns-card-container">
                    <CampaignCard Label="Special campaigns On Every" Discount={onEveryPrice} OnDiscountChanged={(e) => { handleOnEveryPrice(e); }}/>
                    <CampaignCard Label="Discounts" Discount={discountSpecialCampaign} OnDiscountChanged={(e) => { handleSpecialCampaignDiscount(e); }}/>
                </div>
            );
        }
    }

    const handleClearCart = () => {

        setTshirtQTY(0);
        setHatQTY(0);
        setHoodieQTY(0);
        setWatchQTY(0);
        setBeltQTY(0);
        setBagQTY(0);
    }

    const handleClearCampaigns = () => {
        setDiscountFixAmount("");
        setDiscountPercentage("");
        setDiscountByPoint("");
        setDiscountPercentageCategory("");
        setOnEveryPrice("");
        setDiscountSpecialCampaign("");
    }


  return (
    <div className="App">
      <header className="App-header">
              <div className="App-bar">
                  <div className="App-bar-text">
                        Storium
                  </div>
              </div>

              <div className="App-head-section">
                  <div className="App-headertag">
                      <HeaderTag Label="Your Cart" />
                  </div>
                  <div className="App-headertag" onClick={() => { handleClearCart(); }}>
                      <HeaderTag Label="Clear Cart" Color="Red" />
                  </div>
              </div>

              <div className="App-items-section">
                  <ItemCard Label="T-SHIRT" Price={TSHIRT_PRICE} Image={TShirtImage} Quantity={tshirtQTY} OnQuantityChanged={(e) => { handleQtyTShirt(e); }} />
                  <ItemCard Label="HAT" Price={HAT_PRICE} Image={HatImage} Quantity={hatQTY} OnQuantityChanged={(e) => { handleQtyHat(e); }} />
                  <ItemCard Label="HOODIE" Price={HOODIE_PRICE} Image={HoodieImage} Quantity={hoodieQTY} OnQuantityChanged={(e) => { handleQtyHoodie(e); }} />

                  <ItemCard Label="WATCH" Price={WATCH_PRICE} Image={WatchImage} Quantity={watchQTY} OnQuantityChanged={(e) => { handleQtyWatch(e); }} />
                  <ItemCard Label="BELT" Price={BELT_PRICE} Image={BeltImage} Quantity={beltQTY} OnQuantityChanged={(e) => { handleQtyBelt(e); }} />
                  <ItemCard Label="Bag" Price={BAG_PRICE} Image={BagImage} Quantity={bagQTY} OnQuantityChanged={(e) => { handleQtybag(e); }} />


              </div>

              <div className="App-head-section">
                  <div className="App-headertag">
                      <HeaderTag Label="Select Your Discount Campaigns" />
                  </div>
                  <div className="App-headertag" onClick={() => { handleClearCampaigns(); }}>
                      <HeaderTag Label="Clear Campaigns" Color="Red" />
                  </div>
              </div>

              

              <div className="App-campaigns-section">
                  <div className="App-campaigns-button-container">
                      <button className={currentCampaign === "Coupon" ? "App-campaigns-button-selected" : "App-campaigns-button"} onClick={() => { handleCouponClick(); }}>Coupon</button>
                      <button className={currentCampaign === "OnTop" ? "App-campaigns-button-selected" : "App-campaigns-button"} onClick={() => { handleOnTopClick(); }}>On Top</button>
                      <button className={currentCampaign === "Seasonal" ? "App-campaigns-button-selected" : "App-campaigns-button"} onClick={() => { handleSeasonalClick(); }}>Seasonal</button>
                  </div>

                  {renderCouponCampaign()}
                  {renderOnTopCampaign()}
                  {renderSeasonalCampaign()}

              </div>


              <div className="App-headertag">
                  <HeaderTag Label="Total Summary" />
              </div>


              <div className="App-summary-section">
                  <div className="App-summary-container">
                      <div className="App-total-beforediscount-text">
                          Total Price Before Discount : 
                      </div>
                      <div className="App-total-beforediscount-text">
                          {totalPriceBeforeDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })} Baht
                       </div>
                  </div>

                  <div className="App-summary-container2">
                    <div className="App-total-beforediscount-text">
                      Total Price After Discount : 
                    </div>
                    <div className="App-total-beforediscount-text">
                      {totalPriceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 2 })} Baht
                    </div>

                  </div>

              </div>
              
              
      </header>
    </div>
  );
}

export default App;
