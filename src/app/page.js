import { LandingWrapper } from "@/components/LandingWrapper";
import { notFound, redirect } from "next/navigation";
import axios from "axios";

export default async function Home({ searchParams }) {
  const identifier = searchParams.invitee_identifier;
  let res = {};

  try {
    res = await axios.get(
      `${process.env.API_URL}/invitees?invitee_identifier=${identifier}`
    );
  } catch (error) {
    redirect("/404");
  }

  if (res?.data && (res?.data?.invitee?.rsvp || !res?.data?.invitee?.child)) {
    redirect(`/invited?invitee_identifier=${identifier}`);
  }

  return (
    <main>
      <LandingWrapper apiResponse={res.data} />
    </main>
  );
}
