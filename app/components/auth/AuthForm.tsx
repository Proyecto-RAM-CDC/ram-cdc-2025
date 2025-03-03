// app/components/auth/AuthForm.tsx
import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
} from "@remix-run/react";
import LockClosedIcon from "~/icons/lock_closed";
import UserPlusIcon from "~/icons/user_plus";
import UserIcon from "~/icons/user_icon";
import LoginForm from "~/components/auth/LoginForm";
import SignupForm from "~/components/auth/SignupForm";
import ForgotPasswordForm from "~/components/auth/ForgotPassword";
import { AuthMode } from "~/utilities/types";

interface ActionData {
  error?: {
    [key: string]: string;
  };
}

const isAuthMode = (value: string | null): value is AuthMode =>
  ["login", "signup", "forgot-password"].includes(value ?? "");

const getCaptions = (authMode: AuthMode) => {
  switch (authMode) {
    case "forgot-password":
      return {
        submitBtnCaption: "Enviar código de reinicio",
        toggleBtnCaption: "Iniciar sesión",
      };
    case "signup":
      return {
        submitBtnCaption: "Crear cuenta",
        toggleBtnCaption: "Iniciar sesión con el usuario existente",
      };
    default:
      return {
        submitBtnCaption: "Iniciar sesión",
        toggleBtnCaption: "Crear un nuevo usuario",
      };
  }
};

// The AuthForm component - used by both the login and signup routes.
const AuthForm: React.FC = () => {
  // TypeScript can infer types for these hooks, so explicit typing is not necessary.
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData<ActionData>();

  // Get the `mode` query parameter from the URL. If it is not set, default to "login".
  // Determine whether the user is logging in or signing up.
  const modeParam = searchParams.get("mode");
  const authMode: AuthMode = isAuthMode(modeParam) ? modeParam : "login";
  if (!["login", "signup", "forgot-password"].includes(authMode)) {
    throw new Error("Modo de autenticación desconocido.");
  }

  // Get the caption for the submit and toggle buttons.
  const { submitBtnCaption, toggleBtnCaption } = getCaptions(authMode);
  const isSubmitting = navigation.state !== "idle";

  const formComponents: { [key in AuthMode]: React.FC } = {
    login: LoginForm,
    signup: SignupForm,
    "forgot-password": ForgotPasswordForm,
  };

  const FormComponent = formComponents[authMode];

  // Render and return the form.
  return (
    <main className="flex-auto w-screen bg-gradient-to-br from-base-100 from-50% to-base-300 to-95%">
      <Form
        method="post"
        className="mx-auto my-40 w-5/6 md:w-8/12 max-w-3xl py-10 rounded-lg shadow-xl text-center bg-secondary"
      >
        <div className="text-2xl w-16 h-16 inline-flex justify-center items-center mb-4">
          {authMode === "login" ? (
            <LockClosedIcon aria-label="Login" className="text-accent" />
          ) : authMode === "signup" ? (
            <UserPlusIcon aria-label="Signup" className="text-accent" />
          ) : (
            <UserIcon aria-label="Forgot Password" className="text-accent" />
          )}
        </div>

        <FormComponent />

        {validationErrors?.error && (
          <ul className="px-4">
            {Object.entries(validationErrors.error).map(
              ([field, error], index) => (
                <li
                  key={`${field}-${index}`}
                  className="font-semibold text-secondary-content text-sm"
                  aria-live="assertive"
                  role="alert"
                >
                  {error}
                </li>
              )
            )}
          </ul>
        )}

        <div className="mt-8 items-center gap-4 flex flex-col">
          <button
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="btn btn-accent text-accent-content"
            aria-roledescription="link"
          >
            <p aria-live="polite" role="link">
              {isSubmitting ? "Autenticando ..." : submitBtnCaption}
            </p>
          </button>

          {authMode === "login" && (
            <div className="mt-2 items-center gap-4 flex flex-col">
              <Link
                to="?mode=forgot-password"
                className="mt-2 text-sm font-semibold italic text-secondary-content"
                aria-label="Forgot password link"
                aria-roledescription="link"
                role="link"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>
          )}
          <Link
            to={authMode === "login" ? "?mode=signup" : "?mode=login"}
            className="mt-2 text-sm font-semibold italic text-secondary-content"
            aria-label="Toggle authentication mode"
            aria-roledescription="link"
            role="link"
          >
            {toggleBtnCaption}
          </Link>
        </div>
      </Form>
    </main>
  );
};

export default AuthForm;
