import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

// import components
import Admin from "./components/layouts/Admin";
import ConditionRoute from "./components/Route/ConditionRoute";
import UsersList from "./pages/UsersList/UsersList";
import Usersedit from "./pages/UsersList/useredit";
// import LoginHistory from "./pages/LoginHistory/loginHistory";

// import EditProfile from "./pages/UserProfile/EditProfile";
// import securityType from "./pages/Settings/securityType";
// import EmailTemplate from "./pages/Emailtemplate/emailList";
// import EmailTemplateUpdate from "./pages/Emailtemplate/updateTemplate";
// import questiondetail from "./pages/Query/Questiondetailview";
// import reportdetail from "./pages/Query/Reportdetailview";
// import tokenreportdetail from "./pages/Query/Tokenreportdetailview";
// import Question from "./pages/Query/Question";
// import Report from "./pages/Query/Report";
// import Tokenreport from "./pages/Query/Tokenreport";
// import Replyemail from "./pages/Query/replymail";
import AdminAdd from "./pages/Admin/AdminAdd";
import AdminEdit from "./pages/Admin/AdminEdit";
// import {
//   CurrencyList,
//   CurrencyAdd,
//   CurrencyEdit
// } from "./pages/CurrencyManagement";
// import {
//   SupportCategoryList,
//   SupportCategoryAdd,
//   SupportCategoryEdit,
//   TicketList,
//   TicketChat
// } from "./pages/Support";
// import { TradeHistory, WithdrawList, FundTansferHistory } from "./pages/Report";
// import { SportPairList, SportPairAdd, SportPairEdit } from "./pages/TradePairs";
// import {
//   CoinWithdrawRequest,
//   DepositRequest,
//   WithdrawRequest
// } from "./pages/Wallet";
// import { IdProof, SelfieProof, AddressProof } from "./pages/DocVerification";
// import { FeeSetting, ReferralHistory } from "./pages/Referral";
// import supportView from "./pages/Support/supportView";
// import burn from "./pages/burn/BurnList";
// import burnview from "./pages/burn/Burnview";

// import FaqAdd from "./pages/Faq/faqAdd";
// import FaqList from "./pages/Faq/faqList";
// import FaqUpdate from "./pages/Faq/faqUpdate";

// import pages
import LoginPage from "./pages/LoginPage/Login";
import ForgotPage from "./pages/ForgotPage/ForgotPassword";
import changePassword from "./pages/ForgotPage/changePassword";
import UserProfile from "./pages/UserProfile/UserProfile";
import CategoryList from "./pages/Category/CategoryList";
import UserManagment from "./pages/UsersList/UserManagement";
import AvatarList from "./pages/Avatar/AvatarList";
import AvatarRegistration from "./pages/Avatar/AvatarRegistration";
import AvatarEdit from "./pages/Avatar/AvatarEdit";

import NFTManagement from "./pages/NFTManagement/NFTManagement";
import NFTModification from "./pages/NFTManagement/NFTModification";
import NFTCategoryList from "./pages/NFTManagement/NFTCategoryList";
import NFTCategoryRegistration from "./pages/NFTManagement/NFTCategoryRegistration";
import NFTCategoryEdit from "./pages/NFTManagement/NFTCategoryEdit";
import NFTSettings from "./pages/NFTManagement/NFTSettings";
import NFTTransaction from "./pages/NFTManagement/NFTTransaction";

import NoticeList from "./pages/Services/NoticeList";
import RegistrationOfNotice from "./pages/Services/RegistrationOfNotice";
import EditNotice from "./pages/Services/EditNotice";

import FrequentsList from "./pages/Services/FrequenceQuestionList";
import RegistrationOfFrequents from "./pages/Services/RegisterFrequance";
import EditFrequents from "./pages/Services/EditFrequance";

import QuestionList from "./pages/Services/QuestionList";

import TCManagement from "./pages/TermsAndCondition/TCManagement";
import TCManagementPersonal from "./pages/TermsAndCondition/TCManagementPersonal";

