'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hero = () => {
  const leftAnimation = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  const rightAnimation = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section className='relative overflow-hidden z-1'>
      <div className='container mx-auto pt-24 max-w-7xl px-4'>
        <div className='grid grid-cols-12 justify-center items-center'>
          {/* Left — copy */}
          <motion.div
            {...leftAnimation}
            className='col-span-12 xl:col-span-5 lg:col-span-6 md:col-span-12 sm:col-span-12'>
            <div className='py-2 px-5 bg-primary/15 rounded-full w-fit mb-6'>
              <p className='text-primary text-sm font-bold tracking-widest uppercase'>
                NZ&apos;s Boldest SMMA Agency
              </p>
            </div>
            <h1 className='leading-tight'>
              Your Growth,{' '}
              <span style={{ color: '#E8793A' }}>Amplified</span>
            </h1>
            <p className='text-xl font-medium text-black/60 mt-6 max-w-lg leading-relaxed'>
              We help ambitious NZ brands dominate their market through
              strategic social media, high-converting paid ads, and brand
              identity that commands attention.
            </p>
            <div className='mt-10 flex flex-wrap gap-4'>
              <Link href='#contact'>
                <button className='bg-primary text-white text-xl font-semibold py-5 px-12 rounded-full hover:opacity-90 hover:cursor-pointer transition-opacity'>
                  Get Started
                </button>
              </Link>
              <Link href='#services'>
                <button className='bg-transparent text-primary border-2 border-primary text-xl font-semibold py-5 px-12 rounded-full hover:bg-primary hover:text-white hover:cursor-pointer transition-all'>
                  Our Services
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            {...rightAnimation}
            className='xl:col-span-7 lg:col-span-6 lg:block hidden'>
            <Image
              src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
              alt='Marketing analytics dashboard'
              width={600}
              height={600}
              className='w-full rounded-2xl'
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
