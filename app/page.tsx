"use client"
// app/page.tsx
import React, { useEffect } from 'react';
import Link from 'next/link'
import { useTheme } from '../lib/hooks/useTheme'
import Logo from '../components/ui/Logo'
import GradientBackground from '../components/ui/GradientBackground'

export default function HomePage() {
  const { user } = useTheme();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <GradientBackground />
      
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Vercel logo placeholder */}
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center mt-16">
        <Logo size="large" priority={true} className="scale-150" />
      </div>
      
      <div className="mb-0 flex flex-col lg:flex-row gap-6 justify-center items-center max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Link
              href="/signup"
              className="items-center place-items-center group rounded-lg border border-white/30 px-6 py-4 transition-colors hover:border-white/50 hover:bg-white/10 min-w-[160px]"
            >
              <h2 className="mb-3 text-2xl font-semibold text-white">
                Sign up{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm text-white/80">
                Create an account and get programming help.
              </p>
            </Link>
            
            <Link
              href="/login"
              className="place-items-center group rounded-lg border border-white/30 px-6 py-4 transition-colors hover:border-white/50 hover:bg-white/10 min-w-[160px]"
            >
              <h2 className="mb-3 text-2xl font-semibold text-white">
                Login{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm text-white/80">
                Log into an existing account.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* By Yash Verma & Rahul Paul - moved to bottom right */}
      <div className="fixed bottom-12 right-12 z-20">
        <p className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 px-4 py-2 shadow-lg font-mono text-sm text-white">
          By <a href="https://github.com/yash-yv-verma" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-300 mx-1">Yash Verma</a> & <a href="https://github.com/RPaul07" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-300 mx-1">Rahul Paul</a>&nbsp;
        </p>
      </div>
    </main>
  )
}