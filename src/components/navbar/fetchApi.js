const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";
const token = localStorage.getItem('token');

export const getWishlist = async () => {
    try {
        const response = await fetch(BASE_URL + "/getUserWishProducts",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}


export const removeWishlist = async (id) => {
    try {
        const response = await fetch(BASE_URL + "/removeProductFromMyWish/",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: id })
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}


export const getCart = async () => {
    try {
        const response = await fetch(BASE_URL + "/getCart",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const removeCart = async (id) => {
    try {
        const response = await fetch(BASE_URL + "/deleteFromCart/" + id,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },

            })
        console.log(response);
        return response.json();
    }
    catch (e) {
        console.log(e);
    }
}