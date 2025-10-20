import Invoicing from "../assets/icons/Invoicing";
import LinkInBio from "../assets/icons/LinkInBio";
import MediaKit from "../assets/icons/MediaKit";
import Store from "../assets/icons/Store";

export const ROUTES = Object.freeze({
  BASE_URL: "/",
  ANALYTICS: "analytics",
  RENEVUE: "/revenue",
  CRM: "/crm",
  APPS: "/apps",
  LINK_IN_BIO: "/link-in-bio",
  STORE: "/link-in-bio",
  MEDIA_KIT: "/media-kit",
  INVOICING: "/invoicing",
});

export const HEADER_ROUTES = [
  {
    title: "Home",
    route: ROUTES.BASE_URL,
    iconId: "home",
  },
  {
    title: "Analytics",
    route: ROUTES.ANALYTICS,
    iconId: "insert_chart",
  },
  {
    title: "Revenue",
    route: ROUTES.RENEVUE,
    iconId: "payments",
  },
  {
    title: "CRM",
    route: ROUTES.CRM,
    iconId: "group",
  },
  {
    title: "Apps",
    route: ROUTES.APPS,
    iconId: "widgets",
  },
];

export const SIDE_NAV_ROUTES = [
  {
    title: "Link In Bio",
    route: ROUTES.LINK_IN_BIO,
    icon: <LinkInBio />,
  },
  {
    title: "Store",
    route: ROUTES.STORE,
    icon: <Store />,
  },
  {
    title: "Media Kit",
    route: ROUTES.MEDIA_KIT,
    icon: <MediaKit />,
  },

  {
    title: "Invoicing",
    route: ROUTES.INVOICING,
    icon: <Invoicing />,
  },
];
