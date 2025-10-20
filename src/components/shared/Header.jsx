import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthUserContext } from "../../context/AuthUserContext";
import { HEADER_ROUTES } from "../../lib/routes";
import { Button } from "./Button";
import Logo from "./Logo";
import Tooltip from "./Tooltip";
import UsernamePill from "./UsernamePill";

const Header = () => {
  // Router
  const location = useLocation();

  // Context
  const { user } = useContext(AuthUserContext);

  console.log(user, "user");

  return (
    <header className="w-full basis-16 rounded-full flex items-center px-3 md:px-6 shadow-mainstack-main justify-between sticky top-4 bg-mainstack-primary-white z-10">
      <Logo />

      <nav className="md:flex hidden items-center gap-5 ">
        {HEADER_ROUTES.map((route) => {
          const normalize = (path) =>
            path.startsWith("/") ? path : "/" + path;

          const active =
            normalize(route.route) === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(normalize(route.route));

          return (
            <Link
              to={route.route}
              className={`flex items-center gap-1 rounded-full px-3.5 py-2.5 hover:bg-mainstack-primary-black hover:text-mainstack-primary-white two-sec-transition font-sans font-semibold text-mainstack-primary-gray text-base ${
                active &&
                "text-mainstack-primary-white bg-mainstack-primary-black"
              }`}
            >
              <span className="material-symbols-outlined">{route.iconId}</span>
              <span>{route.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex gap-2 items-center">
        <Button
          variant="ghost"
          className="text-20 text-mainstack-primary-gray p-2.5 md:block hidden"
        >
          <Tooltip content="Notifications" preferredPosition="bottom">
            <span className="material-symbols-outlined">notifications</span>
          </Tooltip>
        </Button>
        <Button
          variant="ghost"
          className="text-20 text-mainstack-primary-gray p-2.5 md:block hidden"
        >
          <Tooltip content="Chat" preferredPosition="bottom">
            <span className="material-symbols-outlined">chat</span>
          </Tooltip>
        </Button>
        <div className="flex items-center gap-2 p-1 bg-mainstack-secondary-gray rounded-full">
          <UsernamePill
            firstName={user?.first_name}
            lastName={user?.last_name}
          />
          <Button
            variant="ghost"
            className="text-20 text-mainstack-primary-gray p-0 m-0"
          >
            <Tooltip content="Menu" preferredPosition="bottom">
              <span className="material-symbols-outlined">menu</span>
            </Tooltip>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
