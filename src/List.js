import React from "react";
import "./App.css";

const list = props => {
  return (
    <div className="list-item">
      <div className="inline-item">
        <a href={props.url} target="blank">
          {props.name}
        </a>
        <p className="stars">{props.stars}</p>
        <p className="forks">{props.forks}</p>
      </div>
      <p>{props.description}</p>
    </div>
  );
};
export default list;
