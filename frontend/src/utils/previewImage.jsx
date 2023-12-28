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
  return <img src={preview} name="avatar" alt="avatar" />;
};

export default PreviewImage;
