import React, { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
const ButtonUploadComponent = (props) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="mb-3">
        <input
          accept=".xlsx"
          id="contained-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={props.handleChangeFile}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            style={{ textTransform: "none" }}
            component="span"
          >
            Chọn file cần nhập
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ButtonUploadComponent;
