// app/utilities/ErrorBody.tsx
import { isRouteErrorResponse } from "@remix-run/react";
import { parse } from "node-html-parser";

interface ErrorBodyProps {
  error: unknown;
  routetext: string;
  className?: string;
}

export function ErrorBody({ error, routetext, className }: ErrorBodyProps) {
  // When errors are thrown server-side, Remix attempts to serialize them into a valid
  // JSON format. If the error object is non-serializable or the response is truncated,
  // the client receives an incomplete or malformed error object.
  // This therefore is a more foolproof way to check if the error is an instance of 'Error'.
  console.log("Error object:", error);

  // This is what used to go to 'CatchBoundary' in Remix v1.
  // When a 'Response' is thrown, it will be automatically unwrapped into an 'ErrorResponse'
  // instance with 'state'/'statusText'/'data' fields.
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1 className="font-bold text-primary text-base md:text-xl">
          {error.status} {error.statusText}
        </h1>
        <p>{error.data.message}</p>
      </div>
    );
  } else if (error instanceof Error) {
    let errorMessage = error.message;
    let errorTitle = "Error";
    let errorDescription = "";

    // Check if the error message contains HTML.
    if (errorMessage.includes("<HTML>")) {
      const root = parse(errorMessage);
      errorTitle = root.querySelector("TITLE")?.innerText || "Error";
      errorDescription = root.querySelector("B")?.innerText || errorMessage;
    } else {
      errorDescription = errorMessage;
    }

    return (
      <div className={`${className}`}>
        <h1 className="font-bold">{errorTitle}</h1>
        <h2 className="mt-5 font-bold">The keys available in the error are:</h2>
        <pre className="overflow-x-scroll overflow-y-scroll h-32">
          {Object.keys(error).join(", ")}
        </pre>
        <h2 className="mt-8 font-bold">The message is:</h2>
        <pre className="overflow-x-scroll overflow-y-scroll h-32">
          {errorDescription}
        </pre>
        <h2 className="mt-8 font-bold">The stack trace is:</h2>
        <pre className="overflow-x-scroll overflow-y-scrol h-32">
          {error.stack}
        </pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
