"use client";
import React, { useEffect, useState } from 'react';
import { getAllProducts } from './fetchApi';
import ProductList from './ProductList';


const AllProducts = () => {

    useEffect(() => {
        getAllProducts().then((response) => {
            console.log(response);
            setProducts(response.data);
        })
    }, [])

    const [products, setProducts] = useState([])

    return (
        <div>
            <ProductList title="All Products" products={products} />
        </div>
    )
}

export default AllProducts