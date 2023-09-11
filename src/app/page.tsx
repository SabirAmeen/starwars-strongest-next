import Header from './components/Header/Header';
import HomePageContainer from './HomePageContainer';

export default function Home() {
  return (
    <>
      <main className="h-full">
        <Header />
        <section className="h-full flex items-center main-section">
          <HomePageContainer />
        </section>
      </main>
      <footer className="fixed bottom-0 left-0 right-0 text-center bg-[var(--app-background)]">
        Made with ♡ by <a href="https://github.com/SabirAmeen" target="_blank">Sabir Ameen</a>
      </footer>
    </>
  )
}
