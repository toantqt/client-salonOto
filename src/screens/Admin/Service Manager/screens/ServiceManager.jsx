import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  getService,
  covertDate,
  deleteService,
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
export default function ServiceManager(props) {
  const [service, setService] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const [reload, setReload] = useState(false);
  const history = useHistory();
  useEffect(async () => {
    props.handleLoading(true);
    await getService().then((res) => {
      setService(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  const columns = [
    { field: "stt", headerName: "STT", width: 90 },
    { field: "name", headerName: "TÊN DỊCH VỤ", width: 200 },
    { field: "price", headerName: "GIÁ TIỀN", width: 200 },
    { field: "point", headerName: "ĐIỂM CỘNG", width: 150 },

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
      name: e?.name,
      price: e?.price,
      point: e?.pointPlus,
      created: covertDate(e?.createAt),
      action: e,
    };
  });
  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleClick = () => {
    history.push(AdminSlug.addService);
  };

  const handleClickDelete = (id) => {
    setSelectedID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedID();
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log(selectedID);
    if (selectedID) {
      const data = {
        serviceID: selectedID,
      };
      await deleteService(data).then((res) => {
        handleClose();
        setReload(!reload);
      });
    }
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ DỊCH VỤ: ({service.length})</span>
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
          Thêm dịch vụ
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
        title="Xác nhận xóa dịch vụ"
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Grid>
  );
}
