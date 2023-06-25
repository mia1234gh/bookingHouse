import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "./../UserContext";

const SingleBooking = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // 预定天数
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // booking this place
  async function BookingThis() {
    const response = await axios.post("/booking", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  // 跳转
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-2 rounded-2xl">
      {/* price */}
      <div className="text-base font-bold text-center">
        价格:￥{place.price}/晚
      </div>

      <div className="border rounded-2xl mt-4">
        {/* date */}
        <div className="flex">
          <div className="py-3 px-4 text-sm">
            <label>入住时间：</label>
            <input
              type="date"
              placeholder="时间"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-xs"
            />
          </div>
          <div className="py-3 px-4 text-sm border-1">
            <label>离开时间：</label>
            <input
              type="date"
              placeholder="时间"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>
        {/* guests */}
        <div className="py-3 px-4 text-sm border-t">
          <label>人数：</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            className="text-xs"
          />
        </div>
        {/* info */}
        {numberOfNights > 0 && (
          <div className="py-3 px-4 text-sm border-t">
            <label>姓名：</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>电话：</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* submit */}
      <button className="primary mt-4" onClick={BookingThis}>
        预定
        {numberOfNights > 0 && <span>￥{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default SingleBooking;
