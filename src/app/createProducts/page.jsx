"use client";
import React, { useState } from "react";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const CreateProducts = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    discount: "",
    description: "",
    images: [],
    buyPrice: "",
    rentPrice: "",
    availability: "",
    stock: "",
    specifications: ""
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file =>
      file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"
    );

    if (validFiles.length !== files.length) {
      alert("Please upload valid image files (png, jpg, jpeg).");
    } else {
      setImageFiles(validFiles);
    }
  };

  const handleImageUpload = async () => {
    const uploadedImageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const imageRef = ref(storage, `images/${uuidv4()}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Handle progress
            },
            (error) => {
              console.error("Image upload failed:", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      })
    );

    return uploadedImageUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageUrls = await handleImageUpload();
      setData({ ...data, images: uploadedImageUrls });
      console.log({ ...data, images: uploadedImageUrls });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Product
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill out the form below to add a new product to your inventory.
          </p>
        </div>
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Category
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Product Category"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="discount"
                    value={data.discount}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Discount"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <div className="mt-1">
                  <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Product Description"
                  ></textarea>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    multiple={true}
                    name="images"
                    onChange={handleImageChange}
                    required
                    className="appearance-none block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Buy Price
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="buyPrice"
                    value={data.buyPrice}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Buy Price"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rent Price
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="rentPrice"
                    value={data.rentPrice}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Rent Price"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Availability
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="availability"
                    value={data.availability}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Availability"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="stock"
                    value={data.stock}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Stock"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Specifications
                </label>
                <div className="mt-1">
                  <textarea
                    name="specifications"
                    value={data.specifications}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="spec1, spec2"
                  ></textarea>
                </div>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
