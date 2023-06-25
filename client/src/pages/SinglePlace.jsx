import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "./../components/AddressLink";
import SwiperPhoto from "../components/SwiperPhoto";
import ShowAllPhoto from "../components/ShowAllPhoto";
import SingleBooking from "../components/SingleBooking";

const SinglePlace = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/place/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) {
    return "";
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <SwiperPhoto place={place} />
      <ShowAllPhoto place={place} />
      <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4 ">
            <h2 className="font-semibold text-sm">{place.description}</h2>
          </div>
          入住时间：{place.checkIn}:00
          <br />
          离开时间：{place.checkOut}:00
          <br />
          入住人数：{place.maxGuests}人
          <br />
        </div>
        {/* booking */}
        <div>
          <SingleBooking place={place} />
        </div>
      </div>

      {/* extro info */}
      <div className="bg-white w-full px-2 py-6 border-1 rounded-xl mb-4">
        <div>
          <h2 className="font-semibold text-sm">更多信息</h2>
        </div>
        <div className="text-xs mb-4 mt-2 text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
