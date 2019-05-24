import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className="item-right">
          <FontAwesomeIcon icon="star" className="starIcon" />
          <p className="stars">{props.stars}</p>
          <FontAwesomeIcon icon="code-branch" className="forkIcon" />
          <p className="forks">{props.forks}</p>
        </div>
      </div>
      <p>{props.description}</p>
      <div className="detailsInfo">
        {homepage}
        <p className="updatedAt">Updated: {date}</p>
      </div>
    </div>
  );
};
export default list;
