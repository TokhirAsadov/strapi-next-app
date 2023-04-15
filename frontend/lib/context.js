import React,{createContext,useContext,useState} from "react";
import ProductDetails from "../pages/product/[slug]";

const ShopContext = createContext();

export const StateContext = ({children}) => {
  // add our data for the state
  const [showCard,setShowCard] = useState(false);
  const [cartItems,setCartItems] = useState([]);
  const [qty,setQty] = useState(1);
  const [totalQuantities,setTotalQuantities] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);

  // increase product quantity
  const increaseQty = () => {
    setQty(prevState => prevState + 1)
  }

  // decrease product quantity
  const decreaseQty = () => {
    setQty(prevState => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    })
  }

  //add product to cart
  const onAdd = (product,quantity) => {

    //total price
    setTotalPrice(prevState => prevState + product?.price * quantity);

    //increase total quantity
    setTotalQuantities(prevState => prevState + quantity)
    //check if the product is already in the cart
    const exist = cartItems.find(item => item.slug === product.slug);
    if (exist){
      setCartItems(
        cartItems.map((item) =>
          item.slug===product.slug
            ? {...exist,quantity: exist.quantity+quantity}
            : item
        )
      );
    }else {
      setCartItems([...cartItems,{...product,quantity}]);
    }

  }

  // remove product
  const onRemove = (product) => {
    //total price
    setTotalPrice(prevState => prevState - product?.price);

    //decrease total quantity
    setTotalQuantities(prevState => prevState - 1)
    //check if the product is already in the cart
    const exist = cartItems.find(item => item.slug === product.slug);
    if (exist.quantity === 1){
      setCartItems(cartItems.filter(item => item.slug !== product.slug))
    }else {
      setCartItems(
        cartItems.map((item)=>
          item.slug===product.slug
            ? {...exist,quantity: exist.quantity - 1}
            : item
        )
      );
    }
  }

  return (
    <ShopContext.Provider  value={{
      qty,
      increaseQty,
      decreaseQty,
      showCard,
      setShowCard,
      cartItems,
      onAdd,
      onRemove,
      totalQuantities,
      totalPrice
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export const useStateContext = () => useContext(ShopContext);