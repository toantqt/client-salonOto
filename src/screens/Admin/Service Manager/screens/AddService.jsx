import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import {
  convertFromHTML,
  ContentState,
  EditorState,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import ButtonUploadImageComponent from "../../../../components/ButtonUploadImage/ButtonUploadImage.component";
import ImagePreviewComponent from "../../../../components/ImagePreview/ImagePreview.component";
import VideoPreviewComponent from "../../../../components/VideoPreview/VideoPreview.component";
import { addService } from "../../../../api/AdminAPI";
import AdminSlug from "../../../../resources/AdminSlug";
export default function AddService(props) {
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState([]);
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [point, setPoint] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    props.handleLoading(false);
  }, []);

  const deleteImage = (url) => {
    const newImagePreview = imagePreview.filter((e) => {
      return e.url != url.url;
    });
    setImagePreview(newImagePreview);
  };

  const addImage = (event) => {
    if (event.target.type === "file") {
      let files = Array.from(event.target.files);
      files.forEach((file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((imagePreview) => [
            ...imagePreview,
            { url: reader.result, image: file, type: file.type },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const listImagePreview = imagePreview.map((e, index) => {
    console.log(e);
    if (e.type !== "video/mp4") {
      return (
        <ImagePreviewComponent url={e} key={index} deleteImage={deleteImage} />
      );
    } else {
      return (
        <VideoPreviewComponent url={e} key={index} deleteImage={deleteImage} />
      );
    }
  });

  const onEditorStateChange = (editorState, status) => {
    const converHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    if (status === 1) {
      setEditorState1(editorState);
      setDetails(converHtml);
    }
  };

  const handlePastedText = (text, html, callback) => {
    const modifiedHtml = html.replace(
      /<p class=MsoListParagraph[\s\S]*?>·([\s\S]*?)<\/p>/g,
      "<li>$1</li>"
    );
  };

  const handleChangeInput = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "price") {
      setPrice(event.target.value);
    } else if (event.target.name === "discount") {
      setDiscount(event.target.value);
    } else if (event.target.name === "point") {
      setPoint(event.target.value);
    }
  };

  const handleSubmit = async () => {
    const data = {
      name: name,
      price: price,
      discount: discount,
      point: point,
      details: details,
      image: imagePreview,
    };
    if (
      data.name === "" ||
      data.price === "" ||
      data.discount === "" ||
      data.point === "" ||
      data.image.length === 0
    ) {
      alert("Xin vui lòng nhập đầy đủ thông tin");
    } else {
      props.handleLoading(true);
      await addService(data).then(() => {
        history.push(AdminSlug.serviceManager);
      });
    }
    console.log(data);
  };

  return (
    <Grid>
      <div className="header-title mb-3">
        <span>Thêm dịch vụ mới: </span>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <TextField
              id="outlined-basic"
              label="Tên dịch vụ"
              variant="outlined"
              name="name"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Giá"
              name="price"
              variant="outlined"
              type="number"
              style={{ width: "100%" }}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Giảm giá"
              name="discount"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              id="outlined-basic"
              label="Điểm cộng"
              name="point"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item lg={12}>
            <div className="news-editor mt-3">
              <p className="title">Hình ảnh:</p>

              <div className="wrap-pick-image">
                <div className="wrapper">
                  {listImagePreview}
                  <ButtonUploadImageComponent addImage={addImage} />
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={12}>
            <div className="news-editor mt-3">
              <p className="title">Chi tiết: </p>
              <Editor
                editorState={editorState1}
                onEditorStateChange={(e) => {
                  onEditorStateChange(e, 1);
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                handlePastedText={handlePastedText}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ marginTop: "70px" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          style={{ float: "right" }}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </div>
    </Grid>
  );
}
