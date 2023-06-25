import React from "react";

const Image = ({ src, ...rest }) => {
  src = src && src.includes("http://") ? src : "http://loalhost:5000/uploads";
  return (
    <div>
      <img src={src} {...rest} alt={""} />
    </div>
  );
};
export default Image;
