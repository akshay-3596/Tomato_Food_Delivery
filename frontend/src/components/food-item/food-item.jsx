import React, { useContext } from 'react'
import './food-item.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'

const FoodItem = ({id,name,description,price,image}) => {
  const {cartItems={},addToCart,removeFromCart,url }=useContext(StoreContext);
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`${url}/images/${image}`} alt="" />
        {
          !cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}></img>
          :<div className='food-item-counter'> 
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}></img>    
                <p>{cartItems[id]}</p>    
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green}></img> 
           </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts}></img>
        </div>
        <p className='food-item-description'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
