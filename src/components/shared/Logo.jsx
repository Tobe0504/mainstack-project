import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/routes";
import { IMAGES } from "../../utils/images";

const Logo = () => {
  return (
    <Link to={ROUTES.BASE_URL}>
      <img
        src={IMAGES.LOGO}
        width={36}
        height={36}
        className="w-9 h-9 object-cover"
      />
    </Link>
  );
};

export default Logo;
