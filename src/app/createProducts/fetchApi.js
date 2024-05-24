const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product"

export const createProduct = async (product) => {

    let data = {
        name: product.name,
        category: product.category,
        discount: product.discount,
        description: product.description,
        images: product.images,
        buy_price: product.buyPrice,
        rent_price: product.rentPrice,
        availability: product.availability,
        stock: product.stock,
        specifications: product.specifications,
    }

    const response = await fetch(BASE_URL + "/createProduct",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }
        );
    return response;
}