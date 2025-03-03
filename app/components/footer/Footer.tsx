import { NavLink } from "@remix-run/react";
import { useState, useEffect, MouseEvent } from "react";
import { themeChange } from "theme-change";
import LeavePage from "~/components/navigation/ConfirmLeaving";

const navigation = {
  main: [
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Política de Privacidad", href: "/privacy" },
  ],
};

export default function Footer() {
  const [showWarning, setShowWarning] = useState(false);
  const [externalLink, setExternalLink] = useState("");

  const handleExternalLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as HTMLAnchorElement;
    if (!target.href.startsWith(window.location.origin)) {
      event.preventDefault();
      setShowWarning(true);
      setExternalLink(target.href);
    }
  };

  const handleConfirm = () => {
    setShowWarning(false);
    window.location.href = externalLink;
  };

  const handleCancel = () => {
    setShowWarning(false);
  };

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <footer className="footer footer-center z-10 px-10 min-h-28 md:h-48 py-2 bg-primary footervirus bg-cover bg-center text-primary-content object-bottom border-t-4 border-accent">
      {showWarning && (
        <LeavePage
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          targetURL={externalLink}
        />
      )}

      <div className="grid gap-2">
        <nav className="navbar" aria-label="Footer">
          <ul className="flex flex-col md:flex-row justify-center md:justify-start md:space-x-2">
            {navigation.main.map((item) => (
              <div key={item.name} className="mx-2">
                <NavLink
                  to={item.href}
                  onClick={handleExternalLinkClick}
                  className="btn btn-ghost normal-case"
                >
                  {item.name}
                </NavLink>
              </div>
            ))}

            <div className="dropdown dropdown-top ml-2 col-start-1 md:col-start-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost normal-case"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                role="menu"
                className="menu dropdown-content p-2 shadow bg-primary rounded-box w-52 mt-4 font-semibold"
              >
                <li>
                  <button data-set-theme="mexico" data-act-class="ACTIVECLASS">
                    México lindo y querido!
                  </button>
                </li>
                <li>
                  <button data-set-theme="pastel" data-act-class="ACTIVECLASS">
                    Pastel
                  </button>
                </li>
                <li>
                  <button data-set-theme="night" data-act-class="ACTIVECLASS">
                    Noche de neón
                  </button>
                </li>
                <li>
                  <button data-set-theme="mytheme" data-act-class="ACTIVECLASS">
                    Pie de limón
                  </button>
                </li>
                <li>
                  <button
                    data-set-theme="synthwave"
                    data-act-class="ACTIVECLASS"
                  >
                    Synth
                  </button>
                </li>
                <li>
                  <button data-set-theme="coffee" data-act-class="ACTIVECLASS">
                    Café
                  </button>
                </li>
                <li>
                  <button data-set-theme="sonora" data-act-class="ACTIVECLASS">
                    Sonora - Tierra de Oportunidades
                  </button>
                </li>
                <li>
                  <button data-set-theme="issste" data-act-class="ACTIVECLASS">
                    ISSSTE
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
