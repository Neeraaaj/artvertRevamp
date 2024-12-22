import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mural Interiors',
  description: 'Welcome to Mural Interior: Redefining Spaces with Custom Murals and Bold Branding Artworks. Transform interiors and make a statement with our unique murals designed to captivate and inspire, whether for homes, businesses, or iconic advertising campaigns.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={`${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
