"use server";

import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { setSession, clearSession } from "@/app/lib/session";

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: { id: unknown; firstName: string; lastName: string; email: string };
}

/**
 * Login to account
 */
export async function login(email: string, password: string): Promise<AuthResult> {
  if (!email || !password) {
    return { success: false, error: "All fields are required" };
  }

  try {
    const result = await db.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email.toLowerCase()],
    );

    if (result.rows.length === 0) {
      return { success: false, error: "Invalid credentials" };
    }

    const user = result.rows[0] as Record<string, unknown>;
    const storedHash = user.password as string;

    const match = await bcrypt.compare(password, storedHash);

    if (!match) {
      return { success: false, error: "Invalid credentials" };
    }

    await setSession({
      id: user.id as number,
      firstName: user.user_first_name as string,
      lastName: user.user_last_name as string,
      email: user.email as string,
    });

    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.user_first_name as string,
        lastName: user.user_last_name as string,
        email: user.email as string,
      },
    };
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: "Internal server error" };
  }
}

/**
 * Create a new user account.
 */
export async function signup(firstName: string, lastName: string, email: string, password: string): Promise<AuthResult> {
  if (!firstName || !lastName || !email || !password) {
    return { success: false, error: "All fields are required" };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters" };
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    const result = await db.query(
      'INSERT INTO "user" (user_first_name, user_last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, user_first_name, user_last_name, email',
      [firstName, lastName, email.toLowerCase(), hash],
    );

    const user = result.rows[0] as Record<string, unknown>;

    return {
      success: true,
      user: {
        id: user.id,
        firstName: user.user_first_name as string,
        lastName: user.user_last_name as string,
        email: user.email as string,
      },
    };
  } catch (err) {
    if ((err as Record<string, unknown>).code === "23505") {
      return { success: false, error: "An account with that email already exists" };
    }
    console.error("Signup error:", err);
    return { success: false, error: "Internal server error" };
  }
}

export async function logout(): Promise<void> {
  await clearSession();
}
