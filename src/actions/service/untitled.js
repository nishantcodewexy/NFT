import React, { useEffect,useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField } from '@material-ui/core';
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import { Link } from "react-router-dom";
import {language} from 'views/language'
import Headerbeforelogin from "components/Header/Headerbeforelogin.js";
import Headertoconnectmainnet from "components/Header/Headertoconnectmainnet.js";
import { toastAlert }  from "../actions/toastAlert";
import 'react-toastify/dist/ReactToastify.css';
import { getMethod }  from "../actions/actions";
import { postMethod }  from "../actions/actions";
import Web3 from 'web3';
import '@metamask/legacy-web3'
import config from '../actions/config';
import Countdown, { zeroPad } from "react-countdown";

const baseurl=config.baseUrl;

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const currentDate = new Date();
const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function Myitems(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [useraddress,setuseraddress] = React.useState('');
  const [showwal,setshowwal] = useState(true)
  const [mainnet,setmainnet] = React.useState(false);
  const [profileimage, setProfile]     = useState('');
  const [followimage, setFollowimg]     = useState('');
  const [coverimage, setcoverProfile]  = useState('');
  const [profiledetails, setprofiledetails]  = useState('');
  const [alltoken, setalltoken]  = useState([]);

  if(localStorage.getItem("lang")){
    var localStorageLang = localStorage.getItem("lang")
  }else{
    var localStorageLang = 'English'
  }

  useEffect(() => {
    getconnect();
  }, []);

  async function getaccount(iid){
    var data={
      id:iid
    }
    var rest = await postMethod(baseurl+"api/getuserprofile",data)
    console.log(rest.data,"==========================")
    if (rest && rest.data && rest.data!= undefined) {
         setprofiledetails(rest.data)
        var profile = baseurl + 'profile/'+ rest.data.coverimage;
        var profileimage = baseurl + 'profile/' + rest.data.image;
        setProfile(profileimage);
        setcoverProfile(profile);
        setFollowimg(rest.data.image)
      } else {
        var profile = baseurl + '/images/noimage.png';
        var profileimage = baseurl + '/images/noimage.png';
        setProfile(profileimage);
        setcoverProfile(profile);
        setFollowimg("noimage.png")
      }

  }

  async function  getitems(iid){
    var data={
      id:iid
    }
    var rest = await postMethod(baseurl+"api/getuseritems",data)
    console.log(rest,"====================")
    setalltoken(rest.data)
  }

  async function getconnect(){
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      try {
        if (typeof web3 !== 'undefined') {
        window.ethereum.enable().then(async function() {
        const web3  = new Web3(window.web3.currentProvider)
        if (window.web3.currentProvider.isMetaMask === true) {
          await web3.eth.getAccounts(async function(error, result) {
            setuseraddress(result[0]);
            getaccount(result[0])
            getitems(result[0]);
            setshowwal(false);
           if(window.web3.currentProvider.networkVersion == config.network ){
              setmainnet(true);
            }else{
              setmainnet(false)
            }
          })
        }else{
          setshowwal(true)
          setmainnet(false)
        }
      })
      }else{
        toastAlert('error',"Please Add Metamask External",'error')
        setshowwal(true)
        setmainnet(false)
      }
    }catch(err){
      setshowwal(true)
      setmainnet(false)
    }
   }else{
    toastAlert('error',"Please Add Metamask External",'error')
    setshowwal(true)
    setmainnet(false)
   }
  }

  async function connect(){
    toastAlert('error',"Please Login Metamask External",'error')
  }


  return (
    <div className="inner_header">
      <Header
        fixed
        color="transparent"
        routes={dashboardRoutes}
        brand={<Link to="/home"><img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" /></Link>}
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 50,
          color: "dark"
        }}
        {...rest}
      />
      <ScrollToTopOnMount />
      <div className={classes.pageHeader + " inner_pageheader items_header"}>
        <div>
          <GridContainer className="mx-0">
            <GridItem xs={12} sm={12} md={12} className="px-0">
              <div className="items_bg">
                <img src={coverimage} alt="profile" className="img-fluid" />
                <div className="container edit_cover_container">
                  <p className="edit_cover_text" data-toggle="modal" data-target="#edit_cover_modal">Edit cover</p>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div>
          <GridContainer className="mx-0">
            <GridItem xs={12} sm={12} md={12} className="px-0">
              <div className="container">
                <div className="my_items_panel">
                  <div className="item_prof">
                    <img src={profileimage} alt="profile" className="img-fluid items_profile" />
                  </div>
                  <div className="profile_edit_panel item_prof_panel">
                    <img src={require("../assets/images/verified_icon.png")} alt="profile" className="img-fluid" />
                  </div>
                  <h2>{profiledetails.name}</h2>
                  <p>
                    <span className="address_text">{profiledetails.curraddress}</span>
                    <span>
                      <img src={require("../assets/images/copy_icon.png")} alt="profile" className="img-fluid copy_icon ml-2" />
                    </span>
                  </p>
                  <p className="form_note">{profiledetails.bio}</p>
                  <div className="d-flex">
                    <div className="d-flex align-items-center mr-5">
                      <img src={require("../assets/images/twitter_icon.png")} alt="profile" className="img-fluid copy_icon mr-2" />
                      <span className="address_text">{profiledetails.twitter}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src={require("../assets/images/web_icon.png")} alt="profile" className="img-fluid copy_icon mr-2" />
                      <span className="address_text">{profiledetails.customurl}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    {/* <Button className="btn_outline_red">Edit Profile</Button> */}
                    <Button className="follow_btn">Follow</Button>
                    <span className="bg_red_icon" data-toggle="modal" data-target="#share_modal">
                      <i class="bi bi-upload"></i>
                    </span>
                    <div class="dropdown d-inline-block">
                      <span className="bg_red_icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                      </span>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#report_modal">Report</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div className="container">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <nav className="masonry_tab_nav mt-4 items_tab_outer">
                <div className="nav nav-tabs masonry_tab primary_tab items_tab" id="nav-tab" role="tablist">
                  <a className="nav-link active" id="onsale-tab" data-toggle="tab" href="#onsale" role="tab" aria-controls="onsale" aria-selected="true">
                    <span className="tab_head">{language.[localStorageLang].OnSale}</span>
                    <span className="tab_count">13</span>
                  </a>
                  <a className="nav-link" id="collectibles-tab" data-toggle="tab" href="#collectibles" role="tab" aria-controls="collectibles" aria-selected="false">
                    <span className="tab_head">{language.[localStorageLang].Collectibles}</span>
                    <span className="tab_count">15</span>
                  </a>
                  <a className="nav-link" id="created-tab" data-toggle="tab" href="#created" role="tab" aria-controls="created" aria-selected="false">
                    <span className="tab_head">{language.[localStorageLang].Created}</span>
                    <span className="tab_count">15</span>
                  </a>
                  <a className="nav-link" id="liked-tab" data-toggle="tab" href="#liked" role="tab" aria-controls="liked" aria-selected="false">
                    <span className="tab_head">{language.[localStorageLang].Liked}</span>
                    <span className="tab_count">2</span>
                  </a>
                  <a className="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">
                    <span className="tab_head">{language.[localStorageLang].Activity}</span>
                    <span className="tab_count">0</span>
                  </a>
                  <a className="nav-link" id="following-tab" data-toggle="tab" href="#following" role="tab" aria-controls="following" aria-selected="false">
                    <span className="tab_head">Following</span>
                    <span className="tab_count">16</span>
                  </a>
                  <a className="nav-link" id="followers-tab" data-toggle="tab" href="#followers" role="tab" aria-controls="followers" aria-selected="false">
                    <span className="tab_head">Followers</span>
                    <span className="tab_count">107</span>
                  </a>
                </div>
              </nav>
              <div className="tab-content explore_tab_content mt-2" id="nav-tabContent">
                <div className="tab-pane fade show active" id="onsale" role="tabpanel" aria-labelledby="onsale-tab">
                  <div className="proposal_panel_overall">
                    <div className="text-center py-5">
                      <div className="collections_section_panel">
                        {alltoken.map((token)=>{
                          if(token.ownerinfo.type=="sale"){
              return(
              <div className="item">
                <div className="d-flex justify-content-end">
                  <div class="dropdown">
                    <span className="nft_more_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdownMenuButton"><i class="bi bi-three-dots"></i></span>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#">Purchase Now</a>
                      <a class="dropdown-item" href={"/info/"+token._id}>{language.[localStorageLang].Place_a_Bid}</a>
                      <a class="dropdown-item" href="#">{language.[localStorageLang].Share}</a>
                      <a class="dropdown-item" href="#">Report</a>
         
                    </div>
                  </div>
                </div>
                 <a href={"/info/"+token._id}> <div className="nft_img_panel">
                <img src={baseurl+"tokens/"+token.tokendetails.image} alt="Collections" className="img-fluid" />
                </div></a>
                <h2>{token.tokendetails.tokenName}</h2>
                <div className="creator_details">
                  {token && token.ownerinfo && token.ownerinfo.image && token.ownerinfo.image!="" ?(
                        <img src={baseurl+"profile/"+token.ownerinfo.image} alt="Collections" className="img-fluid" />
                        ):(
                        <img src={require("../assets/images/profile_img.png")} alt="Collections" className="img-fluid" />
                        )}
                         {token && token.ownerinfo && token.ownerinfo.name && token.ownerinfo.name!="" ?(
                        <p>{token.ownerinfo.name}</p>
                        ):(
                        <p>{token.tokenOwner}</p>
                        )}
                </div>
                <hr className="nft_hr"/>
                <div className="d-flex justify-content-between align-items-end">
                  <div>
                    <h3><span>{token.tokenPrice} BNB</span> {token.balance} of {token.total}</h3>
                    <h4>{"$"+((parseFloat(token.tokenPrice)/parseFloat(usd)).toFixed(4))}</h4>
                  </div>
                  <div className="">
                    <a href={"/info/"+token._id}><div className="masonry_likes">
                      <i class="bi bi-chat-dots mr-2"></i>
                      <span>{token.tokendetails.chat && token.tokendetails.chat.length>0 ? token.tokendetails.chat.length:"0"}</span>
                    </div></a>
                    
                  </div>
                </div>
              </div>
              )
               }
             })}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="tab-pane fade" id="collectibles" role="tabpanel" aria-labelledby="collectibles-tab">
                  <div className="proposal_panel_overall">
                    <div className="text-center py-5">
                      <p className="not_found_text">No items found</p>
                      <p className="not_found_text_sub">Come back soon! Or try to browse something for you on our marketplace</p>
                      <div className="mt-3">
                        <Button className="create_btn">Browse Marketplace</Button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="tab-pane fade" id="created" role="tabpanel" aria-labelledby="created-tab">
                  <div className="proposal_panel_overall">
                    <div className="text-center py-5">
                      <p className="not_found_text">No items found</p>
                      <p className="not_found_text_sub">Come back soon! Or try to browse something for you on our marketplace</p>
                      <div className="mt-3">
                        <Button className="create_btn">Browse Marketplace</Button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="tab-pane fade" id="liked" role="tabpanel" aria-labelledby="liked-tab">
                  <div className="proposal_panel_overall">
                    <div className="text-center py-5">
                      <p className="not_found_text">No items found</p>
                      <p className="not_found_text_sub">Come back soon! Or try to browse something for you on our marketplace</p>
                      <div className="mt-3">
                        <Button className="create_btn">Browse Marketplace</Button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                  <div className="proposal_panel_overall">
                    <div className="py-5">
                      <GridContainer>
                        <GridItem sm={12} md={8} lg={8}>
                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_1.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_1.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_3.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_2.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_3.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_2.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_2.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>

                          <div className="card primary_card">
                            <div className="card-body px-3">
                              <div className="media follow_media">
                                <div className="activity_img mr-2">
                                  <img src={require("../assets/images/follower_3.png")} alt="User" className="img-fluid mr-3" />
                                </div>
                                <div className="media-body flex_body">
                                  <div>
                                    <p className="my-0 media_text">Gateway to Valheim</p>
                                    <div className="mt-0 media_num d-flex align-items-center">
                                      <p className="mb-0 mr-2">Transferred from</p> 
                                      <img src={require("../assets/images/user_01.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>Binx.tv</h4>
                                      <p className="mb-0 ml-1 mr-2"> to</p>
                                      <img src={require("../assets/images/user_02.png")} alt="User" className="img-fluid mr-2" />
                                      <h4>0x3fa4ea876...ac47</h4>
                                    </div>
                                    <p className="mt-0 media_num mb-0 dur_text">3 hours ago</p>
                                  </div>
                                </div>
                              </div>                              
                            </div>
                          </div>
                        </GridItem>
                        <GridItem sm={12} md={4} lg={4}>
                          <div className="filter_panel">
                            <h2>Filter</h2>
                            <div className="filter_panel_grp">
                              <Button className="filter_btn">Listings</Button>
                              <Button className="filter_btn">Purchases</Button>
                              <Button className="filter_btn">Sales</Button>
                              <Button className="filter_btn">Transfers</Button>
                              <Button className="filter_btn">Burns</Button>
                              <Button className="filter_btn">Bids</Button>
                              <Button className="filter_btn">Likes</Button>
                              <Button className="filter_btn">Followings</Button>
                            </div>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="following" role="tabpanel" aria-labelledby="following-tab">
                  <div className="proposal_panel_overall">
                    <div className="text-center py-5">
                      <p className="not_found_text">No items found</p>
                      <p className="not_found_text_sub">Come back soon! Or try to browse something for you on our marketplace</p>
                      <div className="mt-3">
                        <Button className="create_btn">Browse Marketplace</Button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="tab-pane fade" id="followers" role="tabpanel" aria-labelledby="followers-tab">
                  <div className="proposal_panel_overall">
                    <div className="followers_overall py-5">
                      <div className="row">
                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_01.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Harryvors</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_02.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Anya Kuzai</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_03.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">MOM Art Collective</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_04.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Nikos Michelis</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_05.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Crypto Cuties</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_06.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Card Art</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_01.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Harryvors</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_02.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Anya Kuzai</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_03.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">MOM Art Collective</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_04.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Nikos Michelis</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_05.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Crypto Cuties</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_06.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Card Art</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_01.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Harryvors</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_02.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Anya Kuzai</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_03.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">MOM Art Collective</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_04.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Nikos Michelis</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_05.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Crypto Cuties</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_06.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Card Art</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_01.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Harryvors</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3">
                          <div className="card mt-3 primary_card">
                            <div className="card-body">
                              <div className="media follow_media">
                                <div className="follow_media_img">
                                  <img src={require("../assets/images/followers_02.png")} alt="User" className="img-fluid" />
                                </div>
                                <div className="media-body flex_body ml-2">
                                  <div>
                                    <p className="mt-0 media_text mb-0">Anya Kuzai</p>
                                    <p className="mt-0 media_num mb-0">452 followers</p>
                                  </div>
                                  <Button className="create_btn follow_button">Follow</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
      
      {/* edit_cover Modal */}
      <div class="modal fade primary_modal" id="edit_cover_modal" tabindex="-1" role="dialog" aria-labelledby="edit_cover_modalCenteredLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h5 class="modal-title" id="edit_cover_modalLabel_1">Update cover</h5>
              <h5 class="modal-title d-none" id="edit_cover_modalLabel_2">Follow Steps</h5>

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="update_cover_div_1" id="update_cover_div_1">
                <p className="mt-0 approve_desc text-center mb-4">Upload new cover for your profile page. We recommended to upload images in 1140×260 resolution</p>
                <form className="text-center">
                  <div className="file_btn btn primary_btn">Choose image
                    <input className="inp_file" type="file" name="file" />
                  </div>
                </form>
              </div>
              <div className="update_cover_div_2 d-none" id="update_cover_div_2">
                <div className="media approve_media">
                  {/* <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i> */}
                  <i class="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>
                  <div className="media-body">
                    <p className="mt-0 approve_text">Preferences</p>
                    <p className="mt-0 approve_desc">Updating cover</p>
                  </div>
                </div>
                <div className="text-center my-3">
                  <Button className="btn_outline_red btn-block">Inprogress</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end edit_cover modal */}

      {/* Share Modal */}
      <div class="modal fade primary_modal" id="share_modal" tabindex="-1" role="dialog" aria-labelledby="share_modalCenteredLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h5 class="modal-title" id="share_modalLabel">Share link to this page</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="share_nft_modal">
                <a href="#" target="_blank">
                  <i class="fab fa-telegram-plane"></i>
                  <p>Telegram</p>
                </a>
                <a href="#" target="_blank">
                  <i class="fab fa-twitter"></i>
                  <p>Twitter</p>
                </a>
                <a href="#" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                  <p>Facebook</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Share Modal */}

      {/* Report Modal */}
      <div class="modal fade primary_modal" id="report_modal" tabindex="-1" role="dialog" aria-labelledby="report_modalCenteredLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h5 class="modal-title" id="report_modalLabel">Why are you reporting?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Tell us how this user violates the rules of the site</p>
              <form>
                <label className="primary_label" htmlFor="name">Message</label>
                <textarea className="primary_inp" rows="3" placeholder="Tell us some details"></textarea>
                <div className="report_btn_grp mt-3"> 
                  <Button className="create_btn">Report</Button>
                  <Button className="cancel_btn">Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Report Modal */}

       {/* Put Sale Modal */}
       <div class="modal fade primary_modal" id="put_sale_modal" tabindex="-1" role="dialog" aria-labelledby="put_sale_modalCenteredLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content" id="hide"  >
            <div class="modal-header text-center">
              <h5 class="modal-title" id="put_sale_modalLabel_1">Put on Sale</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="update_cover_div_2" id="update_cover_div_2">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <div className="input_group">
                        <input type="text" className="primary_inp" id="price" name="price" placeholder="Enter price for one piece"/>
                        <select class="custom-select select_menu choose_price">
                          <option selected>BNB</option>
                          <option>ETH</option>
                        </select>
                        </div>
                      <p class="form_note mb-0">Service fee <span className="text-dark">2.5%</span></p>
                      <p class="form_note mb-0">You will receive <span className="text-dark">0 ETH</span> $0.00</p>
                    </div>
                  </div>
                </form>
                <div className="text-center my-3">
                  <Button className="btn_outline_red btn-block" data-dismiss="modal" data-toggle="modal" data-target="#follow_steps_modal">Next Step</Button>
                  <Button className="btn_outline_red btn-block" data-dismiss="modal">Cancel</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Put Sale modal */}


      {/* Following Steps Modal */}
      <div class="modal fade primary_modal" id="follow_steps_modal" tabindex="-1" role="dialog" aria-labelledby="follow_steps_modalCenteredLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content" id="hide"  >
            <div class="modal-header text-center">
              <h5 class="modal-title" id="follow_steps_modalLabel_1">Follow Steps</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div className="update_cover_div_2" id="update_cover_div_2">
                <div className="media approve_media">
                  {/* <i className="fas fa-check mr-3 pro_complete" aria-hidden="true"></i> */}
                  <i class="fa fa-spinner mr-3 spinner_icon" aria-hidden="true"></i>
                  <div className="media-body">
                    <p className="mt-0 approve_text">Sign Sell Order</p>
                    <p className="mt-0 approve_desc">Sign sell order using your wallet</p>
                  </div>
                </div>
                <div className="text-center my-3">
                  <Button className="btn_outline_red btn-block">Follow Wallet Instructions</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Following Steps modal */}


    </div>
  );
}
