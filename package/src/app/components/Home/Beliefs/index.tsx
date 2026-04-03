'use client'
import React from 'react'
import Link from 'next/link'

const trustBadges = [
  {
    heading: 'NZ Based & Operated',
    description:
      'We understand the NZ market, culture, and consumer behaviour in ways offshore agencies simply can\'t. Local insight, world-class execution.',
    bg: 'bg-primary',
    textColor: 'text-white',
    mutedColor: 'text-white/75',
  },
  {
    heading: 'No Lock-in Contracts',
    description:
      'We earn your business every month. No lock-in contracts, no fine print — just results that keep you coming back. You stay because it works.',
    bg: 'bg-purple',
    textColor: 'text-white',
    mutedColor: 'text-white/75',
  },
  {
    heading: 'Weekly Reporting Included',
    description:
      'Real reporting. Real numbers. Every week you\'ll know exactly what we\'re doing, what\'s working, and where we\'re heading next.',
    bg: 'bg-[#5BB85D]',
    textColor: 'text-white',
    mutedColor: 'text-white/75',
  },
]

const Beliefs = () => {
  return (
    <section className='bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <p className='text-center text-primary text-lg tracking-widest uppercase mb-4'>
          why soarwave
        </p>
        <h2 className='text-center mb-12'>Why brands choose us.</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className={`${badge.bg} pt-12 px-10 pb-12 rounded-3xl flex flex-col`}>
              <h3 className={`${badge.textColor} text-3xl font-bold mb-4`}>
                {badge.heading}
              </h3>
              <p className={`${badge.mutedColor} text-lg leading-relaxed flex-1`}>
                {badge.description}
              </p>
            </div>
          ))}
        </div>
        <div className='text-center mt-12'>
          <Link
            href='#contact'
            className='inline-block text-xl py-5 px-14 font-semibold text-white rounded-full bg-primary border border-primary hover:opacity-90 transition-opacity'>
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Beliefs
