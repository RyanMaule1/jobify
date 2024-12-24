import React from "react";
//import all icons for each link 
import {IoBarChartSharp} from "react-icons/io5";
import {MdQueryStats} from "react-icons/md";
import {FaWpforms} from "react-icons/fa";
import {ImProfile} from "react-icons/im";
import {MdAdminPanelSettings} from "react-icons/md";
import { uniqueId } from "lodash";

//in general use the same link as the path you want it to go to from the router in app

const links = [
    {
        id: uniqueId(),
        text: "Add Job",
        path: ".",
        icon: <FaWpforms />,
    },
    {
        id: uniqueId(),
        text: "All Jobs",
        path: "all-jobs",
        icon: <MdAdminPanelSettings />,
    },
    {
        id: uniqueId(),
        text: "stats",
        path: "stats",
        icon: <IoBarChartSharp/>
    },
    {
        id: uniqueId(),
        text: "Profile",
        path: "profile",
        icon: <ImProfile />
    },
    {
        id: uniqueId(),
        text: "Admin",
        path: "admin",
        icon: <MdQueryStats />
    },
];

export default links;