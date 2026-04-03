'use client'
import React from 'react'
import Link from 'next/link'

const Dedicated = () => {
  return (
    <section className='relative bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          {/* Left — stats */}
          <div className='grid grid-cols-2 gap-6'>
            {[
              { number: '50+', label: 'Happy Clients' },
              { number: '3M+', label: 'Monthly Reach' },
              { number: '98%', label: 'Client Retention' },
              { number: '4+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div
                key={i}
                className='bg-grey rounded-3xl p-8 text-center'>
                <p className='text-5xl font-extrabold text-primary mb-2'>
                  {stat.number}
                </p>
                <p className='text-base font-semibold text-black/60 uppercase tracking-wider'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right — copy */}
          <div>
            <p className='text-primary text-lg font-bold tracking-widest uppercase mb-4'>
              About Soarwave
            </p>
            <h2 className='leading-tight mb-6'>
              We help NZ brands{' '}
              <span style={{ color: '#E8793A' }}>punch above</span> their
              weight.
            </h2>
            <p className='text-xl font-medium text-black/60 mb-5 leading-relaxed'>
              Soarwave was born from a simple belief: New Zealand businesses
              deserve world-class marketing, not watered-down offshore
              strategies. We&apos;re a lean, senior-led team obsessed with
              outcomes.
            </p>
            <p className='text-xl font-medium text-black/60 mb-10 leading-relaxed'>
              From Wellington startups to Auckland scaleups, we partner with
              brands ready to invest in real growth. No vanity metrics. No
              fluff. Just compounding, measurable results.
            </p>
            <Link
              href='#contact'
              className='text-xl py-5 px-14 font-semibold text-white rounded-full bg-primary border border-primary hover:opacity-90 transition-opacity'>
              Work With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dedicated
