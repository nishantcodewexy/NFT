import React, { useEffect, useState } from "react";
import Button from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Pagination2 from "components/Paginations/Pagination2";
import { getAllAvatars } from "../../actions/avatar.action";
import { Link } from "react-router-dom";

export default function AvatarList() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  const [avatars, setAvatars] = useState();
  const [pages, setPages] = useState(1);
  const [size, setSize] = useState();
  const [newPage, setNewPage] = useState();
  const [serach, setSearch] = useState({
    from: "",
    to: "",
    status: "",
    option: "",
    text: ""
  });

  useEffect(() => {
    getAllAvatars(1).then((res) => {
      console.log(res);
      setAvatars(res.data);
      setSize(res.data.length);
      if (res.count !== 0) {
        setPages(res.count);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...serach, ...{ [name]: value } };
    setSearch(formData);
    console.log(formData);
  };

  const clearText = () => {
    setSearch({ ...serach, ...{ text: "", option: "" } });
  };

  const classes = useStyles();

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>아바타 목록</div>

      <div style={{ display: "flex", margin: "2% 0" }}>
        <div style={{ flex: "1" }}>
          <Link to="/avatar-register">
            <Button
              style={{
                backgroundColor: "#5376FF",
                outline: "none",
                borderRadius: "6px"
              }}
              variant="contained"
              color="primary"
            >
              등록
            </Button>
          </Link>
        </div>
        <div style={{ flex: "8" }}></div>
      </div>

      <div
        className="align-items-center mt-2 row"
        style={{ fontWeight: "700", display: "flex" }}
      >
        <div className="col-sm-12 col-lg-4"></div>
        <div
          className="col-sm-12 col-lg-4 my-2"
          style={{ color: "#000", fontWeight: "700" }}
        >
          <TextField
            id="filled-select-currency"
            select
            helperText="Status"
            variant="outlined"
            onChange={handleChange}
            name="status"
            value={serach.status}
            style={{ width: "150px", margin: "0 5px" }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="true">Used</MenuItem>
            <MenuItem value="false">Not used</MenuItem>
          </TextField>

          <TextField
            id="filled-select-currency"
            select
            placeholder="=상태="
            helperText="Options"
            variant="outlined"
            onChange={handleChange}
            name="option"
            value={serach.option}
            style={{ width: "150px" }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="name">Avatar name</MenuItem>
          </TextField>
        </div>
        <div className="col-sm-12 col-lg-2 my-3">
          <TextField
            id="filled-select-currency"
            placeholder="검색옵션을 선택해주세요."
            variant="outlined"
            name="text"
            fullWidth
            value={serach.text}
            onChange={handleChange}
            fullwidth
          />
        </div>
        <div className="col-sm-12 col-lg-2 my-3" style={{ flex: "1" }}>
          <Button
            style={{
              backgroundColor: "#5376FF",
              color: "#fff",
              padding: "0 2px"
            }}
          >
            {" "}
            검색{" "}
          </Button>
        </div>
        <div style={{ flex: "1" }}>
          <Button
            onClick={clearText}
            style={{
              backgroundColor: "#fff",
              color: "#5376FF",
              padding: "0 2px"
            }}
          >
            {" "}
            초기화{" "}
          </Button>
        </div>
      </div>

      <div style={{ fontWeight: "500" }}>
        Total {size}: Count ({newPage}/{pages})Page
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="center">PK</TableCell>
              <TableCell align="center">Avatar image</TableCell>
              <TableCell align="center">Avatar name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {avatars &&
              avatars
                .filter((val) => {
                  if (serach.status == "") {
                    return val;
                  } else if (val.status.includes(serach.status)) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (serach.text == "" || serach.option == "") {
                    return val;
                  } else if (serach.option === "name") {
                    if (serach.text == "") {
                      return val;
                    } else if (val.name.includes(serach.text)) {
                      return val;
                    }
                  }
                })
                .map((avatar, index) => (
                  <TableRow key={avatar.avatar_id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%"
                        }}
                        src={avatar.image}
                      />
                    </TableCell>
                    <TableCell align="center">{avatar.name}</TableCell>
                    {avatar.status == "true" ? (
                      <TableCell align="center">Used</TableCell>
                    ) : (
                      <TableCell align="center">Not Used</TableCell>
                    )}
                    <TableCell align="center">
                      {avatar.updated_at.split("T")[0]}
                      {"  "}
                      {avatar.updated_at.split("T")[1].split(".")[0]}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/avatar-edit/${avatar.avatar_id}`}>
                        <Button
                          style={{
                            backgroundColor: "#fff",
                            color: "#5376FF",
                            padding: "8px 16px",
                            outline: "none",
                            border: "1px solid #5376FF"
                          }}
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="d-flex justify-content-center mt-5">
        <div style={{ flex: "8" }}>
          <Pagination2
            pages={pages}
            setAdmin={(avatars) => setAvatars(avatars)}
            getList={getAllAvatars}
            setSize={(size) => {
              setSize(size);
            }}
            setNewPage={(newPage) => {
              setNewPage(newPage + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}