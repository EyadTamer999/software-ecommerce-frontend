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
      imageSrc: 'https://example.com/images/plastic-pallets-01.jpg',
      imageAlt: 'Lightweight plastic pallets in different colors.',
      price: '$40',
      color: 'Blue',
    },
    {
      id: 3,
      name: 'Metal Pallets',
      href: '/product/3',
      imageSrc: 'https://example.com/images/metal-pallets-01.jpg',
      imageAlt: 'Aluminum pallets for heavy-duty applications.',
      price: '$60',
      color: 'Silver',
    },
    {
      id: 4,
      name: 'Custom Wooden Pallets',
      href: '/product/4',
      imageSrc: 'https://example.com/images/custom-wooden-pallets.jpg',
      imageAlt: 'Custom wooden pallets for specialized uses.',
      price: '$50',
      color: 'Natural',
    },
    {
      id: 5,
      name: 'Nestable Plastic Pallets',
      href: '/product/5',
      imageSrc: 'https://example.com/images/nestable-plastic-pallets.jpg',
      imageAlt: 'Nestable plastic pallets.',
      price: '$45',
      color: 'Black',
    },
    {
      id: 6,
      name: 'Rackable Plastic Pallets',
      href: '/product/6',
      imageSrc: 'https://example.com/images/rackable-plastic-pallets.jpg',
      imageAlt: 'Rackable plastic pallets.',
      price: '$50',
      color: 'Red',
    },
    {
      id: 7,
      name: 'Export Wooden Pallets',
      href: '/product/7',
      imageSrc: 'https://example.com/images/export-wooden-pallets.jpg',
      imageAlt: 'Export wooden pallets for international shipping.',
      price: '$30',
      color: 'Brown',
    },
    {
      id: 8,
      name: 'Steel Pallets',
      href: '/product/8',
      imageSrc: 'https://example.com/images/steel-pallets.jpg',
      imageAlt: 'Steel pallets for industrial use.',
      price: '$70',
      color: 'Gray',
    },
  ];

  return (
    <div className="bg-white flex flex-col">
      <ProductList title="Buy Now!" products={products} />
      <ProductList title="New Pallets" products={products} />
      <ProductList title="Trending 🔥" products={products} />
    </div>
  );
}
