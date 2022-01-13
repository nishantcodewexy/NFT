import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import { FormControlLabel } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { getAllWords } from "actions/word.action";
import { deleteAWord } from "actions/word.action";
import { getAllUsers } from "actions/users";
import { stoppedChange } from "actions/nft.action";
import { addNewWord } from "actions/word.action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WorldFiltering() {
  const [open, setOpen] = React.useState(false);

  const [word, setWord] = React.useState();

  const [newWord, setNewWord] = React.useState({
    word: ""
  });

  const [change, setChange] = useState(false);

  const [stop, setStop] = useState({
    admin_id: localStorage.getItem("admin"),
    password: ""
  });

  const [adminId, setAdminId] = useState();

  const [message, setMessage] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAutoClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllWords().then((res) => {
      setWord(res);
    });
  }, [change]);

  const deleteaWord = (id) => {
    deleteAWord(id).then((res) => {
      alert(res.message);
      changeTheWord();
    });
  };

  const changeTheWord = () => {
    change == true ? setChange(false) : setChange(true);
  };

  const handleChangeStopped = (e) => {
    const { name, value } = e.target;
    let formData = { ...stop, ...{ [name]: value } };
    setStop(formData);
  };

  const addWord = () => {
    addNewWord(newWord);
    changeTheWord();
    handleAutoClose();
  };

  const changeToStop = () => {
    stoppedChange(stop, adminId)
      .then((res) => {
        res.error === true ? setMessage("Password is incorrect") : addWord();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...newWord, ...{ [name]: value } };
    setNewWord(formData);
  };

  return (
    <div className="mx-3 mx-md-5">
      <div style={{ fontWeight: "700", fontSize: "40px" }}>
        단어 필터링 추가하기
      </div>
      <div className="row mt-5">
        <div className="col-lg-6">
          <label style={{ color: "#000" }}> 특정 단어 차단</label> <br />
          <div
            className="px-3 py-3"
            style={{ border: "1px solid #000", borderRadius: "8px" }}
          >
            {word &&
              word.map((word) => (
                <div className="d-flex py-2">
                  <div
                    style={{
                      flex: "3",
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#000"
                    }}
                  >
                    {word.word}
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        deleteaWord(word._id);
                      }}
                      style={{
                        border: "2px solid #5376FF",
                        width: "100px",
                        height: "auto",
                        color: "#5376FF",
                        backgroundColor: "#fff"
                      }}
                      variant="contained"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6" style={{ textAlign: "right" }}>
          <Button
            onClick={handleClickOpen}
            style={{
              backgroundColor: "#5376FF",
              width: "100px",
              height: "auto"
            }}
            variant="contained"
            color="primary"
          >
            추가
          </Button>
        </div>
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
          <strong>{"특정 IP 발행 차단하기"}</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <label style={{ color: "#000" }}> 관리자 아이디</label> <br />
            <input
              type="text"
              name="admin_id"
              value={stop.admin_id}
              disabled
              className="text-fields"
              placeholder="admin03"
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> 비밀번호</label> <br />
            <input
              type="password"
              className="text-fields"
              placeholder="관리자 비밀번호를 입력해주세요."
              name="password"
              value={stop.password}
              onChange={handleChangeStopped}
              style={{ width: "400px" }}
            />
          </DialogContentText>
          <DialogContentText>
            <label style={{ color: "#000" }}> 추가 차단할 IP</label> <br />
            <input
              type="text"
              name="word"
              onChange={handleChange}
              value={newWord.word}
              className="text-fields"
              placeholder="차단할 IP를 입력해주세요."
              style={{ width: "400px" }}
            />
            {message && <p style={{ color: "red" }}>Password is incorrect</p>}
          </DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center mb-5">
          <Button
            onClick={changeToStop}
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
