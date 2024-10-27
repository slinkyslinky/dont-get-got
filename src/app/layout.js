import '../styles/globals.css';
import Head from "next/head";


export const metadata = {
  title: "Don't get got!",
  description: 'Game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

    <body>{children}</body>
    </html>
  )
}
