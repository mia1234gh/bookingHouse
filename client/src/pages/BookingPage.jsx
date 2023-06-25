import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import BookingDate from "../components/BookingDate";
import axios from "axios";
import SwiperPhoto from "../components/SwiperPhoto";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/booking").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">你的预定信息：</h2>
          <BookingDate booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>总价格：</div>
          <div>￥{booking.price}</div>
        </div>
      </div>
      <SwiperPhoto place={booking.place} />
    </div>
  );
};

export default BookingPage;
