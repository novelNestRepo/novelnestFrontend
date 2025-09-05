# NovelNest Frontend

This is the frontend interface for NovelNest, a social reading platform with AI chat capabilities and voice channels, build with Next.js.

## Features

- Overview of New Releases and Friends Activity.
- Personal Library, to keep track of one's owned and wishlisted books.
- Reading History, to keep track of one's reading progress.
- Bookmarks, to get back to specific sections.
- AI Chatbot, to help suggest books.
- Voice Channels, to discuss books with authors and the community.

## Tech Stack

- Next.js.
- TanStack Query.
- Supabase.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Supabase project (get your API keys from the Supabase dashboard)

### Setup

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd novelNestFrontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create `.env` and fill in your Supabase credentials:
     ```env
     SUPABASE_URL=your-supabase-url
     SUPABASE_ANON_KEY=your-anon-key
     SUPABASE_SERVICE_KEY=your-service-key
     NEXT_PUBLIC_API_URL=http://localhost:4000
     ```
4. Run the server:
   ```sh
   npm run dev
   ```

<!-- ### Running Tests

```sh
npm test
``` -->

<!-- ## API Endpoints

- `/api/user/register` — Register a new user
- `/api/user/login` — Login
- `/api/user/logout` — Logout
- `/api/user/request-password-reset` — Request password reset
- `/api/user/resend-email-verification` — Resend verification email
- `/api/user/me` — Get current user info
- `/api/channels` — List, create, join, leave, and manage channels
- `/api/messages` — Messaging endpoints -->

## Voice Channels (WebRTC)

- WebRTC signaling is handled via Socket.IO events.
