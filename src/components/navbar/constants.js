import plastsicPallet from '../../../public/plastic-pallets.jpg';
import woodenPallet from '../../../public/wooden-pallets.jpg';
import rubberPallet from '../../../public/rubber-pallets.jpg';
export const navigation = {
    categories: [
        {
            id: "Pallet Categories",
            name: "Pallet Categories",
            featured: [
                {
                    name: "Wooden Pallets",
                    href: "/products/category?category=Wood",
                    imageSrc: woodenPallet,
                    imageAlt: "Standard wooden pallets stacked in a warehouse.",
                },
                {
                    name: "Rubber Pallets",
                    href: "/products/category?category=Rubber",
                    imageSrc: rubberPallet,
                    imageAlt: "Rubber pallets for heavy-duty applications.",
                },
                {
                    name: "Plastic Pallets",
                    href: "/products/category?category=Plastic",
                    imageSrc: plastsicPallet,
                    imageAlt: "Plastic pallets for heavy-duty applications.",
                },
            ],
        },
    ],
    pages: [
        { name: "All Products", href: "/products" },
        { name: "On Sale 💯", href: "#OnSale" },
        { name: "Trending 🔥", href: "#trending" },
    ],
};

export const cartProducts = [
    {
        id: 1,
        name: 'Standard Wooden Pallet',
        href: '#',
        type: 'Wooden',
        price: 'EGP 15.00',
        quantity: 5,
        imageSrc: 'https://example.com/images/wooden-pallet-01.jpg',
        imageAlt: 'Standard wooden pallet.',
    },
    {
        id: 2,
        name: 'Heavy-Duty Plastic Pallet',
        href: '#',
        type: 'Plastic',
        price: 'EGP 25.00',
        quantity: 3,
        imageSrc: 'https://example.com/images/plastic-pallet-01.jpg',
        imageAlt: 'Heavy-duty plastic pallet.',
    },
    // More cartProducts...
];

export const wishlistProducts = [
    {
        id: 1,
        name: 'Standard Wooden Pallet',
        href: '#',
        type: 'Wooden',
        price: 'EGP 15.00',
        quantity: 5,
        imageSrc: 'https://example.com/images/wooden-pallet-01.jpg',
        imageAlt: 'Standard wooden pallet.',
    },
    {
        id: 2,
        name: 'Lightweight Plastic Pallet',
        href: '#',
        type: 'Plastic',
        price: 'EGP 20.00',
        quantity: 10,
        imageSrc: 'https://example.com/images/plastic-pallet-02.jpg',
        imageAlt: 'Lightweight plastic pallet.',
    },
    // More wishlistProducts...
];
