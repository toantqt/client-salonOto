import React, { useState, useEffect } from "react";
// import "../Upload Button/uploadButton.css";
import ReactPlayer from "react-player";

export default function VideoPreviewComponent(props) {
  return (
    <div className="box">
      <div className="image-preview" style={{ width: "100%", height: "300px" }}>
        <ReactPlayer
          url={props?.url?.url}
          style={{ width: "100%", height: "300px" }}
        />
      </div>
      <div
        className="delete-options"
        onClick={() => props.deleteImage(props.url)}
      >
        <label></label>
      </div>
    </div>
  );
}
