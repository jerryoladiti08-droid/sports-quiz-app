import './globals.css'

export const metadata = {
  title: 'Sports Quiz App',
  description: 'Test your sports knowledge!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
