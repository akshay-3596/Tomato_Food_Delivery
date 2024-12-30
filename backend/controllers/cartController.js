import userModel from "../models/userModel.js"

//add items to user cart
const addTocart = async(req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        //console.log("User ID from request:", req.body.userId);

        //if (!userData) {
        //    return res.status(404).json({ success: false, message: "User not found" });
        //}
        let cartData = await userData.cartData ||{};
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] +=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true , Message:"Added To Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false , message:"Error"})
        
    }
}

//remove items from cart
const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//fetch user cart data
const getCart = async (req, res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {addTocart,removeFromCart,getCart}


/*
import userModel from "../models/userModel.js";

// Add items to user cart
const addTocart = async (req, res) => {
    try {
        // Log the request body for debugging
        console.log("Request Body:", req.body);

        // Destructure userId and itemId from request body
        const { userId, itemId } = req.body;

        // Check if userId and itemId are provided
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
        }

        // Find user by ID
        let userData = await userModel.findOne({ _id: userId });
        console.log("User ID from request:", userId); // Logging the User ID

        // If user not found, return a 404 error
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        // Update cartData
        if (!cartData[itemId]) {
            cartData[itemId] = 1; // Add item if it's not in the cart
        } else {
            cartData[itemId] += 1; // Increment the item count if it is already in the cart
        }

        // Update the user document with the new cartData
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        // Respond with success message
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log("Error in addTocart:", error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Error adding to cart" }); // Return a 500 error
    }
};

// Other functions...
const removeFromCart = async (req, res) => {
    // Logic for removing items from the cart
};

const getCart = async (req, res) => {
    // Logic for fetching user cart data
};

export { addTocart, removeFromCart, getCart };
*/
