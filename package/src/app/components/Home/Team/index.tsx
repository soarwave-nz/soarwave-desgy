import React from 'react'

const Team = () => {
  return (
    <section id='work' className='overflow-x-hidden'>
      <div className='container mx-auto max-w-7xl px-4 relative'>
        <p className='text-center text-primary text-lg tracking-widest uppercase mb-4'>
          our team
        </p>
        <h2 className='text-center max-w-3xl mx-auto mb-8'>
          A lean, senior-led NZ team obsessed with results.
        </h2>
        <p className='text-xl font-medium text-center text-black/50 max-w-2xl mx-auto mb-16'>
          No juniors handed your account. No offshore handoffs. Every client
          works directly with senior strategists who know the NZ market inside
          out.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto'>
          {[
            { label: 'NZ Based & Operated' },
            { label: 'Senior Strategists Only' },
            { label: 'Direct Client Access' },
          ].map((item, i) => (
            <div
              key={i}
              className='bg-grey rounded-3xl p-10 text-center'>
              <p className='text-lg font-bold text-black'>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
