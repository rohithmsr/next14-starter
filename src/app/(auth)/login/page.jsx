import { auth, signIn } from "@/lib/auth";

const Page = async () => {
  const handleGithubLogin = async () => {
    "use server";

    await signIn("github");
  };

  const session = await auth();
  console.log("session: ", session);

  return (
    <div>
      <form action={handleGithubLogin}>
        <button type="submit">Login with Github</button>
      </form>
    </div>
  );
};

export default Page;
