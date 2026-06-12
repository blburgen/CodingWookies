"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/actions/auth";
import { setFlash } from "@/app/lib/flash";
import styles from "@/app/page.module.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signup(firstName, lastName, email, password);
    if (!result.success) {
      setError(result.error ?? "Could not create account.");
    } else {
      await setFlash("success", "Account created successfully! Please sign in.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main} aria-label="Sign up page">
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <h1 className={styles.loginTitle}>Create Your Account</h1>
            <p className={styles.loginSubtitle}>
              Join Handcrafted Haven and start selling your art
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={styles.formInput}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  required
                  autoComplete="given-name"
                  disabled={loading}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={styles.formInput}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Your last name"
                  required
                  autoComplete="family-name"
                  disabled={loading}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.formInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              {error && <p className={styles.formError}>{error}</p>}

              <button type="submit" className={styles.loginButton} disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className={styles.signupPrompt}>
              Already have an account?{" "}
              <a href="/login" className={styles.signupLink}>
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
