import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export default function Splat404() {
  const attempted_route = useLoaderData<typeof loader>();

  return (
    <main className="bg-base-100 h-screen">
      <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-[max(50%,36rem),1fr] h-full">
        <div className="mx-auto my-auto w-full max-w-7xl px-6 py-24 sm:py-32 col-span-1 col-start-1 row-start-1 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:row-span-1 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base font-semibold leading-8 text-info">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              Página no encontrada
            </h1>
            <p className="mt-6 text-base leading-7 text-secondary">
              Lo sentimos, no pudimos encontrar la página que estás buscando.
            </p>
            <p className="mt-6 text-base leading-7 text-accent">
              /{attempted_route}
            </p>
            <div className="mt-10">
              <Link
                to="/"
                className="text-sm font-semibold leading-7 text-info"
              >
                <span aria-hidden="true">&larr;</span> Inicio
              </Link>
            </div>
          </div>
        </div>
        <div className="col-start-1 row-start-2 row-end-4 relative lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:block">
          <img
            src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}

export function loader({ params }: LoaderFunctionArgs) {
  return Object.values(params);
}
