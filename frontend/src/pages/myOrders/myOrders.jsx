// import React, {useContext,useEffect,useState} from 'react'
// import './myOrders.css'
// import {StoreContext} from '../../context/storeContext';
// import axios from 'axios';
// import {assets} from '../../assets/assets';

// const MyOrders = () => {

//     const {url , token}=useContext(StoreContext);
//     const [data,setData]=useState([]);

//     const fetchOrders = async ()=>{
//         const response =await axios.post(url+"/api/order/userorders",{},{headers:{token}})
//         setData(response.data.data)

//     }

//     useEffect(()=>{
//         if(token){
//             fetchOrders();
//         }
//     },[token])

//   return (
//        <div className="my-orders">
//         <h2>My Orders</h2>
//         <div className="container">
//             {data.map((order,index)=>{
//                 console.log(order)
//                 return(
//                     <div key={index} className="my-orders-order">
//                         <img src={assets.parcel_icon} alt="" />
//                         <p>{order.items.map((item,index)=>{
//                             if(index === order.items.length-1){
//                                 return item.name+" X "+item.quantity
//                             }
//                             else
//                             {
//                                 return item.name+" X "+item.quantity+ " ,"
//                             }
//                         })}</p>
//                         <p>${order.amount}.00</p>
//                         <p>Items:{order.items.length}</p>
//                         <h4><span>&#x25cf; </span><b>{order.status}</b></h4>
//                         <button onClick={fetchOrders}>Track Order</button>
//                     </div>
//                 )
//             })}
//         </div>
//        </div>
//   )
// }

// export default MyOrders








import React, { useContext, useEffect, useState } from 'react';
import './myOrders.css';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // 
    const fetchOrders = async ()=>{
                const response =await axios.post(url+"/api/order/userorders",{},{headers:{token}})
                 setData(response.data.data)
            }

    useEffect(() => {
        if(token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order) => (
                    <div key={order.id} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.items.map((item, index) =>
                                `${item.name} X ${item.quantity}${index < order.items.length - 1 ? ", " : ""}`
                            )}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <h4>
                            <span>&#x25cf; </span><b>{order.status}</b>
                        </h4>
                        <button onClick={() => console.log("Tracking order ID:", order.id)}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
