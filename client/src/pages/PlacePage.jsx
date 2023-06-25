import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";

const PlacePage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      {/* 不是new链接，导入new页面 */}
      <div className="text-center mt-6">
        <Link
          className="inline-flex gap-1 bg-primary text-white rounded-full py-2 px-6"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          新增地点
        </Link>
      </div>

      {/* places详情 */}
      <div className="mt-4 ">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              className="flex cursor-pointer gap-4 bg-gray-100 rounded-2xl p-4 mb-2"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-lg">
                <img
                  alt="place_img"
                  src={`http://localhost:5000/uploads/${place.photos[0]}`}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-xs mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacePage;
