import React, { useEffect, useState } from "react";
import AccountNav from "./../components/AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import BookingDate from "./../components/BookingDate";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/booking").then((response) => {
      setBookings(response.data);
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="mb-2">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
            >
              <div className="w-32">
                {booking.place.photos?.[0] && (
                  <img
                    className="rounded-2xl shadow-md shadow-gray-100 object-cover aspect-square "
                    src={`http://localhost:5000/uploads/${booking.place.photos[0]}`}
                    alt="img"
                  />
                )}
              </div>
              <div className="py-4">
                <h2 className="font-bold ">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDate
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />

                  <div className="flex flex-row items-center justify-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-thin underline text-sm">
                      总价：￥{booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
