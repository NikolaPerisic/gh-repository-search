import React from "react";
import "./App.css";

const list = props => {
  let date = new Date(props.updatedAt).toLocaleDateString();
  let homepage = null;
  if (props.homepageUrl) {
    homepage = (
      <a href={props.homepageUrl} target="blank" className="homepageUrl">
        {props.homepageUrl}
      </a>
    );
  }
  return (
    <div className="list-item">
      <div className="inline-item">
        <a href={props.url} target="blank" className="url">
          {props.name}
        </a>
        <p className="stars">{props.stars}</p>
        <p className="forks">{props.forks}</p>
      </div>
      <p>{props.description}</p>
      {homepage}
      <p>Updated At: {date}</p>
    </div>
  );
};
export default list;
