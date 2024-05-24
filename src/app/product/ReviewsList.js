// components/ReviewsList.js
import { StarIcon } from '@heroicons/react/20/solid'
import { classNames } from './utils'

const ReviewsList = ({ reviews }) => {
    return (
        <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Customer Reviews</h2>
            <div className="overflow-y-auto h-64 mt-4 space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        className={classNames(
                                            review.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                            'h-5 w-5 flex-shrink-0'
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="ml-3 text-sm text-gray-700">{review.userId}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>{review.review}</p>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewsList
