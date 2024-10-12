import { handleGithubLogin, login } from "@/lib/action";

const Page = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button type="submit">Login with Github</button>
      </form>
      <form action={login}>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Login with Credentials</button>
      </form>
    </div>
  );
};

export default Page;
