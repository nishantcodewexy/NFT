import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto"
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    color: "#000",
    backgroundColor: "#C4C4C4"
  },
  list: {
    width: 400,
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },

  list2: {
    width: 800,
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({ menu, id }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [checked2, setChecked2] = React.useState([]);
  const [checked3, setChecked3] = React.useState([]);
  const [checked4, setChecked4] = React.useState([]);
  const [checked5, setChecked5] = React.useState([]);
  const [checked6, setChecked6] = React.useState([]);
  const [left, setLeft] = React.useState(["관리자 목록"]);
  const [left2, setLeft2] = React.useState([
    "NFT 목록",
    "NFT 거래내역",
    "NFT 카테고리 목록",
    "NFT 설정"
  ]);
  const [left3, setLeft3] = React.useState([
    "인기 크리에이터 목록",
    "메인페이지 노출 상품 목록",
    "단어 필터링 목록"
  ]);
  const [left4, setLeft4] = React.useState([]);
  const [left5, setLeft5] = React.useState([]);
  const [left6, setLeft6] = React.useState([]);

  const [right, setRight] = React.useState([]);
  const [right2, setRight2] = React.useState([]);
  const [right3, setRight3] = React.useState([]);
  const [right4, setRight4] = React.useState(["member list", "Avatar List"]);
  const [right5, setRight5] = React.useState([
    "Notice list",
    "Frequently Asked Questions List",
    "One-on-one inquiry list"
  ]);
  const [right6, setRight6] = React.useState([
    "Manage Terms of Service",
    "Privacy Policy Management"
  ]);

  const leftChecked = intersection(checked, left);
  const leftChecked2 = intersection(checked2, left2);
  const leftChecked3 = intersection(checked3, left3);
  const leftChecked4 = intersection(checked4, left4);
  const leftChecked5 = intersection(checked5, left5);
  const leftChecked6 = intersection(checked6, left6);
  const rightChecked = intersection(checked, right);
  const rightChecked2 = intersection(checked2, right2);
  const rightChecked3 = intersection(checked3, right3);
  const rightChecked4 = intersection(checked4, right4);
  const rightChecked5 = intersection(checked5, right5);
  const rightChecked6 = intersection(checked6, right6);

  const [menuList, setMenuList] = useState({
    admin_list: false,
    category_list: false,
    nft_list: false,
    nft_settings: false,
    transaction_history: false,
    popular_list: false,
    product_list: false,
    filtering_list: false
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggle2 = (value) => () => {
    const currentIndex = checked2.indexOf(value);
    const newChecked2 = [...checked2];

    if (currentIndex === -1) {
      newChecked2.push(value);
    } else {
      newChecked2.splice(currentIndex, 1);
    }

    setChecked2(newChecked2);
  };

  const handleToggle3 = (value) => () => {
    const currentIndex = checked3.indexOf(value);
    const newChecked = [...checked3];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked3(newChecked);
  };

  const handleToggle4 = (value) => () => {
    const currentIndex = checked4.indexOf(value);
    const newChecked = [...checked4];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked4(newChecked);
  };

  const handleToggle5 = (value) => () => {
    const currentIndex = checked5.indexOf(value);
    const newChecked = [...checked5];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked5(newChecked);
  };

  const handleToggle6 = (value) => () => {
    const currentIndex = checked6.indexOf(value);
    const newChecked = [...checked6];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked6(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;
  // const numberOfChecked2 = (items2) => intersection(checked, items2).length;
  // const numberOfChecked3 = (items3) => intersection(checked, items3).length;

  // const handleToggleAll = (items) => () => {
  //   if (numberOfChecked(items) === items.length) {
  //     setChecked(not(checked, items));
  //   } else {
  //     setChecked(union(checked, items));
  //   }
  // };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setRight2(right2.concat(leftChecked2));
    setRight3(right3.concat(leftChecked3));
    setRight4(right4.concat(leftChecked4));
    setRight5(right5.concat(leftChecked5));
    setRight6(right6.concat(leftChecked6));
    setLeft(not(left, leftChecked));
    setLeft2(not(left2, leftChecked2));
    setLeft3(not(left3, leftChecked3));
    setLeft4(not(left4, leftChecked4));
    setLeft5(not(left5, leftChecked5));
    setLeft6(not(left6, leftChecked6));
    setChecked(not(checked, leftChecked));
    setChecked2(not(checked2, leftChecked2));
    setChecked3(not(checked3, leftChecked3));
    setChecked4(not(checked4, leftChecked4));
    setChecked5(not(checked5, leftChecked5));
    setChecked6(not(checked6, leftChecked6));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setLeft2(left2.concat(rightChecked2));
    setLeft3(left3.concat(rightChecked3));
    setLeft4(left4.concat(rightChecked4));
    setLeft5(left5.concat(rightChecked5));
    setLeft6(left6.concat(rightChecked6));
    setRight(not(right, rightChecked));
    setRight2(not(right2, rightChecked2));
    setRight3(not(right3, rightChecked3));
    setRight4(not(right4, rightChecked4));
    setRight5(not(right5, rightChecked5));
    setRight6(not(right6, rightChecked6));
    setChecked(not(checked, rightChecked));
    setChecked2(not(checked2, rightChecked2));
    setChecked3(not(checked3, rightChecked3));
    setChecked4(not(checked4, rightChecked4));
    setChecked5(not(checked5, rightChecked5));
    setChecked6(not(checked6, rightChecked6));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formData = { ...menuList, ...{ [name]: value } };
    setMenuList(formData);
  };

  const handleClick = () => {
    console.log(id, menuList);
    /*editAdminMenu(menuList, id).then((res) => {
      alert("Success");
    });
    */
  };

  const customList = (title, items, items2, items3, items4, items5, items6) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        //subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      {left.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          관리자 관리 
        </h3>
      )}
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {left2.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          NFT 관리
        </h3>
      )}
      <List className={classes.list} dense component="div" role="list">
        {items2.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle2(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked2.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {left3.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          NFT 관리
        </h3>
      )}
      <List className={classes.list} dense component="div" role="list">
        {items3.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle3(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked3.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {left4.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          Member Management
        </h3>
      )}
      <List className={classes.list} dense component="div" role="list">
        {items4.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle4(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked4.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {left5.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          Service Center Management
        </h3>
      )}
      <List className={classes.list} dense component="div" role="list">
        {items5.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle5(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked5.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {left6.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          Manage terms and policies
        </h3>
      )}
      <List className={classes.list} dense component="div" role="list">
        {items6.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle6(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked6.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  const customList2 = (
    title,
    items,
    items2,
    items3,
    items4,
    items5,
    items6
  ) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        //subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      {right.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          관리자 관리
        </h3>
      )}
      <List className={classes.list2} dense component="div" role="list">
        {items.map((value) => {
          console.log("New munus " + menuList.admin_list);
          const labelId = `transfer-list-all-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
              <div
                className="my-2 d-flex radio_wrap"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "0.5% 2%",
                  flex: "4",
                }}
              >
                <RadioGroup>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="읽기"
                      onChange={() => {
                        setMenuList({ ...menuList, ...{ admin_list: false } });
                      }}
                      control={<Radio color="primary" />}
                      label="읽기"
                    />
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="쓰기"
                      onChange={() => {
                        setMenuList({ ...menuList, ...{ admin_list: true } });
                      }}
                      control={<Radio color="primary" />}
                      label="쓰기"
                    />
                  </div>
                </RadioGroup>
                <div style={{ flex: "2", textAlign: "right" }}>
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#5376FF",
                      width: "100px",
                      height: "auto"
                    }}
                    variant="contained"
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {right2.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          NFT 관리
        </h3>
      )}
      <List className={classes.list2} dense component="div" role="list">
        {items2.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle2(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked2.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
              <div
                className="my-2 d-flex"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "0.5% 2%",
                  flex: "4"
                }}
              >
                {value === "NFT 목록" ? (
                  <RadioGroup>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="읽기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ category_list: false }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="읽기"
                      />
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="쓰기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ category_list: true }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="쓰기"
                      />
                    </div>
                  </RadioGroup>
                ) : value === "NFT 거래내역" ? (
                  <RadioGroup>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="읽기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ nft_list: false }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="읽기"
                      />
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="쓰기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ nft_list: true }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="쓰기"
                      />
                    </div>
                  </RadioGroup>
                ) : value === "NFT 거래내역" ? (
                  <RadioGroup>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="읽기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ nft_settings: false }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="읽기"
                      />
                      {console.log(value)}
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="쓰기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ nft_settings: true }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="쓰기"
                      />
                    </div>
                  </RadioGroup>
                ) : (
                  <RadioGroup>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="읽기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ transaction_history: false }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="읽기"
                      />
                      {console.log(value)}
                      <FormControlLabel
                        style={{ color: "#000" }}
                        value="쓰기"
                        onChange={() => {
                          setMenuList({
                            ...menuList,
                            ...{ transaction_history: true }
                          });
                        }}
                        control={<Radio color="primary" />}
                        label="쓰기"
                      />
                    </div>
                  </RadioGroup>
                )}
                <div style={{ flex: "2", textAlign: "right" }}>
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#5376FF",
                      width: "100px",
                      height: "auto"
                    }}
                    variant="contained"
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {right3.length > 0 && (
        <h3 className="ml-5" style={{ fontWeight: "500" }}>
          NFT 관리
        </h3>
      )}
      <List className={classes.list2} dense component="div" role="list">
        {items3.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle3(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked3.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
              <div
                className="my-2 d-flex"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "0.5% 2%",
                  flex: "4"
                }}
              >
                <RadioGroup>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="읽기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: false }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="읽기"
                    />
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="쓰기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: true }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="쓰기"
                    />
                  </div>
                </RadioGroup>

                <div style={{ flex: "2", textAlign: "right" }}>
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#5376FF",
                      width: "100px",
                      height: "auto"
                    }}
                    variant="contained"
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {right4.length > 0 && (
        <h3 className="ml-2 ml-md-5" style={{ fontWeight: "500" }}>
          Member Management
        </h3>
      )}
      <List className={`${classes.list2}`} dense component="div" role="list">
        {items4.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle4(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked4.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
              <div
                className="my-2 d-flex"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "0.5% 2%",
                  flex: "4"
                }}
              >
                <RadioGroup>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="읽기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: false }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="읽기"
                    />
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="쓰기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: true }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="쓰기"
                    />
                  </div>
                </RadioGroup>

                <div style={{ flex: "2", textAlign: "right" }}>
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#5376FF",
                      width: "100px",
                      height: "auto"
                    }}
                    variant="contained"
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {right4.length > 0 && (
        <h3 className="ml-2 ml-md-5" style={{ fontWeight: "500" }}>
          Service Center Management
        </h3>
      )}
      <List className={classes.list2} dense component="div" role="list">
        {items5.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle5(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked5.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
              <div
                className="my-2 d-flex"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "0.5% 2%",
                  flex: "4"
                }}
              >
                <RadioGroup>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="읽기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: false }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="읽기"
                    />
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="쓰기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: true }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="쓰기"
                    />
                  </div>
                </RadioGroup>

                <div style={{ flex: "2", textAlign: "right" }}>
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#5376FF",
                      width: "100px",
                      height: "auto"
                    }}
                    variant="contained"
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
      {right6.length > 0 && (
        <h3 className="ml-2 ml-md-5" style={{ fontWeight: "500" }}>
          Manage terms and policies
        </h3>
      )}
      <List className={classes.list2} dense component="div" role="list">
        {items6.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle6(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked6.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <div
                className="my-2"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "2%",
                  flex: "4"
                }}
              >
                <ListItemText id={labelId} primary={`${value}`} />
              </div>
              <div
                className="my-2 d-flex"
                style={{
                  border: "1px solid #C4C4C4",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  padding: "0.5% 2%",
                  flex: "4"
                }}
              >
                <RadioGroup>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="읽기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: false }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="읽기"
                    />
                    <FormControlLabel
                      style={{ color: "#000" }}
                      value="쓰기"
                      onChange={() => {
                        setMenuList({
                          ...menuList,
                          ...{ popular_list: true }
                        });
                      }}
                      control={<Radio color="primary" />}
                      label="쓰기"
                    />
                  </div>
                </RadioGroup>

                <div style={{ flex: "2", textAlign: "right" }}>
                  <Button
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#5376FF",
                      width: "100px",
                      height: "auto"
                    }}
                    variant="contained"
                    color="primary"
                  >
                    저장
                  </Button>
                </div>
              </div>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      className={`${classes.root} admin_grid`}
    >
      <Grid item>
        {customList("비권한 메뉴", left, left2, left3, left4, left5, left6)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={
              leftChecked.length === 0 &&
              leftChecked2.length === 0 &&
              leftChecked3.length === 0 &&
              leftChecked4.length === 0 &&
              leftChecked5.length === 0 &&
              leftChecked6.length === 0
            }
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={
              rightChecked.length === 0 &&
              rightChecked2.length === 0 &&
              rightChecked3.length === 0 &&
              rightChecked4.length === 0 &&
              rightChecked5.length === 0 &&
              rightChecked6.length === 0
            }
            aria-label="move selected left"
          >
            &lt;
          </Button>
          {console.log(rightChecked.length)}
        </Grid>
      </Grid>
      <Grid item>
        {customList2(
          "Permissions menu",
          right,
          right2,
          right3,
          right4,
          right5,
          right6
        )}
      </Grid>
    </Grid>
  );
}
/**
 * "인기 크리에이터 목록",
    "메인페이지 노출 상품 목록",
    "단어 필터링 목록"
 */
