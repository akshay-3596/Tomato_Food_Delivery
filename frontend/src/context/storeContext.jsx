//storeContext.jsx

import { createContext, useEffect} from "react";
// import { food_list } from "../assets/assets";
import { useState } from "react";
//import { redirectDocument } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const url = "http://localhost:4000";
    const[token , setToken] = useState(""); 
    const [ food_list , setfoodList]= useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            try {
                await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            } catch (error) {
                console.error("Error adding to cart:",error)
            }
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }

        }
        return totalAmount;
    }


    const fetchFoodList = async()=>{
        const response= await axios.get(url+"/api/food/list");
        setfoodList(response.data.data)
    }

    // const loadCartData = async (token)=>{
    //     const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    //     setCartItems(response.data.cartData);
    // }

    // useEffect(()=>{
      
    //     async function loadData() {
    //         await fetchFoodList();
    //         if(localStorage.getItem("token")){
    //             setToken(localStorage.getItem("token"));
    //             await loadCartData(localStorage.getItem("token"));
    //         }
    //     }
    //     loadData();

    // },[])

    // const loadCartData = async (token) => {
    //     try {
    //         const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
    //         setCartItems(response.data.cartData);
    //     } catch (error) {
    //         console.error("Error loading cart data:", error);
    //         // You can also add more error handling here, like showing a message to the user
    //     }
    // };
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
        //     const token = localStorage.getItem("token");
        //     if (token) {
        //         setToken(token);
        //         await loadCartData(token);
        //     }
         }
        
        loadData();
    }, []);
    


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token ,
        setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;