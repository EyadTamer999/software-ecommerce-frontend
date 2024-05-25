"use client";
import React, { useState, useEffect } from 'react';
import { getMyReviews, deleteReview, updateReview } from './fetchApi';
import { StarIcon } from '@heroicons/react/20/solid';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [editedRating, setEditedRating] = useState(0);

    const fetchReviews = async () => {
        const response = await getMyReviews();
        setReviews(response.data);
        console.log(response.data);
    };

    const handleEditClick = (review) => {
        setEditingReviewId(review.review._id);
        setEditedText(review.review.review);
        setEditedRating(review.review.rating);
    };

    const handleDeleteClick = async (reviewId) => {
        console.log(reviewId);
        await deleteReview(reviewId);
        fetchReviews();
    };

    const handleUpdateClick = async () => {
        if (editingReviewId) {
            await updateReview(reviews.find((review) => review.review._id === editingReviewId).productId,
                { review: editedText, rating: editedRating, userId: localStorage.getItem('userId'), createdAt: new Date() });
            setEditingReviewId(null);
            setEditedText('');
            setEditedRating(0);
            fetchReviews();
        }
    };

    const handleRatingClick = (rating) => {
        setEditedRating(rating + 1); // Ratings are usually 1-5, but arrays are 0-indexed
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
            <div className="mt-8 space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.review._id}
                        className="border p-4 rounded shadow transition-all duration-500 ease-in-out transform hover:scale-105"
                    >
                        <h3 className="text-xl font-semibold">{review.productName}</h3>
                        {editingReviewId === review.review._id ? (
                            <div>
                                <textarea
                                    className="w-full p-2 border rounded mb-2"
                                    value={editedText}
                                    onChange={(e) => setEditedText(e.target.value)}
                                />
                                <div className="flex items-center mb-2">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                editedRating > rating ? 'text-yellow-500' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0 cursor-pointer'
                                            )}
                                            aria-hidden="true"
                                            onClick={() => handleRatingClick(rating)}
                                        />
                                    ))}
                                </div>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={handleUpdateClick}
                                >
                                    Save
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                    onClick={() => setEditingReviewId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="mt-2">{review.review.review}</p>
                                <div className="flex items-center mt-1">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                review.review.rating > rating ? 'text-yellow-500' : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="mt-1">Rating: {review.review.rating}</p>
                                <div className="flex mt-4">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 transition-all duration-300 ease-in-out transform hover:scale-110"
                                        onClick={() => handleEditClick(review)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-110"
                                        onClick={() => handleDeleteClick(review.productId)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
