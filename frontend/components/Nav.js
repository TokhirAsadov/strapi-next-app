import Link from 'next/link'
import {FiShoppingBag} from "react-icons/fi";
import {NavItems, NavStyles} from "../styles/NavStyles";
import Cart from "./Cart";
import {useStateContext} from "../lib/context";

const {AnimatePresence,motion} = require('framer-motion')

export default function Nav(){
  const {showCard,setShowCard,totalQuantities} = useStateContext();
 return (
   <NavStyles>
     <Link href={'/'}>Styled.</Link>
     <NavItems>
       <div onClick={() => setShowCard(true)}>
         {totalQuantities > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>{totalQuantities}</motion.span>}
         <FiShoppingBag />
         <h3>Cart</h3>
       </div>
     </NavItems>
     <AnimatePresence>
      {showCard && <Cart />}
     </AnimatePresence>
   </NavStyles>
 )
}