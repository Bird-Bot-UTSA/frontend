# Math.AI - Learn Math with AI

A modern, responsive web application that provides personalized math tutoring powered by artificial intelligence. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🤖 **AI-Powered Learning**: Intelligent math assistance with personalized explanations
- 🌙 **Dark/Light Mode**: System-aware theme switching with persistent preferences
- 🌍 **Multi-language Support**: Choose from 10 different languages
- 👤 **User Profiles**: Manage your personal information and preferences
- 💬 **Real-time Chat**: Interactive chat interface for math problem solving
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Built with Next.js for optimal speed and SEO

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks with localStorage
- **Deployment**: Vercel-ready

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── chat/              # Chat interface
│   ├── login/             # Authentication pages
│   ├── profile/           # User profile management
│   ├── signup/            # User registration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
│       ├── Button.tsx    # Reusable button component
│       ├── Card.tsx      # Card container component
│       ├── FormInput.tsx # Form input component
│       ├── FormSelect.tsx # Form select component
│       ├── Logo.tsx      # Logo component
│       └── PageLayout.tsx # Page layout wrapper
├── lib/                  # Utility functions and hooks
│   ├── constants.ts      # App constants and configuration
│   ├── theme.ts          # Theme management utilities
│   ├── hooks/            # Custom React hooks
│   │   └── useTheme.ts   # Theme management hook
│   └── api-client.ts     # API client utilities
├── public/               # Static assets
│   └── MathAI.png        # Application logo
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd math-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Highlights

### Component Design
- **Reusable Components**: All UI elements are modular and reusable
- **Type Safety**: Full TypeScript coverage for better development experience
- **Consistent Styling**: Unified design system with Tailwind CSS

### State Management
- **Local Storage**: User preferences and data persist across sessions
- **Theme System**: Automatic theme detection with manual override options
- **Form Validation**: Client-side validation with error handling

### Performance Optimizations
- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Optimized images with Next.js Image component
- **Bundle Optimization**: Minimal dependencies for faster loading

## Features in Detail

### Authentication System
- User registration with email validation
- Secure login with password requirements
- Persistent user sessions

### Profile Management
- Editable user information
- Language preference selection
- Theme customization (System/Light/Dark)

### Chat Interface
- Real-time message display
- Typing indicators
- Responsive message bubbles
- Auto-scroll to latest messages

### Theme System
- System preference detection
- Manual theme override
- Persistent theme selection
- Smooth transitions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Backend API integration
- [ ] Real AI math tutoring
- [ ] User progress tracking
- [ ] Math problem generation
- [ ] Voice input support
- [ ] Mobile app version

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Yash Verma** - [GitHub](https://github.com/yash-yv-verma)
- **Rahul Paul** - [GitHub](https://github.com/RPaul07)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
