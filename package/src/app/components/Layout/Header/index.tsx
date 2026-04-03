'use client'
import { Key, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '@/app/types/menu'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  const [headerData, setHeaderData] = useState<HeaderItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setHeaderData(data.headerData)
      } catch (error) {
        console.error('Error fetching header data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <header
      className={`fixed top-0 z-40 w-full bg-white transition-all duration-300 border-b border-black/10 ${
        sticky ? 'shadow-lg' : 'shadow-none'
      }`}>
      <div>
        <div className='container mx-auto max-w-(--breakpoint-xl) flex items-center justify-between px-6'>
          {/* Logo — extreme left */}
          <div className={`duration-300 ${sticky ? 'py-3' : 'py-5'}`}>
            <Logo />
          </div>

          {/* Desktop Nav + CTA grouped right */}
          <div className='hidden lg:flex items-center gap-10'>
            <nav className='flex items-center gap-10'>
              {headerData.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </nav>
            <Link
              href='#contact'
              className='bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity'>
              Get Started
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='block lg:hidden p-2 rounded-lg'
            aria-label='Toggle mobile menu'>
            <span className='block w-6 h-0.5 bg-darkmode'></span>
            <span className='block w-6 h-0.5 bg-darkmode mt-1.5'></span>
            <span className='block w-6 h-0.5 bg-darkmode mt-1.5'></span>
          </button>
        </div>

        {/* Mobile overlay */}
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )}

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
          <div className='flex items-center justify-between p-4 border-b border-black/10'>
            <Logo />
            <button
              onClick={() => setNavbarOpen(false)}
              className="bg-[url('/images/closed.svg')] bg-no-repeat bg-contain w-5 h-5"
              aria-label='Close menu' />
          </div>
          <nav className='flex flex-col items-start p-4'>
            {headerData.map(
              (item: HeaderItem, index: Key | null | undefined) => (
                <MobileHeaderLink key={index} item={item} />
              )
            )}
            <div className='mt-6 w-full'>
              <Link
                href='#contact'
                onClick={() => setNavbarOpen(false)}
                className='block text-center bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-full'>
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
