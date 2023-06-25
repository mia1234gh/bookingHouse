import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 cursor-pointer ">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={`/place/${place._id}`} className="bg-gray-200 rounded-2xl">
            <div className="bg-gray-500 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square "
                  src={`http://localhost:5000/uploads/${place.photos[0]}`}
                  alt="img"
                />
              )}
            </div>

            <div className="flex flex-col  p-2">
              <h2 className="font-bold text-sm ">{place.address}</h2>
              <h3 className="text-xs text-gray-500 ">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold text-xs">￥{place.price}</span> /晚
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
