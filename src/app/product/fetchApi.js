const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";
const token = localStorage.getItem('token');

export const getProductById = async (id) => {
    try {
        const response = await fetch(BASE_URL + "/getProduct/" + id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const addReview = async (review) => {
    console.log(review);
    try {
        const response = await fetch(BASE_URL + "/addReview",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(review)
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const addToCart = async (cartItem) => {
    try {
        console.log(cartItem);
        const response = await fetch(BASE_URL + "/addToCart",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cartItem)
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}


export const addToWishlist = async (wishlistItem) => {
    try {
        console.log(wishlistItem);
        const response = await fetch(BASE_URL + "/postUserWishProduct",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(wishlistItem)
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}


export const deleteProduct = async (id) => {
    console.log(id);
    const response = await fetch(BASE_URL + "/deleteProduct/" + id,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
        })
    return response.json();
}