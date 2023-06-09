import styled from "styled-components";
import {ProductStyle} from "../styles/ProductStyle";
import Link from 'next/link'

export default function Product({product}){
  //extract the info from props
  const {title,price,image,slug} = product?.attributes;
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt=""/>
        </div>
      </Link>
      <h2>{title}</h2>
      <PriceStyle>{price}</PriceStyle>
    </ProductStyle>
  )
}

const PriceStyle = styled.h3`
  color: red;
  font-size: 2rem;
`