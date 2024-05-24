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