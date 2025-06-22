import { Invited } from "@/components";
import { redirect } from "next/navigation";
import { daysInNumbers } from "@/utils/helpers";

import axios from "axios";

export default async function InvitedPage({ searchParams }) {
  const identifier = searchParams.invitee_identifier;

  let res = {};

  try {
    res = await axios.get(
      `${process.env.API_URL}/invitees?invitee_identifier=${identifier}`
    );
  } catch (error) {
    redirect("/404");
  }

  const daysToParty = daysInNumbers();

  // For children who have not RSVP'ed, redirect to the home page
  if (
    res?.data?.invitee?.child &&
    // !res?.data?.invitee?.rsvp &&
    daysToParty < 0
  ) {
    redirect(`/?invitee_identifier=${identifier}`);
  }

  return (
    <main>
      <Invited apiResponse={res?.data} />
    </main>
  );
}
