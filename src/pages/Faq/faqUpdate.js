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
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";

import 'react-phone-input-2/lib/style.css'

//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';

import { updateFaq, getFaqId } from '../../actions/users';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
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


const initialFormValue = {
  'question': "",
  'answer': "",

}

const useStyles = makeStyles(styles);

const customStyle = makeStyles(customInputStyle);

export default function UserProfile() {
  const customStyles = customStyle();

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const [userdet, setUser] = useState();
  // const [result, setFormValue] = useState({});
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const { faqId } = useParams();
  // function
  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { id, value } = e.target;
    
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    // console.log(name,'formData of forms');
    // setValidateError(formData)
  }

  const {
    question,
    answer
  } = formValue

  const handleFormSubmit = async (e) => {
    //console.log("saran");
    e.preventDefault();

    let reqData = {
      question,
      answer,
      faqId
    }
    console.log(reqData,'reqData');

    let { error } = await updateFaq(reqData);
    console.log(reqData,'fdff')
    
    //console.log(error);
    if (isEmpty(error)) {
      toast.success('Faq Details updated', toasterOption);
      history.push('/faq')
    } else {
      setValidateError(error);
    }
  }

  const getFaq = async () => {
    var { result } = await getFaqId(faqId);
    // console.log('test',test);
    console.log(result,'result')
    let formData = {};
     formData['question'] = result.question;
    formData['answer'] = result.answer;
    // console.log("----formdata", result.name)
    setFormValue(result)
  }

  useEffect(() => {
    //logout(history)
    getFaq();
  }, [])

  return (
    // formData.map(formData => ()
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Update FAQ</h4>
                {/* <p className={classes.cardCategoryWhite}>Create a new user</p> */}
              </CardHeader>
              <CardBody>
                <GridContainer>                 
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Question"
                      onChange={onChange}
                      id="question"
                      value={question}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                        validateError.question && <span className={classes.textDanger}>{validateError.question}</span>
                    }
                  </GridItem>
                
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput    
                      labelText="Answer"
                      onChange={onChange}
                      value={answer} 
                      id="answer"
                      name="answer"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5
                      }}
                    />
                    {
                        validateError.answer && <span className={classes.textDanger}>{validateError.answer}</span>
                    }
                  </GridItem>
                </GridContainer>
                <GridContainer>
                
                {/* <GridItem xs={12} sm={12} md={3}>
                  Name
                    <CustomInput
                      // labelText="Name"

                      id="name"
                      name="name"
                      defaultValue={"name"}
                      inputProps={{
                        value: formData.name,
                        onChange
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.name && <span className={classes.textDanger}>{validateError.name}</span>
                    }
                  </GridItem> */}
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Update</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>       
      </GridContainer>
    </div>
  );
}
