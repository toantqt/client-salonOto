import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getService,
  covertDate,
  deleteService,
  getCategory,
  deleteCategory,
} from "../../../../api/AdminAPI";
import Grid from "@material-ui/core/Grid";
import TableComponent from "../../../../components/Table/Table.component";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import AdminSlug from "../../../../resources/AdminSlug";
import ModalDeleteComponent from "../../../../components/Modal/ModalDelete.component";
import queryString from "query-string";
export default function CategoryManager(props) {
  const search = queryString.parse(props.location.search);
  const query = search.q;
  const [service, setService] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [reload, setReload] = useState(false);
  const [type, setType] = useState("");
  const history = useHistory();
  useEffect(async () => {
    props.handleLoading(true);
    if (query) {
      setType(query);
      await getCategory(query).then((res) => {
        setService(res.data);
      });
      props.handleLoading(false);
    }
  }, [reload, query]);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "HÃNG XE", width: 200 },
    { field: "created", headerName: "NGÀY TẠO", width: 200 },
    {
      field: "action",
      headerName: "CHỨC NĂNG",
      width: 200,
      renderCell: (action) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              className="btn-action btn-a-3"
              onClick={() => {
                handleClickDelete(action.row?.action?._id);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = service.map((e, index) => {
    return {
      id: index,
      stt: index + 1,
      name: e?.categoryName,
      created: covertDate(e?.createAt),
      action: e,
    };
  });
  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClick = () => {
    history.push(`${AdminSlug.addCategory}?q=${type}`);
  };

  const handleClickDelete = (id) => {
    setSelectedID(id);
    setOpen(true);
  };

  const handleClickEdit = (id) => {
    return history.push(`${AdminSlug.editCategory}?q=${id}`);
  };

  const handleClose = () => {
    setSelectedID();
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log(selectedID);
    if (selectedID) {
      const data = {
        categoryID: selectedID,
      };
      await deleteCategory(data).then((res) => {
        handleClose();
        setReload(!reload);
      });
    }
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">
          QUẢN LÝ DANH MỤC: ({type === "company" ? "Hãng xe" : "Loại xe"})
        </span>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          style={{
            textTransform: "none",
            float: "right",
          }}
          onClick={handleClick}
        >
          Thêm danh mục
        </Button>
      </div>

      <div className="mt-3">
        <TableComponent
          columns={columns}
          rows={rows}
          count={count}
          page={page}
          handleChangePage={handleChangePage}
        />
      </div>
      <ModalDeleteComponent
        open={open}
        title={"Xác nhận xóa " + (type === "company" ? "hãng xe" : "loại xe")}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Grid>
  );
}