import PopularList from "./pages/SiteManagement/PopularList";
import ListExpose from "./pages/SiteManagement/ListExpose";
import WorldFiltering from "./pages/SiteManagement/WorldFiltering";
import MyProfile from "./pages/Profile/MyProfile";

import ServiceCenterManagement from "./pages/Services/ServiceCenterManagement";

import AdminList from "./pages/Admin/AdminList";

import Policy from "./pages/Policy/Policy";

// //Bid
// import Bidpage from "./pages/Bids/Bids";

// //Token
// import TokenList from "./pages/Token/Tokenlist";
// import TokenView from "./pages/Token/Tokenview";
// // community
// import CommunitycategoryList from "./community/Category/CategoryList";
// import CommunitycategoryEdit from "./community/Category/categoryedit";
// import Communitycategoryadd from "./community/Category/categoryadd";

// import CommunityUserList from "./community/Category/CommunityUserList";

// // prohibited pages
// import Prohibited from "./pages/Prohibited/prohibitedlist";
// import ProhibitedAdd from "./pages/Prohibited/prohibitedadd";
// import ProhibitedEdit from "./pages/Prohibited/prohibitededit";
// import Noties from "./pages/noties/notieslist";
// import NotiesAdd from "./pages/noties/notiesadd";
// import NotiesEdit from "./pages/noties/notiesedit";
// //cms pagess
// import CmsList from "./pages/Cms/Cmslist";
// import Cmsauction from "./pages/Cms/Cmsauction";
// import AddCMs from "./pages/Cms/Cmsadd";
// import EditCMs from "./pages/Cms/cmsedit";

// import Cms from "./pages/cmstermspolicy/cms";

// import CmsEdit from "./pages/cmstermspolicy/cmsedit";
// // End community

import verificationlist from "./pages/request/verificationlist";
import store from "./store";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import LoginHistory from "../deepliquidity_exchange_server/modals/loginHistory";

import globalStyle from "./style/global.style";

// import action

const history = createBrowserHistory();

