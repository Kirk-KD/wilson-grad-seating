import { useRef } from 'react';
import Hero from '../components/landing/Hero';

export default function LandingPage() {
  const heroRef = useRef(null);

  return (
    <>
      <Hero ref={heroRef} />
      {/* <Body /> */}
    </>
  );
}