import React from 'react'
import Link from 'next/link'

const Testimonial: React.FC = () => {
  return (
    <section
      className='bg-grey overflow-hidden'
      id='testimonial-section'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center'>
          <p className='text-primary text-lg tracking-widest uppercase mb-4'>
            testimonials
          </p>
          <h2 className='mb-6'>See what others are saying.</h2>
          <div className='bg-white rounded-3xl p-16 max-w-2xl mx-auto mt-12 shadow-sm'>
            <div className='text-6xl mb-6'>⭐</div>
            <h3 className='text-2xl font-bold text-black/40 mb-4'>
              Client reviews coming soon.
            </h3>
            <p className='text-lg text-black/50 mb-8 leading-relaxed'>
              We&apos;re busy delivering results for our clients. Testimonials
              will appear here shortly — in the meantime, reach out and we&apos;ll
              connect you with a current client directly.
            </p>
            <Link
              href='#contact'
              className='inline-block text-lg py-4 px-10 font-semibold text-white rounded-full bg-primary hover:opacity-90 transition-opacity'>
              Talk to a Client
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
