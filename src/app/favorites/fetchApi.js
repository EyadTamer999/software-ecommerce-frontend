const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";
const token = localStorage.getItem('token');

export const getFavorites = async () => {
    try {
        const response = await fetch(BASE_URL + "/getUserFavoriteProducts",
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

export const removeFavorite = async (id) => {
    try {
        console.log(id);
        const response = await fetch(BASE_URL + "/removeProductFromMyFavorite/",
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