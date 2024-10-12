import { register } from "@/lib/action";
import styles from "./register.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={register}>
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordRepeat"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
