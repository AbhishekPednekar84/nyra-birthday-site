import { Audiowide } from "next/font/google";
import "./globals.css";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-audiowide",
});

export const metadata = {
  title: "It's Nyra's Birthday!",
  description: "You are invited to Nyra's birthday party!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${audiowide.className}  antialiased`}>{children}</body>
    </html>
  );
}
