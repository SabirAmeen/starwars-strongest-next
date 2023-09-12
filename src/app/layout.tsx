import './globals.css'
import type { Metadata } from 'next';
import Header from './components/Header/Header';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Star Wars Strongest',
  description: 'A WebApp to find the strongest Star Wars character',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="h-full">
          <Header />
          <section className="h-full flex items-center main-section">
            {children}
          </section>
        </main>
        <footer className="fixed bottom-0 left-0 right-0 text-center bg-[var(--app-background)]">
          Made with ♡ by <a href="https://github.com/SabirAmeen" target="_blank">Sabir Ameen</a>
        </footer>
      </body>
    </html>
  )
}
