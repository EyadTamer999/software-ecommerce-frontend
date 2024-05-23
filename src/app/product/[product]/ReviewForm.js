// components/ReviewForm.js
import { useState } from 'react'

const ReviewForm = ({ onSubmit }) => {
    const [newReview, setNewReview] = useState({ rating: 0, text: '', author: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(newReview)
        setNewReview({ rating: 0, text: '', author: '' })
    }

    return (
        <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Write a Review</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label htmlFor="review-rating" className="block text-sm font-medium text-gray-700">
                        Rating
                    </label>
                    <select
                        id="review-rating"
                        name="review-rating"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">
                        Review
                    </label>
                    <textarea
                        id="review-text"
                        name="review-text"
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default ReviewForm