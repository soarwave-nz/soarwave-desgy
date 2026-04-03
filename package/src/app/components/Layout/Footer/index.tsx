'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { footerlinks } from '@/app/types/footerlinks'

const Footer = () => {
  const [footerlinks, setFooterLinks] = useState<footerlinks[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFooterLinks(data.FooterLinksData)
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }
    fetchData()
  }, [])

  const year = new Date().getFullYear()

  return (
    <div className='bg-black' id='first-section'>
      <div className='container mx-auto max-w-2xl pt-24 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8'>
          {/* Brand column */}
          <div className='col-span-4'>
            <div className='mb-6'>
              <Image
                src='/logo-colored.svg'
                width={160}
                height={50}
                alt='Soarwave'
              />
            </div>
            <p className='text-white/60 text-base leading-relaxed mb-6 max-w-xs'>
              New Zealand&apos;s boldest SMMA agency. We help brands grow
              faster through strategic social, paid ads, and brand design.
            </p>
            <div className='flex items-center gap-4'>
              <div className='footer-icons'>
                <Link href='https://instagram.com' aria-label='Instagram'>
                  <Image
                    src={'/images/footer/instagram.svg'}
                    alt='instagram'
                    width={25}
                    height={20}
                  />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link href='https://twitter.com' aria-label='Twitter / X'>
                  <Image
                    src={'/images/footer/twitter.svg'}
                    alt='twitter'
                    width={25}
                    height={20}
                  />
                </Link>
              </div>
              <div className='footer-icons'>
                <Link href='https://facebook.com' aria-label='Facebook'>
                  <Image
                    src={'/images/footer/vec.svg'}
                    alt='facebook'
                    width={15}
                    height={20}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerlinks.map((item, i) => (
            <div key={i} className='group relative col-span-2'>
              <p className='text-white text-xl font-extrabold mb-9'>
                {item.section}
              </p>
              <ul>
                {item.links.map((link, j) => (
                  <li key={j} className='mb-5'>
                    <Link
                      href={`${link.href}`}
                      className='text-white/70 text-base font-normal hover:text-white hover:underline transition-colors'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className='mx-auto max-w-2xl lg:max-w-7xl'>
        <div className='pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-t border-white/20'>
          <div className='mt-4 grid grid-cols-1 gap-y-4 gap-x-16 sm:grid-cols-2'>
            <div>
              <p className='text-center md:text-start text-white/60 text-base'>
                © {year} Soarwave.nz — All rights reserved.
              </p>
            </div>
            <div className='flex justify-center md:justify-end'>
              <p className='text-white/60 text-base'>
                Made in Aotearoa, New Zealand
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