const App = () => {
  // const { isAuth } = store.getState().currentUser;

  return (
    <Provider store={store}>
      <ThemeProvider theme={globalStyle}>
        <ToastContainer />
        {/* <Router history={history} basename={process.env.REACT_APP_BASENAME || "/"}> */}
        <Router history={history}>
          <Switch>
            {/* Auth Route */}
            <ConditionRoute
              exact
              path="/"
              component={LoginPage}
              type={"auth"}
            />
            <ConditionRoute
              path="/forgot"
              component={ForgotPage}
              type={"auth"}
            />
            <ConditionRoute
              path="/changepassword/:authToken"
              component={changePassword}
              type={"auth"}
            />

            {/* <ConditionRoute path="/changepassword" component={changePassword} type={"public"} /> */}

            {/* Auth Route */}

            {/* Private Route 
                        <ConditionRoute path="/dashboard" component={Dashboard} layout={Admin} type={"private"} store={store} />
                        */}
            {/* Admin */}
            <ConditionRoute
              exact
              path="/categorylist"
              component={CategoryList}
              layout={Admin}
            />
            <ConditionRoute
              exact
              path="/verificationlist"
              component={verificationlist}
              layout={Admin}
            />
            {/*  
                        <ConditionRoute exact path="/addcategory" component={categoryadd} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/categoryedit/:userId" component={categoryEdit} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/list" component={AdminList} layout={Admin} type={"private"} />
                        
                       {// <ConditionRoute exact path="/edit/:userId" component={AdminEdit} layout={Admin} type={"private"} />
                       }

                        <ConditionRoute exact path="/edit" component={AdminEdit} layout={Admin} />

                        <ConditionRoute exact path="/setting" component={SettingList} layout={Admin} type={"private"} />

 Token  

<ConditionRoute exact path="/TokenList" component={TokenList} layout={Admin} type={"private"} />
<ConditionRoute exact path="/TokenView/:userId" component={TokenView} layout={Admin} type={"private"} />



 Biddd 
                        <ConditionRoute exact path="/bidlist" component={Bidpage} layout={Admin} type={"private"} />

 Cms 
                        <ConditionRoute exact path="/burn" component={burn} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/viewdetails/:tokenId" component={burnview} layout={Admin} type={"private"} />

<ConditionRoute exact path="/CmsList" component={CmsList} layout={Admin} type={"private"} />
<ConditionRoute exact path="/Addcms" component={AddCMs} layout={Admin} type={"private"} />
<ConditionRoute exact path="/Editcms/:currencyId" component={EditCMs} layout={Admin} type={"private"} />
<ConditionRoute path="/Cmsauction" component={Cmsauction} layout={Admin} type={"private"} />

<ConditionRoute path="/cms" component={Cms} layout={Admin} type={"private"} />
<ConditionRoute path="/cmsedit/:cmsId" component={CmsEdit} layout={Admin} type={"private"} />

                         Admin */}

            <ConditionRoute
              path="/user"
              component={UserProfile}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/userList"
              component={UsersList}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/useredit/:userId"
              component={Usersedit}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/user-managment"
              component={UserManagment}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/avatar-list"
              component={AvatarList}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/avatar-register"
              component={AvatarRegistration}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/avatar-edit/:id"
              component={AvatarEdit}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/service-center-management"
              component={ServiceCenterManagement}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/admin-list"
              component={AdminList}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              exact
              path="/add"
              component={AdminAdd}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              exact
              path="/edit/:id"
              component={AdminEdit}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/nft-management"
              component={NFTManagement}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/nft-modification/:id"
              component={NFTModification}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/nft-categories"
              component={NFTCategoryList}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/nft-category-reg"
              component={NFTCategoryRegistration}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/nft-category-edit/:id"
              component={NFTCategoryEdit}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/nft-settings"
              component={NFTSettings}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/nft-transaction"
              component={NFTTransaction}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/notice-list"
              component={NoticeList}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/notice-register"
              component={RegistrationOfNotice}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/notice-edit/:id"
              component={EditNotice}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/frequent-list"
              component={FrequentsList}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/frequent-register"
              component={RegistrationOfFrequents}
              layout={Admin}
              type={"private"}
            />
            <ConditionRoute
              path="/frequent-edit/:id"
              component={EditFrequents}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/question-list"
              component={QuestionList}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/service-terms"
              component={TCManagement}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/personal-terms"
              component={TCManagementPersonal}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/popular"
              component={PopularList}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/expose"
              component={ListExpose}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/world-filter"
              component={WorldFiltering}
              layout={Admin}
              type={"private"}
            />

            <ConditionRoute
              path="/profile"
              component={MyProfile}
              layout={Admin}
            />

            <ConditionRoute
              path="/policy"
              component={Policy}
              layout={Admin}
              type={"private"}
            />

            {/*    
                        <ConditionRoute path="/securityType" component={securityType} layout={Admin} type={"private"} />
                        
                        <ConditionRoute path="/referral/fees" component={FeeSetting} layout={Admin} type={"private"} />
                        <ConditionRoute path="/referral/history" component={ReferralHistory} layout={Admin} type={"private"} />
                        
                        <ConditionRoute path="/tokenreportdetail/:Id/:reportid" component={tokenreportdetail} layout={Admin} type={"private"} />
                        <ConditionRoute path="/reportdetail/:Id/:reportid" component={reportdetail} layout={Admin} type={"private"} />
                        <ConditionRoute path="/questiondetail/:Id" component={questiondetail} layout={Admin} type={"private"} />
                        <ConditionRoute path="/question" component={Question} layout={Admin} type={"private"} />
                        <ConditionRoute path="/report" component={Report} layout={Admin} type={"private"} />
                        <ConditionRoute path="/tokenreport" component={Tokenreport} layout={Admin} type={"private"} />
                        /* <ConditionRoute path="/support" component={support} layout={Admin} type={"private"} /> 
                        <ConditionRoute path="/supportView/:id" component={supportView} layout={Admin} type={"private"} />

                        <ConditionRoute path="/currency" component={CurrencyList} layout={Admin} type={"private"} />
                        <ConditionRoute path="/addCurrency" component={CurrencyAdd} layout={Admin} type={"private"} />
                        <ConditionRoute path="/updateCurrency/:currencyId" component={CurrencyEdit} layout={Admin} type={"private"} />

                        
                        <ConditionRoute path="/tradePairs" component={SportPairList} layout={Admin} type={"private"} />
                        <ConditionRoute path="/addPairs" component={SportPairAdd} layout={Admin} type={"private"} />
                        <ConditionRoute path="/updatePairs/:pairId" component={SportPairEdit} layout={Admin} type={"private"} />
                      
                        <ConditionRoute path="/prohibited" component={Prohibited} layout={Admin} type={"private"} />
                        <ConditionRoute path="/prohibitedadd" component={ProhibitedAdd} layout={Admin} type={"private"} />
                        <ConditionRoute path="/prohibitededit/:wordId" component={ProhibitedEdit} layout={Admin} type={"private"} />
                        
                        <ConditionRoute path="/noties" component={Noties} layout={Admin} type={"private"} />
                        <ConditionRoute path="/notiesadd" component={NotiesAdd} layout={Admin} type={"private"} />
                        <ConditionRoute path="/notiesedit/:wordId" component={NotiesEdit} layout={Admin} type={"private"} />

                        <ConditionRoute path="/withdraw-request/coin" component={CoinWithdrawRequest} layout={Admin} type={"private"} />
                        <ConditionRoute path="/deposit-request/fiat" component={DepositRequest} layout={Admin} type={"private"} />
                        <ConditionRoute path="/withdraw-request/fiat" component={WithdrawRequest} layout={Admin} type={"private"} />
                        {/* Wallet 

                        <ConditionRoute path="/addFaq" component={FaqAdd} layout={Admin} type={"private"} />
                        <ConditionRoute path="/Faq" component={FaqList} layout={Admin} type={"private"} />
                        <ConditionRoute path="/faqUpdate/:faqId" component={FaqUpdate} layout={Admin} type={"private"} />

                        <ConditionRoute path="/loginhistory" component={LoginHistory} layout={Admin} type={"private"} />

                        {/* Document Verification 
                        <ConditionRoute path="/idproof" component={IdProof} layout={Admin} type={"private"} />
                        <ConditionRoute path="/addressproof" component={AddressProof} layout={Admin} type={"private"} />
                        <ConditionRoute path="/selfieproof" component={SelfieProof} layout={Admin} type={"private"} />
                        {/* Document Verification 

                        <ConditionRoute path="/editprofile" component={EditProfile} layout={Admin} type={"private"} />
                        <ConditionRoute path="/emailTemplate" component={EmailTemplate} layout={Admin} type={"private"} />
                        <ConditionRoute path="/emailUpdatecms/:cmsId" component={EmailTemplateUpdate} layout={Admin} type={"private"} />

                        {/* Private Route 

                        {/* Suppot Ticket 
                        <ConditionRoute exact path="/support/category" component={SupportCategoryList} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/support/category/add" component={SupportCategoryAdd} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/support/category/edit/:categoryId" component={SupportCategoryEdit} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/replymail/:email" component={Replyemail} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/support/ticket" component={TicketList} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/support/ticket/chat/:ticketId" component={TicketChat} layout={Admin} type={"private"} />

                        {/* Suppot Ticket 

                        {/* Report 
                        <ConditionRoute path="/trade-history" component={TradeHistory} layout={Admin} type={"private"} />
                        <ConditionRoute path="/withdraw" component={WithdrawList} layout={Admin} type={"private"} />
                        <ConditionRoute path="/fund-transfer-history" component={FundTansferHistory} layout={Admin} type={"private"} />
                        {/* Report 


                        <ConditionRoute exact path="/Communitycategorylist" component={CommunitycategoryList} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/Communityaddcategory" component={Communitycategoryadd} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/Communitycategoryedit/:userId" component={CommunitycategoryEdit} layout={Admin} type={"private"} />
                        <ConditionRoute exact path="/CommunityUserList" component={CommunityUserList} layout={Admin} type={"private"} />
                    
                     Public Route 

                        {/* Public Route 
                        {/* <Route path="/" component={LoginPage} /> 
                        <Redirect from="/" to="/" />

                        {/* <Route path="/admin" component={Admin} /> 


*/}
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
