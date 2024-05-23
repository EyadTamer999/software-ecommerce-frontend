import React from 'react';
import ProductList from './product/ProductList'

export default function Home() {
  const products = [
    {
      id: 1,
      name: 'Wooden Stringer Pallets',
      href: '/product/1',
      imageSrc: 'https://assets-global.website-files.com/64957750b431e096dc85ba1e/6496eeb0eaa2f396e6558dca_602e954fde741e1a8d28617f_Stringer-Pallet-1024x576.png',
      imageAlt: 'Brown Wooden Stringer Pallets.',
      price: '$35',
      color: 'Brown',
    },
    {
      id: 2,
      name: 'Plastic Pallets',
      href: '/product/2',
      imageSrc: 'https://assets-global.website-files.com/64957750b431e096dc85ba1e/6496eeb0eaa2f396e6558dca_602e954fde741e1a8d28617f_Stringer-Pallet-1024x576.png',
      imageAlt: 'Lightweight plastic pallets in different colors.',
      price: '$40',
      color: 'Blue',
    },
    {
      id: 3,
      name: 'Metal Pallets',
      href: '/product/3',
      imageSrc: 'https://assets-global.website-files.com/64957750b431e096dc85ba1e/6496eeb0eaa2f396e6558dca_602e954fde741e1a8d28617f_Stringer-Pallet-1024x576.png',
      imageAlt: 'Aluminum pallets for heavy-duty applications.',
      price: '$60',
      color: 'Silver',
    },
    {
      id: 4,
      name: 'Custom Wooden Pallets',
      href: '/product/4',
      imageSrc: 'https://assets-global.website-files.com/64957750b431e096dc85ba1e/6496eeb0eaa2f396e6558dca_602e954fde741e1a8d28617f_Stringer-Pallet-1024x576.png',
      imageAlt: 'Custom wooden pallets for specialized uses.',
      price: '$50',
      color: 'Natural',
    },
  ];

  return (
    <div className="bg-white flex flex-col">
      <ProductList title="Buy Now!" products={products} />
      <ProductList title="On Sale 💯" products={products} />
      <ProductList title="Trending 🔥" products={products} />
    </div>
  );
}
