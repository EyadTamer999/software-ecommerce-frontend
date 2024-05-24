"use client";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import ProductList from "../ProductList";
import { getByCategory } from "../fetchApi"


export default function category() {

    const [products, setProducts] = useState([]);

    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        console.log(category);
        fetchCategory();
    }, [category])

    const fetchCategory = async () => {
        const response = await getByCategory(category);
        setProducts(response.data);
    };


    return (

        <ProductList title={category} products={products} />

    )
}

