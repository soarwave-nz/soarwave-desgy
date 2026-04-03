'use client'
import Link from 'next/link'

const services = [
  {
    heading: 'Social Media Management',
    paragraph:
      'Full-service social presence from content creation and scheduling to community management. We turn followers into fanatics with content that stops the scroll.',
    tags: ['Instagram', 'TikTok', 'LinkedIn'],
  },
  {
    heading: 'Paid Ads (Meta & Google)',
    paragraph:
      'Data-driven ad campaigns that slash cost-per-acquisition and maximise ROAS. From strategy to creative to optimisation — we own every dollar you spend.',
    tags: ['Meta Ads', 'Google Ads', 'Retargeting'],
  },
  {
    heading: 'Brand Strategy & Design',
    paragraph:
      'Build a brand people remember and trust. We craft compelling identities — from visual systems to brand voice — that differentiate you in a crowded market.',
    tags: ['Visual Identity', 'Brand Voice', 'Design'],
  },
  {
    heading: 'Campaign Management',
    paragraph:
      'End-to-end campaign execution from ideation through to analysis. We launch, monitor, and iterate relentlessly to drive consistent, measurable growth.',
    tags: ['Strategy', 'Execution', 'Analytics'],
  },
]

const Aboutus = () => {
  return (
    <section id='services' className='bg-cover bg-center overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative z-1'>
        <div className='p-12 bg-grey rounded-3xl'>
          <p className='text-center text-primary text-lg tracking-widest uppercase mt-10'>
            what we do
          </p>
          <h2 className='text-center pb-12'>Services built to dominate.</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-10'>
            {services.map((item, i) => (
              <div
                key={i}
                className='hover:bg-darkmode bg-white rounded-3xl p-8 shadow-xl group transition-colors duration-300'>
                <h5 className='group-hover:text-white mb-4 font-bold'>
                  {item.heading}
                </h5>
                <p className='text-base font-normal text-black/70 group-hover:text-white/80 mb-5 leading-relaxed'>
                  {item.paragraph}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className='text-xs font-semibold bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white px-3 py-1 rounded-full transition-colors'>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Aboutus
