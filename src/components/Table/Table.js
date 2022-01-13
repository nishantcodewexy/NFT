import React from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const classes = useStyles();

function Table(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#E5E5E5" }}>
            <TableRow>
              <TableCell>NO</TableCell>
              <TableCell align="right">PK</TableCell>
              <TableCell align="right">카테고리</TableCell>
              <TableCell align="right">NFT명(작품명)</TableCell>
              <TableCell align="right">판매상태</TableCell>
              <TableCell align="right">거래중지</TableCell>
              <TableCell align="right">창작자</TableCell>
              <TableCell align="right">소유자</TableCell>
              <TableCell align="right">판매코인</TableCell>
              <TableCell align="right">판매가(현재가)</TableCell>
              <TableCell align="right">판매히스토리</TableCell>
              <TableCell align="right">등록일시</TableCell>
              <TableCell align="right">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))*/}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Table;
