import { LandingWrapper } from "@/components/LandingWrapper";
import { notFound, redirect } from "next/navigation";
import { daysInNumbers } from "@/utils/helpers";
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

  if (res?.data && !res?.data?.invitee?.child) {
    redirect(`/invited?invitee_identifier=${identifier}`);
  }

  const daysToParty = daysInNumbers();

  if (daysToParty < 0) {
    return (
      <main>
        <section className="h-screen overflow-hidden flex justify-center items-center mx-10 lg:mx-5 text-cyan-300 font-stretch-50% glow">
          <p className="text-center text-md">
            Congratulations on completing your mission, commander{" "}
            {res?.data?.invitee?.name}!
          </p>
        </section>
      </main>
    );
  }

  return (
    <main>
      <LandingWrapper apiResponse={res.data} />
    </main>
  );
}
