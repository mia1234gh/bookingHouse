import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import PhotoUpload from "./PhotoUpload";

const PlaceForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addPhotos, setAddPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setChcekOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirectToList, setRedirectToList] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setChcekOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  async function addNewPlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // edit existed place
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirectToList(true);
    } else {
      //add new place
      await axios.post("/places", placeData);
      setRedirectToList(true);
    }
  }
  if (redirectToList) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div className="mt-4">
      <form onSubmit={addNewPlace}>
        {/* title */}
        <h2 className="text-xl mt-4">关键词</h2>
        <p className="text-gray-500 text-sm mt-1">选择你的需求</p>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="关键词，例如海边、公寓等"
        />
        {/* address */}
        <h2 className="text-xl mt-4">地点</h2>
        <p className="text-gray-500 text-sm mt-1">你想到到达的地点</p>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="地点"
        />
        {/* photos */}
        <h2 className="text-xl mt-4">图片</h2>
        <p className="text-gray-500 text-sm mt-1">更多更好的图片</p>
        <PhotoUpload
          photoLink={photoLink}
          setPhotoLink={setPhotoLink}
          addPhotos={addPhotos}
          setAddPhotos={setAddPhotos}
        />

        {/* descriptions */}
        <h2 className="text-xl mt-4">细节</h2>
        <p className="text-gray-500 text-sm mt-1">关于此地的具体细节</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* perks */}
        <h2 className="text-xl mt-4">额外选择</h2>
        <p className="text-gray-500 text-sm mt-1">了解更多</p>
        <Perks selected={perks} onChangeSelected={setPerks} />

        {/* extra info */}
        <h2 className="text-xl mt-4">更多</h2>
        <p className="text-gray-500 text-sm mt-1">了解更多</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {/* checkin */}
        <h2 className="text-xl mt-4">住宿时间</h2>
        <p className="text-gray-500 text-sm mt-1">添加你的入住时间和离店时间</p>
        <div className="grid sm:grid-cols-3">
          <div>
            <h3 className="mt-2 mb-1">到店时间</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">离店时间</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(e) => setChcekOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">入住人数</h3>
            <input
              type="text"
              placeholder="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 mb-1">价格</h3>
            <input
              type="text"
              placeholder="100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">保存</button>
        </div>
      </form>
    </div>
  );
};

export default PlaceForm;
