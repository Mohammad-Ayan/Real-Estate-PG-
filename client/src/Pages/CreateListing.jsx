import React from 'react';

export default function CreateListing() {
    return (
        <main className="p-6 max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center my-7 text-gray-800">
                Create a Listing
            </h1>
            <form className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-lg shadow-md">
                {/* Left Column */}
                <div className="flex flex-col gap-6 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                    />

                    <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg h-28 resize-none bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        id="description"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        id="address"
                        required
                    />

                    <div className="flex gap-6 flex-wrap">
                        {[
                            { id: "sale", label: "Sell" },
                            { id: "rent", label: "Rent" },
                            { id: "parking", label: "Parking spot" },
                            { id: "furnished", label: "Furnished" },
                            { id: "offer", label: "Offer" },
                        ].map((item) => (
                            <div key={item.id} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <label htmlFor={item.id} className="text-gray-700">
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-6">
                        {[
                            { id: "bedrooms", label: "Bedrooms", min: 1, max: 10 },
                            { id: "bathrooms", label: "Bathrooms", min: 1, max: 10 },
                            { id: "regularPrice", label: "Regular Price (Rs/month)", min: 100, max: 1000000 },
                            { id: "discountPrice", label: "Discounted Price (Rs/month)", min: 100, max: 100000 },
                        ].map((item) => (
                            <div key={item.id} className="flex flex-col">
                                <label
                                    htmlFor={item.id}
                                    className="text-gray-600 text-sm font-medium"
                                >
                                    {item.label}
                                </label>
                                <input
                                    type="number"
                                    id={item.id}
                                    min={item.min}
                                    max={item.max}
                                    required
                                    className="p-3 border rounded-lg bg-gray-100 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col flex-1 gap-6">
                    <p className="font-semibold text-gray-700">
                        Images:
                        <span className="font-normal text-gray-500 ml-2">
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className="flex gap-4 items-center">
                        <input
                            className="p-3 border rounded-lg w-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                        />
                        <button
                            className="p-3 text-white bg-green-600 rounded-lg uppercase hover:bg-green-500 transition"
                        >
                            Upload
                        </button>
                    </div>

                    <button
                        className="p-4 bg-blue-600 text-white rounded-lg uppercase hover:bg-blue-500 transition disabled:opacity-80"
                    >
                        Create Listing
                    </button>
                </div>
            </form>
        </main>
    );
}
