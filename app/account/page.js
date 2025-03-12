import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();
  const firstNameSplit = session.user.name.split(" ");
  const firstName= firstNameSplit[0]
  console.log('firstname', firstNameSplit[0])
  console.log(session)
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
