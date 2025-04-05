import { useEffect, useState } from "react";

const Buyer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/buyers") // Updated API URL
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching buyers data:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center md:text-left">
        Buyers
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-4 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <img
                src={item.profileImage}
                alt={item.name}
                className="w-12 h-12 mr-3 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Posted On {item.postDate}
                </p>
              </div>
            </div>
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-40 mb-4 rounded-lg sm:h-48 lg:h-56"
            />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <strong>Area of work:</strong> {item.area}
              </p>
              <p className="text-gray-700">
                <strong>Work Address:</strong> {item.address}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> Rs {item.price}
              </p>
              <p className="text-gray-700">
                <strong>Work date:</strong> {item.workDate}
              </p>
            </div>
            <div className="flex flex-col items-start justify-between mt-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0">
              <a
                href={`tel:${item.contact}`}
                className="text-blue-500 hover:underline"
              >
                {item.contact}
              </a>
              <a href="/location" className="text-blue-500 hover:underline">
                Current Location
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buyer;
