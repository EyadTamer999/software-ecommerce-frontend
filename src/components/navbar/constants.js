export const navigation = {
    categories: [
        {
            id: "wooden-pallets",
            name: "Wooden Pallets",
            featured: [
                {
                    name: "Standard Wooden Pallets",
                    href: "#",
                    imageSrc: "https://example.com/images/wooden-pallets-01.jpg",
                    imageAlt: "Standard wooden pallets stacked in a warehouse.",
                },
                {
                    name: "Custom Wooden Pallets",
                    href: "#",
                    imageSrc: "https://example.com/images/wooden-pallets-02.jpg",
                    imageAlt: "Custom wooden pallets for specialized uses.",
                },
            ],
            sections: [
                {
                    id: "types",
                    name: "Types",
                    items: [
                        { name: "Standard", href: "#" },
                        { name: "Custom", href: "#" },
                        { name: "Heat-Treated", href: "#" },
                        { name: "Euro Pallets", href: "#" },
                        { name: "Block Pallets", href: "#" },
                    ],
                },
                {
                    id: "sizes",
                    name: "Sizes",
                    items: [
                        { name: "48x40", href: "#" },
                        { name: "42x42", href: "#" },
                        { name: "48x48", href: "#" },
                        { name: "Custom Sizes", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "EcoPallet", href: "#" },
                        { name: "GreenPallet", href: "#" },
                        { name: "StrongPallet", href: "#" },
                        { name: "DurablePallet", href: "#" },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: "All products", href: "/products" },
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
