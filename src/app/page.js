'use client';
import './globals.css'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import SvgAnimate from '@/components/SvgAnimate';
import StickyMouse from '@/components/StickyMouse';
import { HeroParallax } from '@/components/RecentWork';
import { products } from '@/common/Products';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <main className='h-[fit-content]'>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <SvgAnimate />
      {/* <Services /> */}
      {/* <SlidingImages /> */}
      <HeroParallax products={products}/>
      <Contact />
    </main>
  )
}
