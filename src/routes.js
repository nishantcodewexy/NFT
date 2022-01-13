// @material-ui/icons
import {
  Dashboard,
  Person,
  LibraryBooks,
  List,
  Equalizer,
  Timeline,
  Settings,
  Money,
  History,
  Email,
  Help,
  LiveHelp,
  AccountBalanceWallet,
  AccountBalance,
  ExitToApp,
  ArrowForwardIcon,
} from "@material-ui/icons";

import AdjustIcon from "@material-ui/icons/Adjust";

const dashboardRoutes = [
  {
    id: "login",
    path: "/",
    isSideMenu: false,
    isEdit: false,
    isRestricted: "common",
  },
  {
    id: "forgot",
    path: "/forgot",
    isSideMenu: false,
    isEdit: false,
    isRestricted: "common",
  },
  {
    id: "change-password",
    path: "/changepassword/:authToken",
    isSideMenu: false,
    isEdit: false,
    isRestricted: "common",
  },
  {
    id: "security",
    path: "/securityType",
    isSideMenu: false,
    isEdit: false,
    isRestricted: "common",
  },
  {
    id: "edit-profile",
    path: "/editprofile",
    isSideMenu: false,
    isEdit: false,
    isRestricted: "common",
  },

  {
    path: "#",
    id: "cms",
    name: "CMS Management",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "CMS List",
        path: "/Cmsauction",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Terms and Conditions",
        path: "/cms",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Edit Terms and Conditions",
        path: "/cmsedit/:cmsId",
        icon: AdjustIcon,
        visible: false,
      },
    ],
  },

  {
    path: "#",
    id: "Bid",
    name: "Bid ",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Bid Lists",
        path: "/bidlist",
        icon: Person,
        visible: true,
      },
    ],
  },

  {
    path: "#",
    id: "token",
    name: "Token Management",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Token Lists",
        path: "/TokenList",
        icon: Person,
        visible: true,
      },
      {
        name: "Token View",
        path: "/TokenView/:userId",
        icon: Person,
        visible: false,
      },
    ],
  },
  // {
  //   path: "#",
  //   id: "request",
  //   name: "Verification",
  //   icon: List,
  //   type: "multi",
  //   isEdit: false,
  //   isSideMenu: true,
  //   child: [
  //     {
  //       name: "Email Verification",
  //       path: "/verificationlist",
  //       icon: Person,
  //     },

  //   ]
  // },

  {
    path: "#",
    id: "Setting",
    name: "Setting Details",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Setting",
        path: "/setting",
        icon: Person,
        visible: true,
      },
    ],
  },
  // {
  //   path: "#",
  //   id: "Community category",
  //   name: "Community Category",
  //   icon: List,
  //   type: "multi",
  //   isEdit: false,
  //   isSideMenu: true,
  //   child: [
  //     {
  //       name: "Category Lists",
  //       path: "/CommunitycategoryList",
  //       icon: AdjustIcon,
  //     },
  //     {
  //       name: "Category Users",
  //       path: "/CommunityUserList",
  //       icon: AdjustIcon,
  //     }
  //   ]
  // },
  // {
  //   path: "#",
  //   id: "Faq",
  //   name: "Faq",
  //   icon: List,
  //   type: "multi",
  //   isEdit: false,
  //   isSideMenu: true,
  //   child: [
  //     {
  //       name: "FaqList",
  //       path: "/Faq",
  //       icon: Person,
  //     }
  //   ]
  // },

  {
    path: "#",
    id: "emailtemplate",
    name: "Email Template",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Email Template List",
        path: "/emailTemplate",
        icon: Person,
        visible: true,
      },
      {
        name: "Edit Email Template",
        path: "/emailUpdatecms/:cmsId",
        icon: Person,
        visible: false,
      },
    ],
  },
  {
    path: "#",
    id: "Prohibited",
    name: "Prohibited",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Prohibited",
        path: "/prohibited",
        icon: Person,
        visible: true,
      },
      {
        name: "Add Prohibited",
        path: "/prohibitedadd",
        icon: Person,
        visible: false,
      },
      {
        name: "Edit Prohibited",
        path: "/prohibitededit/:wordId",
        icon: Person,
        visible: false,
      },
    ],
  },
  {
    path: "#",
    id: "burn",
    name: "Burn",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Burn",
        path: "/burn",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Burn Detail View",
        path: "/viewdetails/:tokenId",
        icon: AdjustIcon,
        visible: false,
      },
    ],
  },
  {
    path: "#",
    id: "query",
    name: "Question Management",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "User Report",
        path: "/report",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Report Detail",
        path: "/reportdetail/:Id/:reportid",
        icon: AdjustIcon,
        visible: false,
      },
      {
        name: "Reply Mail Page",
        path: "/replymail/:email",
        icon: AdjustIcon,
        visible: false,
      },
      {
        name: "Token Report",
        path: "/tokenreport",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Token Report Detail",
        path: "/tokenreportdetail/:Id/:reportid",
        icon: AdjustIcon,
        visible: false,
      },
      {
        name: "Question",
        path: "/question",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Question Detail",
        path: "/questiondetail/:Id",
        icon: AdjustIcon,
        visible: false,
      },
    ],
  },
  {
    path: "#",
    id: "Noties",
    name: "Noties",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "Noties",
        path: "/noties",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Add Noties",
        path: "/notiesadd",
        icon: AdjustIcon,
        visible: false,
      },
      {
        name: "Edit Noties",
        path: "/notiesedit/:wordId",
        icon: AdjustIcon,
        visible: false,
      },
    ],
  },
  /*Admin  */
  {
    id: "admin",
    path: "#",
    name: "Admin Management",
    icon: List,
    type: "multi",
    isSideMenu: true,
    isEdit: false,
    child: [
      {
        name: "Admin Management",
        path: "/list",
        icon: AdjustIcon,
        visible: true,
      },
      {
        name: "Add Admin",
        path: "/add",
        icon: AdjustIcon,
        visible: false,
      },
      {
        name: "Edit Admin",
        path: "/edit/:userId",
        icon: AdjustIcon,
        visible: false,
      },
    ],
  },
  {
    /*{
    path: "#",
    id: "user",
    name: "User Management",
    icon: List,
    type: "multi",
    isEdit: false,
    isSideMenu: true,
    child: [
      {
        name: "User Lists",
        path: "/userList",
        icon: Person,
      }
    ]
  },

  {
    path: "/idproof",
    id: "proof",
    path: "#",
    name: "Doc Verfication",
    icon: Person,
    type: "multi",
    isSideMenu: true,
    child: [
      {
        path: "/idproof",
        name: "ID Proof",
        icon: Person,
      },
      {
        path: "/selfieproof",
        name: "Selfie Proof",
        icon: Person,
      },
      {
        path: "/addressproof",
        name: "Address Proof",
        icon: Person,
      },
      // {
      //   path: "/bankproof",
      //   name: "BanK Proof",
      //   icon: Person,
      // },

    ]
  },
  {
    path: "/currency",
    name: "Currency",
    icon: Money,
    isSideMenu: true,
  },
  {
    path: "/tradePairs",
    name: "Trade Pairs",
    icon: LibraryBooks,
    isSideMenu: true,
  },
  {
    path: "/report",
    id: "report",
    path: "#",
    name: "Report",
    icon: Equalizer,
    type: "multi",
    isSideMenu: true,
    child: [
      {
        path: "/trade-history",
        name: "Trade",
        icon: History,
      },
      {
        path: "/withdraw",
        name: "Withdraw",
        icon: AccountBalanceWallet,
      },
      {
        path: "/fund-transfer-history",
        name: "Fund Transfer",
        icon: AccountBalanceWallet,
      }
    ]
  },
  {
    path: "/wallet",
    id: "wallet",
    path: "#",
    name: "Wallet",
    icon: AccountBalance,
    type: "multi",
    isSideMenu: true,
    child: [
      {
        path: "/withdraw-request/coin",
        name: "Coin Withdraw Request",
        icon: AccountBalanceWallet,
      },
      {
        path: "/withdraw-request/fiat",
        name: "Withdraw Request",
        icon: ExitToApp,
      },
      {
        path: "/deposit-request/fiat",
        name: "Deposit Request",
        icon: ExitToApp,
      },
    ]
  },
  {
    path: "/securityType",
    id: "setting",
    path: "#",
    name: "Settings",
    icon: Settings,
    type: "multi",
    isSideMenu: true,
    child: [
      {
        path: "/securityType",
        name: "Security Type",
        isRestricted: 'common',
        icon: Person,
      }
    ]
  },

  {
    path: "/",
    id: "referral",
    path: "#",
    name: "Referral",
    icon: Settings,
    type: "multi",
    isSideMenu: true,
    child: [
      {
        path: "/referral/fees",
        name: "Fees Setting",
        isRestricted: 'common',
        icon: Person,
      },
      {
        path: "/referral/history",
        name: "Referral History",
        isRestricted: 'common',
        icon: Person,
      },
    ]
  },


  {
    path: "/emailTemplate",
    name: "Email Template",
    icon: Email,
    isSideMenu: true,
  },
  {
    path: "/support",
    id: "support",
    path: "#",
    name: "Support",
    icon: Help,
    type: "multi",
    isSideMenu: true,
    child: [
      {
        path: "/support/category",
        name: "Support Category",
        icon: Help,
      },
      {
        path: "/support/ticket",
        name: "Support Ticket",
        icon: Help,
      },
    ]
  },
  {
    path: "/faq",
    name: "Faq",
    icon: LiveHelp,
    isSideMenu: true,
  }
*/
  },
];

export default dashboardRoutes;
