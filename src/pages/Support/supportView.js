import React, { useState, useEffect } from "react";
import clsx from 'clsx';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useHistory, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { FormControl } from '@material-ui/core';
//import avatar from "assets/img/faces/marc.jpg";

import { getSupportId } from '../../actions/users';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

// toaster config
toast.configure();
let toasterOption = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}


const useStyles = makeStyles(styles);



export default function UserProfile() {
  const classes = useStyles();
  const history = useHistory();
  const [ticket, setUser] = useState();
  //   const [reply, setReply] = useState();

  const { id } = useParams();

  const getUserData = async () => {
    var test = await getSupportId(id);
    console.log('fdfdf', test.userValue);
    setUser(test.userValue);
  }


  useEffect(() => {
    getUserData();
  }, [])


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>View Ticket</h4>
              <p className={classes.cardCategoryWhite}>  </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="ticket_details_panel">
                    <div className="user_img">
                      {/* <img src={require("../../assets/img/tim_80x80.png")} alt="User"/> */}
                    </div>
                    <div className="ticket_details_div">
                      <h2>{ticket && ticket.subject}</h2>
                      <p className="mb-1">Created on {ticket && ticket.created_date}  |  Tickect ID: {ticket && ticket.ticketno}</p>
                      <p className="mb-0 ticket_status_div">Status:   {
                        ticket && ticket.closedstatus == 0 &&
                        <span className="text-danger"><b>Open</b></span>
                      }
                        {ticket && ticket.closedstatus == 1 &&
                          <span className="text-success"><b>Closed</b></span>
                        }</p>
                      <hr />
                      <p className="text-dark"><b>Hello Admin,</b></p>
                      <p>{ticket && ticket.description}.</p>
                    </div>
                  </div>

                  {ticket &&
                    ticket.reply.map((reply, i) => {

                      if (reply.replytype == "admin") {
                        return (<div className="ticket_details_panel mt-4">
                          <div className="user_img">
                            {/* <img src={require("../../assets/img/tim_80x80.png")} alt="User"/> */}
                          </div>
                          <div className="ticket_details_div">
                            <p className="mb-1">Admin reply on {reply.replydate}</p>
                            <hr />
                            <p className="text-dark"><b>Hello User,</b></p>
                            <p>{reply.message_query}</p>
                            <p className="mt-3 mb-2">Thanks,<br />{reply.replytype}</p>
                          </div>
                        </div>)
                      }
                      if (reply.replytype != "admin") {
                        return (<div className="ticket_details_panel mt-4">
                          <div className="user_img">
                            {/* <img src={require("../../assets/img/tim_80x80.png")} alt="User"/> */}
                          </div>
                          <div className="ticket_details_div">
                            <p className="mb-1">User reply on {reply.replydate}</p>
                            <hr />
                            <p className="text-dark"><b>Hello Admin,</b></p>
                            <p>{reply.message_query}</p>
                            <p className="mt-3 mb-2">Thanks,<br />{reply.replytype}</p>
                          </div>
                        </div>)
                      }


                    })

                  } {ticket && ticket.closedstatus == "0" &&
                    <div className="form-row auth_form ticket_msg">
                      <div className="form-group col-sm-12 col-md-12">
                        <div className="input-group">
                          {/* <div className="input-group-append">
                              <button className="btn dropdown_input" type="button"><AttachFile/></button>
                            </div> */}
                          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            {/* <OutlinedInput id="email" value={reply} onChange={onReply} aria-describedby="outlined-weight-helper-text"/> */}
                          </FormControl>
                          <div className="input-group-append">
                            {/* <button className="btn dropdown_input" onClick={sendReply}>Send</button> */}
                          </div>
                        </div>
                      </div>

                      <div className="input-group-append">
                        {/* <button className="btn dropdown_input" onClick={closeTicket}>Close Ticket</button> */}
                      </div>
                    </div>



                  }  {ticket && ticket.closedstatus == "1" &&

                    <div className="input-group-append">
                      <button className="btn dropdown_input">Ticket Closed by Admin</button>
                    </div>
                  }
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
