"use client";
import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { RadioGroup } from '@headlessui/react';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import { getProductById, addToCart, addToWishlist, deleteProduct } from './fetchApi';
import { useSearchParams } from "next/navigation";
import ProductList from '../products/ProductList';
import RentModal from './RentModal';
import { getByCategory } from '../products/fetchApi';
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Product() {
  const [product, setProduct] = useState({
    name: '',
    images: [],
    color: '',
    size: '',
    relatedProducts: [],
    description: '',
    highlights: [],
    details: '',
    specifications: [],
    buy_price: '',
    rent_price: '',
    rent_duration: '',
    rating: 0,
    reviews: [],
    totalCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("Small");
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const fetchRelatedProducts = async () => {
    const response = await getByCategory(product.category);
    setProduct({
      ...product,
      relatedProducts: response.data,
    });
  };

  async function fetchProduct() {
    const product = await getProductById(productId);
    console.log(product.data);
    if (product.data) {
      let buy_price = parseFloat(product.data.buy_price);
      let rent_price = parseFloat(product.data.rent_price);

      // Check if selected color is not red, add 10 EGP to both prices
      if (selectedColor !== "red") {
        buy_price += 10;
        rent_price += 10;
      }

      // Check if selected size is not Small, add 10 EGP to both prices
      if (selectedSize === "Medium") {
        buy_price += 10;
        rent_price += 10;
      }

      if (selectedSize === "Large") {
        buy_price += 20;
        rent_price += 20;
      }

      product.data.buy_price = buy_price;
      product.data.rent_price = rent_price;
    }
    setProduct(product.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [productId, selectedColor, selectedSize]);


  useEffect(() => {
    if (product.category) {
      fetchRelatedProducts();
    }
  }, [product.category]);


  const handleReviewSubmit = (newReview) => {
    console.log(newReview);
    setProduct({
      ...product,
      reviews: [...product.reviews, newReview.review],
    });
  };

  const handleRentSubmit = (duration) => {
    console.log(`Rent duration: ${duration} days`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cartItem = {
      id: productId,
      name: product.name,
      rent: false,
      rent_duration: 0,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      material: product.material,
      price: product.buy_price,
    };

    console.log("cartitem", cartItem);

    // save item to cart localstorage
    let cart = localStorage.getItem('cart');
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }

    // if item already exists in cart, increase quantity
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (localStorage.getItem('token') !== null) {
      // add to cart API
      addToCart(cartItem);
    }

  };


  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <a href="/" className="mr-2 text-sm font-medium text-gray-900">Home</a>
              <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li>
              <a href="/product" className="mr-2 text-sm font-medium text-gray-900">Products</a>
              <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" className="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {product.images.length > 0 ? (
            <>
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.images[0]}
                  alt="Product Image"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              {product.images.slice(1, 1).map((image, index) => (
                <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt="Product Image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product.images[3]}
                  alt="Product Image"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </>
          ) : (
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block bg-gray-200">
              <img
                src="https://via.placeholder.com/400"
                alt="Placeholder"
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            <h3 className="text-sm font-medium text-gray-900">{product.category}</h3>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">EGP {product.buy_price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {product.reviews.length} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">

                    {/* 3 Colors: Red, Green, Blue */}

                    {/* default color red */}
                    <RadioGroup.Option
                      value={"red"}
                      className={({ active, checked }) =>
                        classNames(
                          'ring-red-500',
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        Red
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          'bg-red-500',
                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                        )}
                      />
                    </RadioGroup.Option>


                    <RadioGroup.Option
                      value={"green"}
                      className={({ active, checked }) =>
                        classNames(
                          'ring-green-500',
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        Green
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          'bg-green-500',
                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                        )}
                      />
                    </RadioGroup.Option>


                    <RadioGroup.Option
                      value={"blue"}
                      className={({ active, checked }) =>
                        classNames(
                          'ring-blue-500',
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        Blue
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          'bg-blue-500',
                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                        )}
                      />
                    </RadioGroup.Option>
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {/* 3 Sizes: S, M, L */}

                    <RadioGroup.Option
                      key={"S"}
                      value={"Small"}
                      className={({ active }) =>
                        classNames(
                          'cursor-pointer bg-white text-gray-900 shadow-sm',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span">S</RadioGroup.Label>
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked ? 'border-indigo-500' : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-md'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>

                    <RadioGroup.Option
                      key={"M"}
                      value={"Medium"}
                      className={({ active }) =>
                        classNames(
                          'cursor-pointer bg-white text-gray-900 shadow-sm',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span">M</RadioGroup.Label>
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked ? 'border-indigo-500' : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-md'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>

                    <RadioGroup.Option
                      key={"L"}
                      value={"Large"}
                      className={({ active }) =>
                        classNames(
                          'cursor-pointer bg-white text-gray-900 shadow-sm',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span">L</RadioGroup.Label>
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked ? 'border-indigo-500' : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-md'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>



                  </div>
                </RadioGroup>
              </div>

              <button
                onClick={(e) => handleAddToCart(e)}
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>

              <div className="mt-4 flex space-x-4">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  Rent
                </button>
                <button
                  type="button"
                  onClick={(e) => addToWishlist({ productId: productId })}
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Wishlist
                </button>
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Favorites
                </button>
              </div>

              {user && user.role === "admin" && (
                <div className="mt-4">
                  <button
                    onClick={(e) => { deleteProduct(productId); window.location.href = "/products" }}
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div>
              )}

            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Specifications</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.specifications.map((specification, index) => (
                    <li key={index} className="text-gray-400">
                      <span className="text-gray-600">{specification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewsList reviews={product.reviews} />

            {/* Review Form */}
            <ReviewForm productId={productId} onSubmit={handleReviewSubmit} />

            {/* Related Products */}
            <div className="space-x-5">
              <ProductList title="Related Products" products={product.relatedProducts} />
            </div>

          </div>
        </div>
      </div >
      {/* Rent Modal */}
      < RentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)
        }
        rentPrice={product.rent_price}
        onSubmit={handleRentSubmit}
      />
    </div >
  );
}
