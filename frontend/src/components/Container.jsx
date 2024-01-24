import React from "react";

const Container = (props) => {
  return (
    <section className={props.class1}>
      <div className="max-w-screen-xl mx-auto">{props.children}</div>
    </section>
  );
};

export default Container;
