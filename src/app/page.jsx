"use client";
import React, { useEffect, useState } from 'react';
import ProductList from './products/ProductList'
import { getAllProducts, getPopularProducts, getTopOffers } from './products/fetchApi';

export default function Home() {

  useEffect(() => {
    getAllProducts().then((response) => {
      console.log(response);
      setProducts(response.data.slice(0, 8));
    })

    getTopOffers().then((response) => {
      console.log("offers:", response);
      setOffers(response.data.slice(0, 4));
    })

    getPopularProducts().then((response) => {
      console.log("popular:", response);
      setPopularProducts(response.data.slice(0, 4));
    })
  }, [])

  const [products, setProducts] = useState([])

  const [popularProducts, setPopularProducts] = useState([])

  const [offers, setOffers] = useState([])

  return (
    <div className="bg-white flex flex-col">
      <ProductList title="Buy Now!" products={products} />
      <div id='OnSale'>
        <ProductList title="On Sale 💯" products={offers} isSaleList={true} />
      </div>
      <div id='trending'>
        <ProductList title="Trending 🔥" products={popularProducts} />
      </div>
    </div>
  );
}
