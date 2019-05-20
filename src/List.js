import React from "react";
import "./App.css";

const list = props => {
  return (
    <div className="list-item">
      <a href={props.url} target="blank">
        {props.name}
      </a>
      <p>{props.description}</p>
    </div>
  );
};
export default list;
