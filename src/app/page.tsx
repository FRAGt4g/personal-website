import { redirect } from "next/navigation";

const Page = () => {
  redirect("/about");
  return null;
};

export default Page;
