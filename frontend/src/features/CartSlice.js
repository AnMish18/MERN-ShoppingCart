import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
const initialState={
    cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,             //gives the total number of products in cart
    cartTotalAmount:0
};

const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{          //generate action creater and handle state
        addToCart(state,action){
           const itemIndex= state.cartItems.findIndex((item)=>item._id===action.payload._id)   //check whether item to add is already there
           if (itemIndex>=0){
               state.cartItems[itemIndex].cartQuantity+=1;
               toast.info("increased product quantity",{
                   position:"bottom-left"
               });
           }else{
            const tempProduct={...action.payload , cartQuantity:1};    //cartquantity to incremeent the count when product already in cart
            state.cartItems.push(tempProduct);   //comes from action.payload
            toast.success(`added a new product to cart= ${action.payload.name}`,{
                position:"bottom-left"
            });
           }
           localStorage.setItem("cartItems", JSON.stringify(state.cartItems));   //add cart items to local storage
        }
        ,
        removeFromCart(state,action){
            const nextCartItems=state.cartItems.filter(
                cartItem=> cartItem._id!==action.payload._id   //return those items that are not included in action payload
            )
            state.cartItems=nextCartItems;
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems))  //refresh whatever in localstorage to new array items
            toast.error(`removed product from cart= ${action.payload.name}`,{
                position:"bottom-left"
            });
        },
        decreaseCart(state,action){              //increase decrease quantity using button
            const itemIndex= state.cartItems.findIndex(
                cartItem=> cartItem._id=== action.payload._id
            )
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity-=1

                toast.info(`decreased  the quantity of = ${action.payload.name}`,{
                    position:"bottom-left"
                });
            }else if(state.cartItems[itemIndex].cartQuantity===1){
                const nextCartItems=state.cartItems.filter(
                    cartItem=> cartItem._id!==action.payload._id   
                )
                state.cartItems=nextCartItems; 
                toast.error(`removed product from cart= ${action.payload.name}`,{
                    position:"bottom-left"
                });
            }
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems)) 
        },
        clearCart(state,action){                //checkingout cart empty button
            state.cartItems=[]
            toast.error(`cart is now empty`,{
                position:"bottom-right"
            });
            localStorage.setItem("cartItem", JSON.stringify(state.cartItems)) 
        },
        // getTotals(state,action){               //subtotal
        //     let {total,quantity}=state.cartItems.reduce((cartTotal, cartItem)=>{
        //         const {price , cartQuantity}=cartItem;
        //         const itemTotal= price * cartQuantity;
        //         cartTotal.total+=itemTotal;
        //         cartTotal.quantity+=cartQuantity;
        //         return cartTotal                 //contain the object with total cart price and quanitty
        //     },{
        //     total:0,
        //     quantity:0});
        //     state.cartTotalAmount=quantity;
        //     state.cartTotalAmount=total;
        // }
    }
})
export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals}=cartSlice.actions;

export default cartSlice.reducer;