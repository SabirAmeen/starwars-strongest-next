import Link from 'next/link'


const Header = () => {
  return (
    <header
      className="px-5 flex justify-between top-0 left-0 w-full mx-auto right-0 text-center font-main items-center text-[30px] bg-[var(--app-background)] max-w-[1024px] lg:px-20 py-5">
      <Link href='/' className="text-left text-lg">
        Home
      </Link>
      <Link href='/leaderboard' className="text-lg">
        Leaderboard
      </Link>
    </header>
  )
}

export default Header;