export const HandleSignup = async (data) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL
    data = transformDataForBackend(data)
    console.log("data sent to 1st api =>", data)
    try {
        const response = await fetch(`${apiUrl}/auth-gateway/verify`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

const transformDataForBackend = (data) => {
    const transformedData = {
      FirstName: data.firstName,
      LastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phoneNumber,
      company: data.companyName,
      address: [
        {
          label: data.address.label,
          appartment: data.address.apartment,
          floor: data.address.floor,
          street: data.address.street,
          building: data.address.building,
          postalcode: data.address.postalCode,
          city: data.address.city,
          country: data.address.country,
          state: data.address.state,
          extra_description: data.address.extra_description
        }
      ]
    };
    return transformedData;
  };

  const transformEmailForResend = (email) => {
    return {
      email: email
    };
  };
  


  export const ResendEmailVerification = async (email) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
    console.log("email sent to 2nd api ->", email);
    try {
        const response = await fetch(`${apiUrl}/auth-gateway/resend-email?email=${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};
