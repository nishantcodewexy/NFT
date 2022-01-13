import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { FormControlLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import historyImage from "../../images/item_3.png";
import { EditNFT } from "actions/nft.action";
import { getAllNFT } from "actions/nft.action";
import { getANFT } from "actions/nft.action";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NFTModification() {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const [details, setDetails] = useState({
    category_name: "",
    title: "",
    form_of_sale: "",
    selling_available: null,
    creator: { creator_nickname: "" },
    current_owner: { current_owner_email: "" },
    coin_name: "",
    sale_price: null,
    history: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(
      `http://139.64.237.139:4000/api/user/art-work/details?art_work_id=${id}`
    )
      .then((response) => response.json())
      .then((data) => setDetails(data.data.data));

    /*getANFT(id).then((res) => {
      setDetails(res);
    });
    */
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...details, ...{ [name]: value } };
    setDetails(formData);
  };

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>
        NFT 수정 (카테고리 정보만 변경 가능합니다.)
      </div>
      <div
        className="mt-5 row"
        style={{ fontWeight: "700", fontSize: "40px", width: "100%" }}
      >
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> NFT명 (작품명)</label> <br />
          <TextField
            id="filled-select-currency"
            placeholder="ART OF PICASO"
            variant="outlined"
            fullWidth
            disabled
            value={details.title}
            style={{ width: "300px" }}
          />
        </div>
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 카테고리</label> <br />
          <TextField
            id="filled-select-currency"
            placeholder="예술품"
            variant="outlined"
            fullwidth
            name="category_name"
            value={details.category_name}
            style={{ width: "300px" }}
            onChange={handleChange}
          />
        </div>
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 판매상태</label> <br />
          <TextField
            id="filled-select-currency"
            placeholder="고정가격"
            variant="outlined"
            value={details.selling_available}
            style={{ width: "300px" }}
            disabled
          />
        </div>
      </div>

      <div
        className="row mt-5"
        style={{ fontWeight: "700", fontSize: "40px", width: "100%" }}
      >
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 창작자 </label> <br />
          <TextField
            id="filled-select-currency"
            placeholder="드랙퀸"
            variant="outlined"
            fullwidth
            value={details.creator.creator_nickname}
            style={{ width: "300px" }}
            disabled
          />
        </div>
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 소유자</label> <br />
          <TextField
            id="filled-select-currency"
            placeholder="집중하는 소년"
            variant="outlined"
            fullwidth
            value={details.current_owner.current_owner_email}
            style={{ width: "300px" }}
            disabled
          />
        </div>
        <div className="col-lg-4 px-5">
          <label style={{ color: "#000" }}> 판매 History </label> <br />
          <Button
            style={{
              color: "#5376FF",
              border: "2px solid #5376FF",
              width: "250px"
            }}
            variant="contained"
            fullWidth
          >
            HISTORY 보기
          </Button>
        </div>
      </div>

      <div
        className="row mt-5"
        style={{
          fontWeight: "700",
          fontSize: "18px",
          display: "flex",
          width: "100%"
        }}
      >
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 판매코인 </label> <br />
          <TextField
            id="filled-select-currency"
            variant="outlined"
            fullwidth
            placeholder="ETH"
            value={details.coin_name}
            style={{ width: "300px" }}
            disabled
          />
        </div>
        <div className="col-lg-4">
          <label style={{ color: "#000" }}> 판매가 / 현재가 </label> <br />
          <TextField
            id="filled-select-currency"
            variant="outlined"
            fullwidth
            placeholder="1.213 ETH"
            value={details.sale_price}
            style={{ width: "300px" }}
            disabled
          />
        </div>
      </div>

      <div className="mt-5">
        <label style={{ color: "#000" }}> 로열티 10% </label> <br />
        <div
          className="row mt-2"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4 d-flex">
            <div className="pr-1" style={{ flex: "1" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
            <div className="pl-1" style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
          </div>
        </div>
        <div
          className="row mt-1"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4 d-flex">
            <div className="pr-1" style={{ flex: "1" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
            <div className="pl-1" style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
          </div>
        </div>
        <div
          className="row mt-1"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4 d-flex">
            <div className="pr-1" style={{ flex: "1" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
            <div className="pl-1" style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
          </div>
        </div>
        <div
          className="row mt-1"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4 d-flex">
            <div className="pr-1" style={{ flex: "1" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
            <div className="pl-1" style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
          </div>
        </div>
        <div
          className="row mt-1"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4 d-flex">
            <div className="pr-1" style={{ flex: "1" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
            <div className="pl-1" style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
          </div>
        </div>
        <div
          className="row mt-1"
          style={{
            fontWeight: "700",
            fontSize: "18px",
            display: "flex",
            width: "100%"
          }}
        >
          <div className="col-lg-4 d-flex">
            <div className="pr-1" style={{ flex: "1" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
            <div className="pl-1" style={{ flex: "3" }}>
              <TextField
                id="filled-select-currency"
                variant="outlined"
                fullwidth
                placeholder="1.213 ETH"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="row mt-5"
        style={{
          fontWeight: "700",
          fontSize: "18px",
          display: "flex",
          width: "100%"
        }}
      >
        <div className="col-lg-1">
          <Button
            style={{
              backgroundColor: "#5376FF",
              width: "100px",
              height: "auto"
            }}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            저장
          </Button>
        </div>
        <div className="col-lg-1">
          <Button
            style={{
              border: "1px solid #5376FF",
              color: "#5376FF",
              width: "100px",
              height: "auto",
              backgroundColor: "transparent"
            }}
            variant="contained"
            color="primary"
          >
            목록
          </Button>
        </div>
        <div className="col-lg-9"></div>
        <div className="col-lg-1">
          <Button
            style={{
              backgroundColor: "#5376FF",
              width: "100px",
              height: "auto"
            }}
            variant="contained"
            color="primary"
          >
            Burn NFT
          </Button>
        </div>
        <div className="col-lg-10"></div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAutoClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="d-flex justify-content-center mt-3"
        >
          <strong>{"NFT소각 관리자 확인"}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <label style={{ color: "#000" }}> 관리자 아이디</label> <br />
            <input
              type="text"
              name="email"
              className="text-fields"
              placeholder="admin03"
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> 비밀번호</label> <br />
            <input
              type="text"
              className="text-fields"
              placeholder="관리자 비밀번호를 입력해주세요."
              style={{ width: "400px" }}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5">
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#076D42",
              color: "#fff",
              width: "150px",
              height: "auto"
            }}
          >
            거래 중지
          </Button>
          <Button
            onClick={handleAutoClose}
            style={{
              backgroundColor: "#0500FF",
              color: "#fff",
              width: "150px",
              height: "auto"
            }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
