"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Notification from "../../components/notification";

const BASE_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL + "/Product";
const token = localStorage.getItem("token");

const LoadingComponent = () => <div>Loading...</div>;

const ErrorComponent = ({ message }) => <div>Error: {message}</div>;

const Order = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [promoSuccess, setPromoSuccess] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressFields, setAddressFields] = useState({
    label: "",
    appartment: "",
    floor: "",
    street: "",
    building: "",
    postalcode: "",
    city: "",
    country: "",
    state: "",
    extra_description: "",
  });
  const [deliveryFees, setDeliveryFees] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getCart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const cartData = await response.json();

        if (!Array.isArray(cartData.cart)) {
          throw new Error("Cart data is not an array");
        }

        const cartWithImages = await Promise.all(
          cartData.cart.map(async (item) => {
            const product = await getProductById(item.id);
            const imageSrc =
              product.data.images && product.data.images[0]
                ? product.data.images[0]
                : "";
            return {
              ...item,
              imageSrc,
              imageAlt: product.data.name,
              category: product.data.category,
            };
          })
        );

        setCart(cartWithImages);
      } catch (e) {
        console.error("Error fetching cart:", e);
        setNotification({ message: "Error fetching cart.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/Users/view-address`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();

        if (data.success) {
          setAddresses(data.data);
        } else {
          throw new Error("Failed to fetch addresses");
        }
      } catch (e) {
        console.error("Error fetching addresses:", e);
        setNotification({
          message: "Error fetching addresses.",
          type: "error",
        });
      }
    };

    const fetchDeliveryFees = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/order-gateway/Get-all-Delivery-Fees`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch delivery fees");
        }

        const data = await response.json();

        if (data.message === "Delivery fees retrieved successfully") {
          setDeliveryFees(data.deliveryFees);
        } else {
          throw new Error("Failed to fetch delivery fees");
        }
      } catch (e) {
        console.error("Error fetching delivery fees:", e);
        setNotification({
          message: "Error fetching delivery fees.",
          type: "error",
        });
      }
    };

    fetchCart();
    fetchAddresses();
    fetchDeliveryFees();
  }, []);

  const getProductById = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/getProduct/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const product = await response.json();
      return product;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to fetch product");
    }
  };

  const applyPromoCode = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/order-gateway/Get-promo-code`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ promocode: promoCode }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply promo code");
      }

      const data = await response.json();

      if (data.success) {
        setDiscountPercentage(data.discount);
        setPromoSuccess(true);
        setNotification({
          message: "Promo code applied successfully!",
          type: "success",
        });
      } else {
        setPromoSuccess(false);
        setNotification({
          message: "Failed to apply promo code.",
          type: "error",
        });
      }
    } catch (e) {
      console.error("Error applying promo code:", e);
      setPromoSuccess(false);
      setNotification({ message: "Error applying promo code.", type: "error" });
    }
  };

  const handleAddressChange = (e) => {
    const selectedLabel = e.target.value;
    const address = addresses.find((addr) => addr.label === selectedLabel);
    if (address) {
      setAddressFields({
        label: address.label,
        appartment: address.appartment,
        floor: address.floor,
        street: address.street,
        building: address.building,
        postalcode: address.postalcode,
        city: address.city,
        country: address.country,
        state: address.state,
        extra_description: address.extra_description,
      });

      const matchingFee = deliveryFees.find(
        (fee) =>
          fee.city.trim().toLowerCase() === address.state.trim().toLowerCase()
      );
      if (matchingFee) {
        setDeliveryFee(matchingFee.deliveryFees);
      } else {
        setDeliveryFee(0); // Set to 0 if no matching fee is found
      }
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setAddressFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleOrderRegister = async (orderData) => {
    try {
      const response = await fetch(
        `http://localhost:3001/order-gateway/update-product-quantity`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      if (data.message === "Order created successfully") {
        router.push(data.link);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setNotification({ message: "Error creating order.", type: "error" });
    }
  };

  const handleOrderSubmit = async () => {
    // Validate if all address fields are filled
    const isAddressComplete = Object.values(addressFields).every(
      (value) => value !== ""
    );

    if (!isAddressComplete) {
      setNotification({
        message: "Please fill in all address fields.",
        type: "error",
      });
      return;
    }

    try {
      const orderItems = cart.map((product) => ({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        rent: false,
        rent_duration: -1,
        color: product.color,
        size: product.size,
        material: product.material,
        price: product.price,
      }));

      const orderData = {
        shippingAddress: addressFields,
        paymentMethod: "card",
        orderItems: orderItems,
        totalPrice: totalPrice,
      };

      const response = await fetch(
        `http://localhost:3001/order-gateway/create-order`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      if (data.message === "Order created successfully") {
        const dataRegister = data.order;
        console.log('register data', dataRegister)
        await handleOrderRegister(dataRegister);
        setNotification({
          message: "Order created successfully!",
          type: "success",
        });
        router.push(data.link);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (e) {
      console.error("Error creating order:", e);
      setNotification({ message: "Error creating order.", type: "error" });
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }

  const totalProductPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const discountAmount = (totalProductPrice * discountPercentage) / 100;
  const totalPrice = totalProductPrice - discountAmount + deliveryFee;

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-8">
          <div className="mt-8 w-full">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {Array.isArray(cart) &&
                  cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.name}</a>
                            </h3>
                            <p className="ml-4">
                              ${product.price * product.quantity}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Color: {product.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            Size: {product.size}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="card shadow-2xl px-10 py-1 sm:px-3 m-10 justify-center">
            <div className="justify-between mt-2 flex items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="input input-sm input-bordered mr-2 py-2 px-3"
              />
              <button
                onClick={applyPromoCode}
                className="btn btn-sm bg-gray-500 text-white px-3 py-2 rounded-md border-0"
              >
                Apply Promo Code
              </button>
            </div>
            {promoSuccess && (
              <div className="text-green-500 mt-2">
                Promo code applied successfully! You saved {discountPercentage}
                %.
              </div>
            )}
            <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3 mt-2">
              <p>Tax:</p>
              <p>$0.00</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
              <p>Products Price:</p>
              <p>${totalProductPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
              <p>Discount:</p>
              <p>${discountAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
              <p>Delivery Fee:</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 px-2 py-1 sm:px-3">
              <p>Total:</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={handleOrderSubmit}
              className="btn btn-block px-3 py-2 rounded-md mt-4 border-0"
            >
              Go To Payment Method
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 p-2">
          <div
            className="hero bg-base-400"
            style={{ height: "calc(100% - 1rem)" }}
          >
            <div className="hero-content">
              <div className="card shadow-2xl bg-base-100">
                <div className="card-body grid grid-cols-2 gap-4">
                  <div className="form-control col-span-2">
                    <label className="label">
                      <span className="label-text">Label</span>
                    </label>
                    <select
                      className="input input-bordered py-1 px-2"
                      value={addressFields.label}
                      onChange={handleAddressChange}
                    >
                      <option value="">Select Label</option>
                      {addresses.map((address) => (
                        <option key={address._id} value={address.label}>
                          {address.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Apartment</span>
                    </label>
                    <input
                      type="text"
                      name="appartment"
                      value={addressFields.appartment}
                      onChange={handleFieldChange}
                      placeholder="Apartment"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Floor</span>
                    </label>
                    <input
                      type="text"
                      name="floor"
                      value={addressFields.floor}
                      onChange={handleFieldChange}
                      placeholder="Floor"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Street</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={addressFields.street}
                      onChange={handleFieldChange}
                      placeholder="Street"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Building</span>
                    </label>
                    <input
                      type="text"
                      name="building"
                      value={addressFields.building}
                      onChange={handleFieldChange}
                      placeholder="Building"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Postal Code</span>
                    </label>
                    <input
                      type="text"
                      name="postalcode"
                      value={addressFields.postalcode}
                      onChange={handleFieldChange}
                      placeholder="Postal Code"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">City</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressFields.city}
                      onChange={handleFieldChange}
                      placeholder="City"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Country</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={addressFields.country}
                      onChange={handleFieldChange}
                      placeholder="Country"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">State</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={addressFields.state}
                      onChange={handleFieldChange}
                      placeholder="State"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                  <div className="form-control col-span-2">
                    <label className="label">
                      <span className="label-text">Extra Description</span>
                    </label>
                    <input
                      type="text"
                      name="extra_description"
                      value={addressFields.extra_description}
                      onChange={handleFieldChange}
                      placeholder="Extra Description"
                      className="input input-bordered py-1 px-2"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
