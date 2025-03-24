# BabyNewton 🚀

BabyNewton is an innovative educational platform that transforms mathematical problems into engaging video explanations using AI. Our platform combines OpenAI's API, Manim for mathematical animations, and text-to-speech technology to create comprehensive, accessible math tutorials.

## Features

- 🤖 AI-powered problem analysis and solution generation
- 🎥 Beautiful mathematical animations using Manim
- 🔊 Natural text-to-speech explanations
- 📝 Synchronized subtitles
- 👤 User authentication and progress tracking
- 💬 Interactive AI chatbot for additional help
- 📱 Responsive, modern UI design

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL
- **Animation**: Manim
- **AI**: OpenAI API
- **Text-to-Speech**: OpenAI Whisper
- **Subtitles**: WebVTT

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
