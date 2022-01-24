

import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastAlert } from "../../lib/toastAlert";
import Web3 from 'web3';
import config from '../../actions/config';
import ABI from '../../ABI/ABI.json';


import { getsettings, updateSetting } from "../../actions/community";

var smartContract = config.smartContract;
var network = config.network;

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
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
};

const initialFormValue = {
  royality: "",
  service: "",
  USD: "",
  bidfee:"",
};

const useStyles = makeStyles(styles);

export default function Categoryadd(props) {
  const classes = useStyles();
  const history = useHistory();
  const [toched, setToched] = useState({});

  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});
  const [owneraddr, setowneraddr] = useState("");
  const [royalper, setroyalper] = useState(0);
  const [servicefee, setservicefee] = useState(0);

  const { userId } = useParams();
  const onChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } };
    setFormValue(formData);
    console.log(formValue);
  };

  const onChange1 = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setroyalper(value);
  };

   const onChange2 = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setservicefee(value);
  };

  const { royality, service, USD ,bidfee} = formValue;
  const fetchsettings = async () => {
    try {
      const { status, loading, error, result } = await getsettings();


      console.log("getsettingsgetsettings", result)

      let data = {
        //'royality': result.data.royalityfee,
       // 'service': result.data.servicefee,
        'USD': result.data.USD,
        'bidfee':result.data.bidfee

      }
      setFormValue(data)

    } catch (err) { }
  }


  useEffect(() => {
    fetchsettings();
    setTimeout(function(){
      getRoyalty();
    },500)
    
  }, [])


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);

    let reqData = {
      royality,
      servicefee,
      USD,
      bidfee
    };
    
    var data = await updateSetting(reqData);
    if (data.result && data.result.message && data.result.message._id) {
      toastAlert("success", "Successfully updated", "category");
    } else {
      toastAlert("error", data.error.message, "category");
    }
  };

  const changeserviceFee = async (e) => {
    var feeVal = parseFloat(servicefee)*10;
    if(feeVal && feeVal > 0){
      if(window.web3.currentProvider.networkVersion == network){

        var web3 = new Web3(window.ethereum);
        
        await window.ethereum.enable();
        var web3  = new Web3(window.web3.currentProvider);
        var nftContract = new web3.eth.Contract(ABI,smartContract);
        var currAddr = await web3.eth.getAccounts();
        console.log(currAddr[0],owneraddr)

         if(currAddr[0]==owneraddr){
          var result = await nftContract.methods.serviceFunction(
            feeVal
          ).send({
            from: currAddr[0]
          });
  
          toastAlert("success", "Successfully changed", "fee");   
         }else{
          toastAlert("error", "Please login "+owneraddr, "fee");
       }
       
    }else{
      toastAlert("error", "Please choose binance network", "fee");
    }   
    }else{
      toastAlert("error", "Please enter the percentage", "fee");
    }
  }


  const changeFee = async (e) => {

    var feeVal = parseFloat(royalper);
    if(feeVal && feeVal > 0){
      if(window.web3.currentProvider.networkVersion == network){

        var web3 = new Web3(window.ethereum);
        
        await window.ethereum.enable();
        var web3  = new Web3(window.web3.currentProvider);
        var nftContract = new web3.eth.Contract(ABI,smartContract);
        var currAddr = await web3.eth.getAccounts();
        console.log(currAddr[0],owneraddr)
         if(currAddr[0]==owneraddr){
          var result = await nftContract.methods.changeroyaltypercentage(
            feeVal
          ).send({
            from: currAddr[0]
          });
  
          toastAlert("success", "Successfully changed", "fee");   
       }else{
          toastAlert("error", "Please login "+owneraddr, "fee");
       }
       
    }else{
      toastAlert("error", "Please choose binance network", "fee");
    }   
    }else{
      toastAlert("error", "Please enter the percentage", "fee");
    }

  }

  async function getRoyalty(){
    
    if(window.web3.currentProvider.networkVersion == network){

      var web3 = new Web3(window.ethereum);
      
      await window.ethereum.enable();
      var web3  = new Web3(window.web3.currentProvider);
      var nftContract = new web3.eth.Contract(ABI,smartContract);
      var currAddr = await web3.eth.getAccounts();

      var ownerWallet = await nftContract.methods.owner().call();
      var totalroyalty = await nftContract.methods.totalroyalty().call();
      
      setroyalper(totalroyalty);
      setowneraddr(ownerWallet);
       
             var fee = await nftContract.methods.serviceValue().call();
             console.log('feefeefee',fee)
             setservicefee(fee/10);


  }

  }

  let formdata = {};

  return (
    <div>
      <div id="page-content-wrapper">
        <div className="container-fluid">

          <h3 className="mt-2 text-secondary">Settings</h3>

          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Update Settings</h4>
                  </CardHeader>
                 {/* <CardBody>
                     <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Royality fee"
                          onChange={onChange}
                          value={royality}
                          id="royality"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>


                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="USD for DETH"
                          onChange={onChange}
                          value={USD}
                          id="USD"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                      <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Bid Fee"
                          onChange={onChange}
                          value={bidfee}
                          id="bidfee"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                  </CardBody>
                  <CardFooter>
                    <Button color="primary" type="submit">Update</Button>
                  </CardFooter>*/}
                </form>
                <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Royality Percentage"
                          onChange={onChange1}
                          value={royalper}
                          id="royalper"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                  </CardBody>
                  <CardFooter>
                    <Button type="button" onClick={changeFee} color="primary" type="submit">Change fee</Button>
                  </CardFooter>

               <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Service fee"
                          onChange={onChange2}
                          value={servicefee}
                          id="servicefee"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>

                  </CardBody>
                  <CardFooter>
                    <Button type="button" onClick={changeserviceFee} color="primary" type="submit">Change ServiceFee</Button>
                  </CardFooter>
              </Card>


            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
