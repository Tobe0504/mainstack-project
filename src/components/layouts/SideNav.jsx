import React from "react";
import { Link } from "react-router-dom";
import { SIDE_NAV_ROUTES } from "../../lib/routes";
import Tooltip from "../shared/Tooltip";

const SideNav = () => {
  return (
    <nav className=" flex flex-col w-12 items-center rounded-full p-1 gap-2 shadow-mainstack-secondary fixed top-0 bottom-0 my-auto bg-mainstack-primary-white max-h-48">
      {SIDE_NAV_ROUTES.map((route) => {
        return (
          <Link
            key={route.route}
            to={route.route}
            className=" flex flex-col items-center p-2 rounded-full hover:bg-gray-100 two-sec-transition  grayscale hover:grayscale-0"
          >
            <Tooltip content={route.title}>{route.icon}</Tooltip>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideNav;
