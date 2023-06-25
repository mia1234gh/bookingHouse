import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <ColorRing
        visible={true}
        height="60"
        width="60"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
};

export default Loading;
