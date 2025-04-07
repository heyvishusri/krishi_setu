import { useEffect, useState } from "react";

const Seller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sellers") // Updated API URL
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching sellers data:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Sellers</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <img
                src={item.profileImage}
                alt={item.name}
                className="w-10 h-10 mr-3 rounded-full"
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
              className="object-cover w-full h-40 mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            <div className="mt-4">
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
            <div className="flex items-center justify-between mt-4">
              <a href={`tel:${item.contact}`} className="text-blue-500">
                {item.contact}
              </a>
              <a href="/location" className="text-blue-500">
                Current Location
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seller;
