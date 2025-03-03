import {
  Link,
  NavLink,
  useLoaderData,
  useLocation,
  Form,
} from "@remix-run/react";

import ArrowRightStartOnRectangleIcon from "~/icons/arrow_right";
import Bars3Icon from "~/icons/bars3";

import logo from "~/images/Logos/salud.webp";

import { loader } from "~/routes/_public";

const navigation_authorized = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Nosotros", href: "/about" },
  { name: "Añadir Nuevo Registro", href: "/add/characteristics" },
  { name: "InDRE", href: "/indre" },
  { name: "Analizar Resultados", href: "/analyse" },
  { name: "Capacitación", href: "/training" },
];

const navigation_public = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Nosotros", href: "/about" },
];

export default function MainNavigation() {
  // On first visit, 'profileId' will be undefined. Otherwise it will be a string.
  const profileId: string | null = useLoaderData<typeof loader>();

  // 'pathname' will be the current path of the URL; the section after the domain, including
  // a leading forward slash.
  const location = useLocation();
  const pathname: string = location.pathname;

  return (
    <div className="navbar bg-primary text-primary-content h-32 py-6 border-b-4 border-accent">
      {/* NAVBAR START */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl rounded-full">
          <img className="h-12 w-auto rounded-full" src={logo} alt="" />
        </Link>

        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <Bars3Icon
              className="h-6 w-6 text-primary-content"
              aria-hidden="true"
            />
          </button>
          <menu className="menu menu-sm dropdown-content mt-3 px-1 bg-primary shadow rounded-box w-56 z-50">
            {profileId &&
              navigation_authorized.map((item) => (
                <li
                  key={item.name}
                  className="my-1 px-1 btn btn-ghost normal-case text-sm content-center"
                >
                  <NavLink to={item.href}>{item.name}</NavLink>
                </li>
              ))}
            {!profileId &&
              navigation_public.map((item) => (
                <li
                  key={item.name}
                  className="my-1 px-1 btn btn-ghost normal-case text-sm content-center"
                >
                  <NavLink to={item.href}>{item.name}</NavLink>
                </li>
              ))}
          </menu>
        </div>
      </div>

      {/* NAVBAR CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {profileId &&
            navigation_authorized.map((item) => (
              <li key={item.name} className="mx-4">
                <NavLink
                  to={item.href}
                  className="btn btn-sm btn-ghost normal-case content-center rounded-md"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

          {!profileId &&
            navigation_public.map((item) => (
              <li key={item.name} className="mx-4">
                <NavLink
                  to={item.href}
                  className="btn btn-sm btn-ghost normal-case content-center rounded-md"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>

      {/* NAVBAR END */}
      <div className="navbar-end">
        {profileId && (
          <Form method="POST" action="/logout">
            <button className="btn btn-ghost normal-case text-primary-content">
              Salir
              <ArrowRightStartOnRectangleIcon
                className="h-6"
                aria-label="Logout"
              />
            </button>
          </Form>
        )}

        {!profileId &&
          (pathname !== "/auth" ? (
            <li className="btn btn-ghost normal-case">
              <NavLink className="text-primary-content" to="/auth">
                Acceso <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </li>
          ) : (
            <li className="hidden btn btn-ghost normal-case">
              <NavLink className="text-primary-content" to="/auth">
                Acceso <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </li>
          ))}
      </div>
    </div>
  );
}
