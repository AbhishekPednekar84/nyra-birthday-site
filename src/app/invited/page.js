import { Invited } from "@/components";
import { redirect } from "next/navigation";

import axios from "axios";

export default async function InvitedPage({ searchParams }) {
  const identifier = await searchParams.invitee_identifier;

  let res = {};

  try {
    res = await axios.get(
      `${process.env.API_URL}/invitees?invitee_identifier=${identifier}`
    );
  } catch (error) {
    redirect("/404");
  }

  console.log(res.data);

  return (
    <main>
      <Invited apiResponse={res?.data} />
    </main>
  );
}
