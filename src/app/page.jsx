"use client";
import React, { useEffect, useState } from 'react';
import ProductList from './product/ProductList'
import { getAllProducts } from './product/fetchApi';

export default function Home() {

  useEffect(() => {
    getAllProducts().then((response) => {
      console.log(response);
      setProducts(response.data);
    })
  }, [])

  const [products, setProducts] = useState([])

  return (
    <div className="bg-white flex flex-col">
      <ProductList title="Buy Now!" products={products} />
      <div id='OnSale'>
        <ProductList title="On Sale 💯" products={products} />
      </div>
      <div id='trending'>
        <ProductList title="Trending 🔥" products={products} />
      </div>
    </div>
  );
}
