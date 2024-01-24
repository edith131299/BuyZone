import React from "react";

const Colors = (props) => {
  const { color, setColor } = props;
  return (
    <div className="flex flex-wrap">
      <ul className="colors ps-0">
        {color &&
          color.map((item, index) => {
            return (
              <li
                onClick={() => {
                  setColor(item?._id);
                }}
                style={{ backgroundColor: item.title }}
                className="w-4 h-4 rounded-full"
                key={index}
              ></li>
            );
          })}
      </ul>
    </div>
  );
};

export default Colors;
