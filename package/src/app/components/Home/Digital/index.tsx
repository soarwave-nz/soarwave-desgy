'use client'
import React from 'react'
import Link from 'next/link'

const Digital = () => {
  return (
    <section className='relative bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className="rounded-3xl bg-primary bg-[url('/images/digital/bg.svg')] bg-no-repeat bg-right-top lg:pb-40 pb-24 relative">
          <div className='grid grid-cols-1 xl:grid-cols-2'>
            <div className='pt-16 lg:pt-24 lg:pl-24 px-8'>
              <p className='text-lg font-normal text-white mb-5 tracking-widest text-center lg:text-start uppercase'>
                who we are
              </p>
              <h2 className='text-white mb-8 leading-tight text-center lg:text-start'>
                NZ&apos;s boldest social media marketing agency.
              </h2>
              <p className='text-white/80 text-xl mb-10 text-center lg:text-start leading-relaxed max-w-xl'>
                We don&apos;t do cookie-cutter marketing. Every strategy is
                built around your brand, your audience, and your growth goals.
              </p>
              <div className='text-center lg:text-start'>
                <Link
                  href='#contact'
                  className='text-xl font-semibold text-white bg-deep-slate/80 hover:bg-deep-slate py-4 px-12 rounded-full transition-colors'>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Digital
