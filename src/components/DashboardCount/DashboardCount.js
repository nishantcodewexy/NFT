// import package
import React, { useEffect, useState } from 'react';

// import material ui
import {
    Store,
    Accessibility
} from "@material-ui/icons";
import { Icon } from "@material-ui/core";

// import componet
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

// import action
import { getDashboardCount, getTradeCount } from '../../actions/dashboard'

const initialFormValue = {
    'userCount': 0,
    'withdrawCount': 0,
    'depositCount': 0,
    'tradeCount': 0,
}

const DashboardCount = (props) => {
    // props
    const { classes } = props;

    // state
    const [countData, setCountData] = useState(initialFormValue)
    const [tradeCount, setTradeCount] = useState(0)

    // function
    const fetchData = async () => {
        const { status, loading, error, result } = await getDashboardCount()
        if (status == 'success') {
            setCountData({ ...countData, ...result })
        }
    }

    const fetchTradeCnt = async () => {
        const { status, loading, error, result } = await getTradeCount()
        if (status == 'success') {
            setTradeCount(result.tradeCount)
            // setCountData({ ...countData, ...result })
        }
    }

    useEffect(() => {
        fetchData()
        fetchTradeCnt()
    }, [])
    return (
        <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                            <Icon>content_copy</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory}>User</p>
                        <h3 className={classes.cardTitle}>
                            {countData.userCount}
                        </h3>
                    </CardHeader>
                    <CardFooter stats></CardFooter>
                </Card>
            </GridItem>
            {/* <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Store />
                        </CardIcon>
                        <p className={classes.cardCategory}>WithDraw</p>
                        <h3 className={classes.cardTitle}>
                            {countData.withdrawCount}
                        </h3>
                    </CardHeader>
                    <CardFooter stats></CardFooter>
                </Card>
            </GridItem> */}
            {/* <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            <Icon>info_outline</Icon>
                        </CardIcon>
                        <p className={classes.cardCategory}>Deposit</p>
                        <h3 className={classes.cardTitle}>
                            {countData.depositCount}
                        </h3>
                    </CardHeader>
                    <CardFooter stats></CardFooter>
                </Card>
            </GridItem> */}
            {/* <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <Accessibility />
                        </CardIcon>
                        <p className={classes.cardCategory}>Trade</p>
                        <h3 className={classes.cardTitle}>
                            {tradeCount}
                        </h3>
                    </CardHeader>
                    <CardFooter stats></CardFooter>
                </Card>
            </GridItem> */}
        </GridContainer>
    )
}

export default DashboardCount;