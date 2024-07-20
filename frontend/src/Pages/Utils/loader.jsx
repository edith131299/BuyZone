import React from "react";
import ReactLoading from "react-loading";

export default function Loader() {
  return (
    <div className="loader_container">
      <ReactLoading
        className="mx-[40%] my-[8%]"
        type="spin"
        color="#febd69"
        height={"8%"}
        width={"8%"}
      />
    </div>
  );
}
