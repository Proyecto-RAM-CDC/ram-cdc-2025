import {
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

interface ErrorDetails {
  status?: number | undefined;
  data?: {
    message?: string;
  };
}

interface IProps {
  errorType: string;
  error: ErrorDetails | unknown;
}

function isErrorDetails(error: unknown): error is ErrorDetails {
  return (
    (error as ErrorDetails).status !== undefined ||
    (error as ErrorDetails).data !== undefined
  );
}

const RootErrorBoundary: React.FC<IProps> = ({ errorType, error }) => {
  let status: number | string = "Error desconocido";
  let message: string = "No hay mensaje de error disponible";

  if (isErrorDetails(error)) {
    status = error.status ?? "Error desconocido";
    message = error.data?.message ?? "No hay mensaje de error disponible";
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>{errorType}</title>
      </head>
      <body className="h-full">
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">
              {errorType}
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              An error occurred
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Status: {status}
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Message: {message}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Inicio
              </Link>
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default RootErrorBoundary;
