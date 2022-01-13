import {
    dangerColor,
    successColor,
    grayColor,
    primaryColor,
    defaultFont
} from "./material-dashboard-react";
import { createMuiTheme } from "@material-ui/core";

const globalStyle = createMuiTheme({
    disabled: {
        "&:before": {
            backgroundColor: "transparent !important"
        }
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: grayColor[4] + " !important",
            borderWidth: "1px !important"
        },
        "&:after": {
            borderColor: primaryColor[0]
        }
    },
    labelRoot: {
        ...defaultFont,
        color: grayColor[3] + " !important",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        letterSpacing: "unset"
    },
    formControl: {
        paddingBottom: "10px",
        margin: "27px 0 0 0",
        position: "relative",
        verticalAlign: "unset"
    },
    labelRoot: {
        ...defaultFont,
        color: grayColor[3] + " !important",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "1.42857",
        letterSpacing: "unset"
    },
    labelRootError: {
        color: dangerColor[0]
    },
    labelRootSuccess: {
        color: successColor[0]
    }
});

export default globalStyle;