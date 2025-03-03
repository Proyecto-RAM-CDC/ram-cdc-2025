import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import {
  AuthMode,
  LoginCredentials,
  SignupCredentials,
} from "~/utilities/types";
import { signup, login } from "~/server/auth.server";

vi.mock("~/server/auth.server", () => ({
  login: vi.fn(),
  signup: vi.fn(),
}));

// Mock ValidationError class
class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = statusCode;

    // Fix prototype chain.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// Mock processCredentials function
const processCredentials = async (
  authMode: AuthMode,
  credentials: LoginCredentials | SignupCredentials
) => {
  if (authMode === "login") {
    return await login(credentials as LoginCredentials);
  } else if (authMode === "signup") {
    return await signup(credentials as SignupCredentials);
  } else if (authMode === "forgot-password") {
    // Put the email sending functionality here.
    //
    // And if successful, redirect the user to the login page.
    return { redirect: "/auth?mode=login" };
  }
  throw new ValidationError(`Modo de autenticación desconocido: ${authMode}.`);
};

describe("processCredentials", () => {
  const loginCredentials: LoginCredentials = {
    email: "test@example.com",
    password: "password123",
    whichEstado: "CDMX",
  };
  const signupCredentials: SignupCredentials = {
    nombre: "Test",
    apellidoPaterno: "User",
    license: "123456",
    institution: "UNAM",
    whichEstado: "CDMX",
    email: "test@example.com",
    password: "password123",
  };

  it("should call login with login credentials when authMode is login", async () => {
    // @ts-ignore: Ignore TypeScript error ts(2503)
    (login as vi.Mock).mockResolvedValue({ success: true });

    const result = await processCredentials("login", loginCredentials);

    expect(login).toHaveBeenCalledWith(loginCredentials);
    expect(result).toEqual({ success: true });
  });

  it("should call signup with signup credentials when authMode is signup", async () => {
    // @ts-ignore: Ignore TypeScript error ts(2503)
    (signup as vi.Mock).mockResolvedValue({ success: true });

    const result = await processCredentials("signup", signupCredentials);

    expect(signup).toHaveBeenCalledWith(signupCredentials);
    expect(result).toEqual({ success: true });
  });

  it("should return redirect object when authMode is forgot-password", async () => {
    const result = await processCredentials(
      "forgot-password",
      signupCredentials
    );

    expect(result).toEqual({ redirect: "/auth?mode=login" });
  });

  it("should throw ValidationError for unknown authMode", async () => {
    await expect(
      processCredentials("unknown" as AuthMode, loginCredentials)
    ).rejects.toThrow(ValidationError);
  });
});
