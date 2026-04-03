import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href='/' aria-label='Soarwave Home'>
      <img
        src='/logo-colored.svg'
        width={160}
        height={50}
        alt='Soarwave'
        style={{ background: 'transparent' }}
      />
    </Link>
  )
}

export default Logo
