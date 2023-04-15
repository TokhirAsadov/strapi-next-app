import { useStateContext } from "../lib/context";
import {Card, CardInfo, Cards, CartStyle, CartWrapper, Checkout, EmptyStyle,} from "../styles/CartStyles";
import {FaShoppingCart} from "react-icons/fa";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {Quantity} from "../styles/ProductDetailsStyle";

//animation variants
const card = {
  hidden: { opacity: 0, scale: 0.8},
  show: { opacity: 1, scale: 1},
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1
    }
  }
}

export default function Cart(){
  const { cartItems,setShowCard,onAdd,onRemove,totalPrice } = useStateContext();

  return(
    <CartWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowCard(false)}>
      <CartStyle
        initial={{ x: '50%' }}
        animate={{ x: '0%' }}
        exit={{ x: '50%' }}
        transition={{ type: 'tween' }}
        onClick={(e) => e.stopPropagation()}> {/*** <--- best praktiks ***/}
        {cartItems.length < 1 && (
        <EmptyStyle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h1>You have more shopping to do 😉</h1>
          <FaShoppingCart />
        </EmptyStyle>
        )}
        <Cards
          variants={cards}
          initial='hidden'
          animate='show'
          layout
        >
          {cartItems.length >= 1 && (
            cartItems.map((item)=>{
              return(
                <Card
                  layout
                  variants={card}
                  key={item.slug}>
                  <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title}/>
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price}$</h3>
                    <Quantity>
                      <span>Quantity</span>
                      <button>
                        <AiFillMinusCircle onClick={() => onRemove(item)} />
                      </button>
                      <p>{item.quantity}</p>
                      <button>
                        <AiFillPlusCircle onClick={() => onAdd(item,1)} />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              )
            })
          )}
        </Cards>
        {cartItems?.length >=1 && (
          <Checkout layout>
            <h3>Subtotal: {totalPrice}$</h3>
            <button>Purchase</button>
          </Checkout>
        )}
      </CartStyle >
    </CartWrapper>
  )
}