import React, { useState } from "react";

import image from "./default_avatar.png";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(image);

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <img
      src={preview}
      name="avatar"
      alt="avatar"
      className="object-fill rounded-full w-16 h-16 "
    />
  );
};

export default PreviewImage;
