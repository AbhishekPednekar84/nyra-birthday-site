import { Audiowide, Schoolbell } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-audiowide",
});

const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-schoolbell",
});

export async function generateMetadata() {
  return {
    title: "It's Nyra's Birthday!",
    description: "You are invited to Nyra's birthday party!!",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${audiowide.variable} ${schoolbell.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>It's Nyra's Birthday!</title>
        <meta name="title" content="It's Nyra's Birthday!" />
        <meta
          name="description"
          content="You're invited to Nyra's outer space birthday party! 🎂🌌 Come celebrate with us."
        />
        <meta charSet="UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyrasbirthday.xyz/" />
        <meta property="og:title" content="It's Nyra's Birthday!" />
        <meta
          property="og:description"
          content="You're invited to Nyra's outer space birthday party! 🎂🌌 Come celebrate with us."
        />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/puppyparty25/nyra-birthday-25/invited-large.png?updatedAt=1749378835868"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://nyrasbirthday.xyz/" />
        <meta name="twitter:title" content="It's Nyra's Birthday!" />
        <meta
          name="twitter:description"
          content="You're invited to Nyra's outer space birthday party! 🎂🌌 Come celebrate with us."
        />
        <meta
          name="twitter:image"
          content="https://ik.imagekit.io/puppyparty25/nyra-birthday-25/invited-large.png?updatedAt=1749378835868"
        />

        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${audiowide.className}  antialiased`}>{children}</body>
    </html>
  );
}
