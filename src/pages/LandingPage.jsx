import '@fontsource-variable/raleway';
import { useRef } from 'react';
import Hero from '../components/landing/Hero';

export default function LandingPage() {
  const heroRef = useRef(null);
  const touchStartY = useRef(0);

  // const scrollPastHero = () => {
  //   if (heroRef.current) {
  //     const heroHeight = heroRef.current.clientHeight;
  //     window.scrollTo({
  //       top: heroHeight,
  //       behavior: 'smooth',
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const onWheel = (e) => {
  //     if (window.scrollY === 0 && e.deltaY > 0) {
  //       e.preventDefault();
  //       scrollPastHero();
  //     }
  //   };

  //   const onTouchStart = (e) => {
  //     touchStartY.current = e.touches[0].clientY;
  //   };

  //   const onTouchMove = (e) => {
  //     const touchEndY = e.touches[0].clientY;
  //     if (window.scrollY === 0 && touchStartY.current > touchEndY) {
  //       e.preventDefault();
  //       scrollPastHero();
  //     }
  //   };

  //   window.addEventListener('wheel', onWheel, { passive: false });
  //   window.addEventListener('touchstart', onTouchStart, { passive: true });
  //   window.addEventListener('touchmove', onTouchMove, { passive: false });

  //   return () => {
  //     window.removeEventListener('wheel', onWheel);
  //     window.removeEventListener('touchstart', onTouchStart);
  //     window.removeEventListener('touchmove', onTouchMove);
  //   };
  // }, []);

  return (
    <>
      <Hero ref={heroRef} />
      {/* <Body /> */}
    </>
  );
}