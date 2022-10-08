import clsx from "clsx";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { Provider } from "urql";

import { ReactComponent as Logo } from "./assets/logo.svg";
import urqlClient from "./modules/urql-client";

const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Films",
    href: "/films",
  },
  {
    label: "People",
    href: "/people",
  },
  {
    label: "Planets",
    href: "/planets",
  },
  {
    label: "Star Ships",
    href: "/star-ships",
  },
  {
    label: "Vehicles",
    href: "/vehicles",
  },
];

function Root() {
  return (
    <div>
      <header className="flex justify-between px-20 py-8">
        <div className="flex items-center justify-betweenr gap-2">
          <Logo height={28} />
          <h4 className="uppercase text-3xl font-black m-0">Fashion</h4>
        </div>
        <div className="flex gap-4 items-center">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              {...("props" in link &&
                typeof link.props === "object" &&
                link.props)}
              className={({ isActive, isPending }) =>
                clsx(
                  isActive && "text-red-500",
                  isPending && "text-orange-400",
                  "text-black py-2 px-4 uppercase rounded-md no-underline",

                  "props" in link &&
                    typeof link.props === "object" &&
                    link.props !== null &&
                    "className" in link.props &&
                    typeof link.props.className === "string" &&
                    link.props?.className
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>
      <Provider value={urqlClient}>
        <Outlet />
      </Provider>
      <ScrollRestoration />
    </div>
  );
}

export default Root;
