// Public facing home page.
import { Link } from "@remix-run/react";
import RandomImage from "~/utilities/ImageGenerator";

import Sponsors from "~/utilities/Sponsors";

export default function Index() {
  return (
    <main className="flex-auto w-screen bg-gradient-to-br from-base-100 from-50% to-base-300 to-95%">
      <div className="mx-auto max-w-7xl pt-10 lg:pt-24 pb-6 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:mt-8 lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-14 lg:gap-y-6">
          <div className="lg:grid lg:grid-rows-2 lg:gap-y-6">
            <h1 className="max-w-2xl text-xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-primary">
              Uso de antibióticos en unidades de primer nivel de atención
            </h1>
            <div className="mt-6 max-w-2xl lg:mt-0">
              <p className="text-sm sm:text-lg md:text-xl font-semibold leading-6 sm:leading-8 text-accent">
                Consenso Interinstitucional del Sistema de Salud Estrategia
                CRAM.
              </p>
              <div className="mt-6 sm:mt-10 flex items-center gap-x-6">
                <Link
                  to="/auth"
                  className="btn btn-xs btn-secondary sm:btn-sm md:btn-md normal-case"
                >
                  Empezar
                </Link>
                <Link
                  to="/about"
                  className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-primary normal-case"
                >
                  Aprende más
                </Link>
              </div>
            </div>
          </div>
          <RandomImage
            duration={10}
            altText="Random Mexico vista"
            classes="aspect-[6/5] object-cover w-8/12 lg:w-full max-w-sm lg:max-w-lg 2xl:max-w-2xl rounded-2xl shadow-xl border-2 border-secondary mx-auto my-6"
          />
        </div>
      </div>
      <Sponsors />
    </main>
  );
}

export function headers() {
  return {
    "Cache-Control": "public, max-age=3600", // Only after 1 hour will a fresh copy be requested.
  };
}
