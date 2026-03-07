import React from 'react'
import { IMAGES } from '../../assets/Images'
import AnimatedContent from '../gsap/AnimatedContent'

const TeamHero = () => {
  return (
    <div className='h-screen relative overflow-hidden flex items-center justify-center'>
      
      {/* Background Image */}
      <img
        loading='lazy'
        src={IMAGES.GPIC}
        alt="background"
        className='absolute inset-0 w-full h-full object-cover opacity-40'
      />

      {/* Animated Content */}
      <AnimatedContent
        distance={70}
        direction="vertical"
        reverse={false}
        duration={1}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.3}
      >
        <div className='relative z-10 flex flex-col items-center text-white px-6 text-center'>
          <h1 className='text-5xl md:text-7xl font-bold'>
            TEAM HABBA
          </h1>

          <p className='text-lg md:text-xl font-medium mt-10 text-white/80 max-w-3xl'>
            Behind Acharya Habba 2026 stands a dedicated team driven by passion,
            creativity, and the commitment to deliver an unforgettable celebration.
            From planning and coordination to design, logistics, and execution,
            every member works tirelessly to turn ideas into experiences.
            United by teamwork and fuelled by enthusiasm, the team strives to create
            a platform where talent thrives and memories are made.
            Their spirit, collaboration, and determination form the foundation of Habba’s grand success.
          </p>
        </div>
      </AnimatedContent>

    </div>
  )
}

export default TeamHero