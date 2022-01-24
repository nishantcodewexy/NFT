import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { allCategory } from "../../actions/nft.action";
import Pagination from "components/Paginations/Pagination";
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
export default function NFTCategoryList() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9)
  // ];

  const useStyles = makeStyles({
    table: {
      minWidth: 700
    }
  });

  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(14);

  const [serach, setSearch] = useState({
    used: "",
    option: "",
    text: ""
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    allCategory().then((res) => {
      setCategory(res);
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPage = indexOfLastPost - postsPerPage;
  const currentPosts =
    category && category.slice(indexOfFirstPage, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-3 mx-md-5 nft_category_wrap">
      <div style={{ fontWeight: "700", fontSize: "40px", color : "#000"}}>NFT 목록</div>

      <div style={{ display: "flex", margin: "2% 0" }}>
        <div style={{ flex: "1" }}>
          <Button
            style={{ backgroundColor: "#5376FF" }}
            variant="contained"
            color="primary"
          >
            등록
          </Button>
        </div>
        <div style={{ flex: "8" }}></div>
      </div>


      <div
          className="align-items-center mt-2 p-0 statusWrap statusWrap_1"
          style={{ fontWeight: "700", display: "flex" }}
        >
          <div></div>
          <div className="statusData select-box">
            <FormControl className="cm_select_box" variant="outlined">
              <InputLabel id="nft_cat_select_1">=상태=</InputLabel>
                <Select
                  labelId="nft_cat_select_1"
                  id="nft-cat-select-1"
                  label="=상태="
                  name="used"
                  value={serach.used}
                  onChange={handleChange}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="상태">Category name</MenuItem>
                </Select>
            </FormControl>

            <FormControl className="cm_select_box" variant="outlined">
              <InputLabel id="nft_cat_select_2">=상태=</InputLabel>
                <Select
                  labelId="nft_cat_select_2"
                  id="nft-cat-select-2"
                  label="=상태="
                  onChange={handleChange}
                  name="option"
                  value={serach.option}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="상태">Category name</MenuItem>
                </Select>
            </FormControl>
          </div>

          <div className="col-sm-12  my-2 statusData1">
            <TextField
              id="filled-select-currency"
              placeholder="검색옵션을 선택해주세요."
              variant="outlined"
              fullwidth="true"
              name="text"
              value={serach.text}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-6  my-2 statusData2">
            <Button
              style={{
                backgroundColor: "#5376FF",
                color: "#fff",
                padding: "0 2px",
                border: "1px solid #5376FF",
                fontWeight: "bold"
              }}
            >
              {" "}
              검색{" "}
            </Button>
          </div>
          <div className="col-sm-6 my-2 statusData2">
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#5376FF",
                padding: "0 2px",
                border: "1px solid #5376FF",
                fontWeight: "bold"
              }}
            >
              {" "}
              초기화{" "}
            </Button>
          </div>
        </div>

      <div style={{ fontWeight: "500" }}>Total : 14 Count (1/1)Page</div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="center">PK</TableCell>
              <TableCell align="center">Category name</TableCell>
              {/*} <TableCell align="center">staus</TableCell> */}
              <TableCell align="center">Transaction Date</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts &&
              currentPosts
                /*}.filter((val) => {
                  if (serach.used == "") {
                    return val;
                  } else if (val.usage.includes(serach.used)) {
                    return val;
                  }
                })
              */
                .filter((val) => {
                  if (serach.text === "" || serach.option === "") {
                    return val;
                  } else if (serach.option === "상태") {
                    if (serach.text === "") {
                      return val;
                    } else if (val.category_name.includes(serach.text)) {
                      return val;
                    }
                  }
                })
                .map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{data.category_name}</TableCell>
                    {/*} <TableCell align="center">{data.usage}</TableCell> */}
                    {/*} <TableCell align="center">
                      {data.created_at.split("T")[0]}
                      {"  "}
                      {data.created_at.split("T")[1].split(".")[0]}
                    </TableCell>
                */}
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">
                      <Link to={`/nft-category-edit/${data.id}`}>
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
        <div>
          <Button size="small" style={{ height: "30px", width: "30px" }}>
            {" "}
            First{" "}
          </Button>
        </div>
        <div className="d-flex justify-content-center" style={{ flex: "8" }}>
          {
            //<Pagination count={30} variant="outlined" shape="rounded" />
          }
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={category && category.length}
            paginate={paginate}
          />
        </div>
        <div>
          <Button size="small" style={{ height: "30px", width: "30px" }}>
            {" "}
            End{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
