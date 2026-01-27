# Star Wars Strongest Next

## Project Overview

This project is a web application built with [Next.js](https://nextjs.org/) to determine the strongest Star Wars character. It utilizes a modern tech stack including Tailwind CSS for styling and Prisma for database management.

## Technology Stack

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database ORM**: Prisma
- **Linting**: ESLint

## Project Structure

- **src/**: Source code for the application.
- **prisma/**: Prisma schema and migrations.
- **public/**: Static assets.
- **app/**: (Implied within src or root) Next.js App Router directory.

## Getting Started

### Prerequisites

- Node.js
- npm / yarn / pnpm

### Installation

1. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Build the application for production:

```bash
npm run build
```

### Database

Run Prisma migrations (if applicable) or push schema:

```bash
npx prisma db push
```

## detailed Guidelines

- **Aesthetics**: The project uses Tailwind CSS. Ensure all new components utilize Tailwind utility classes for consistent styling.
- **Code Style**: Follow the rules defined in `.eslintrc.json` and `tsconfig.json`.
