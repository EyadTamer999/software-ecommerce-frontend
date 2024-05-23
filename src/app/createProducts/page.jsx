const createProducts = () => {

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
              <input type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Product Name"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Category
            </label>
            <div className="mt-1">
              <input type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Product Category"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <div className="mt-1">
              <input type="number" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Discount"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Description
            </label>
            <div className="mt-1">
              <textarea required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Product Description"></textarea>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <div className="mt-1">
              <input type="file" multiple required className="appearance-none block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Buy Price
            </label>
            <div className="mt-1">
              <input type="number" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Buy Price"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Price
            </label>
            <div className="mt-1">
              <input type="number" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Rent Price"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>
            <div className="mt-1">
              <input type="number" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Availability"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <div className="mt-1">
              <input type="number" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Stock"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specifications
            </label>
            <div className="mt-1">
              <textarea required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="spec1, spec2"></textarea>
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Product
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

    );
    };

export default createProducts;