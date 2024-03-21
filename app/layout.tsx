import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GeoTag',
  description: 'Explore the world and share your favorite places',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-2 flex justify-center">
          <Link href="/" className="hover:text-gray-400">
            Landing Page
          </Link>
        </footer>
      </body>
    </html>
  )
}