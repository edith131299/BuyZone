import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState();

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return <img src={preview} name="avatar" alt="avatar" className="object-cover w-4/5 h-full" />;
};

export default PreviewImage;
