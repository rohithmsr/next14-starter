"use client";

import { register } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [router, state?.success]);

  return (
    <div>
      <form className={styles.form} action={formAction}>
        <input type="text" placeholder="Username" name="username" />
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input
          type="password"
          placeholder="Confirm Password"
          name="passwordRepeat"
        />
        <button type="submit">Register</button>
        {state?.error}
        <Link href="/login">
          Have an account? <b>Login</b>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
