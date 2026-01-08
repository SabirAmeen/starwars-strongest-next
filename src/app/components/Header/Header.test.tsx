import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'
import { describe, it, expect } from 'vitest'

describe('Header', () => {
  it('renders the header with home and leaderboard links', () => {
    render(<Header />)

    const homeLink = screen.getByRole('link', { name: /home/i })
    const leaderboardLink = screen.getByRole('link', { name: /leaderboard/i })

    expect(homeLink).toBeInTheDocument()
    expect(leaderboardLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    expect(leaderboardLink).toHaveAttribute('href', '/leaderboard')
  })
})
