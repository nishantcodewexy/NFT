import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";

// import action
import { addSupportCategory } from '../../actions/support';

// import lib
import isEmpty from '../../lib/isEmpty';
import { addCategoryValid } from './validation';
import { toastAlert } from "../../lib/toastAlert"

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

const initialFormValue = {
  'categoryName': ''
}

const useStyles = makeStyles(styles);

const SupportCategoryAdd = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [toched, setToched] = useState({});
  const [validateError, setValidateError] = useState({});
  const [loader, setLoader] = useState(false)

  const {
    categoryName,
  } = formValue

  // function
  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
    setValidateError(addCategoryValid(formData))
  }

  const handleBlur = (e) => {
    const { name } = e.target;
    setToched({ ...toched, ...{ [name]: true } })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)

    try {
      let reqData = {
        categoryName,
      }
      let { status, loading, error, result } = await addSupportCategory(reqData);
      setLoader(loading)
      if (status == 'success') {
        toastAlert('success', result.messages, 'addSupportCategory')
        history.push('/support/category')
      } else {
        setValidateError(error);
      }
    } catch (err) { }
  }

  useEffect(() => {
    setValidateError(addCategoryValid(formValue))
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add Support Category</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Category Name"
                      onChange={onChange}
                      onBlur={handleBlur}
                      value={categoryName}
                      name="categoryName"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      toched.categoryName && validateError.categoryName && <p className="error-message">{validateError.categoryName}</p>
                    }
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  type="submit"
                  disabled={!isEmpty(validateError) || loader}
                >
                  ADD
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default SupportCategoryAdd;