export const metadata = {
  title: "Invite not found :(",
  description: "Oops! This page doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-lg lg:text-2xl text-zinc-100">
      {"Sorry, couldn't find your invite"}
    </div>
  );
}
