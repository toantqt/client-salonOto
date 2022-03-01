import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import TableComponent from "../../../../components/Table/Table.component";
import { getCountUser, getUser, covertDate } from "../../../../api/AdminAPI";
export default function UserManager(props) {
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(async () => {
    props.handleLoading(true);
    await getCountUser().then((res) => {
      setCount(res.data);
    });
    await getUser(page).then((res) => {
      setUser(res.data);
    });
    props.handleLoading(false);
  }, [reload]);

  useEffect(async () => {
    props.handleLoading(true);
    await getUser(page).then((res) => {
      setUser(res.data);
      props.handleLoading(false);
    });
  }, [page]);
  const columns = [
    { field: "fullName", headerName: "HỌ VÀ TÊN", width: 200 },
    { field: "phoneNumber", headerName: "SỐ ĐIỆN THOẠI", width: 200 },
    { field: "idCard", headerName: "CMND/CCCD", width: 200 },
    { field: "created", headerName: "NGÀY TẠO", width: 200 },
  ];

  const rows = user.map((e, index) => {
    return {
      id: index,
      fullName: e?.fullName,
      phoneNumber: e?.phoneNumber,
      idCard: e?.idCard,
      created: covertDate(e?.createAt),
    };
  });

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReload = () => {
    setReload(!reload);
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  return (
    <Grid>
      <div className="head-title">
        <span className="title">QUẢN LÝ NGƯỜI DÙNG: ({count})</span>
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
    </Grid>
  );
}
