import React, { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay';
 import DescriptionBox from '../../Components/DescriptionBox/DescriptionBox';
 import RelatedProducts from '../../Components/RelatedProducts/RelatedProducts';
const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  debugger
  const product = all_product.find((e) => e.id === Number(productId)); 
  console.log('all_product:', all_product);
  console.log('productId:', productId);
  return (
    <div>
      <Breadcrumbs product={product} />
      <ProductDisplay product={product} />
       <DescriptionBox />
      <RelatedProducts /> 
    </div>
  );
};

export default Product;