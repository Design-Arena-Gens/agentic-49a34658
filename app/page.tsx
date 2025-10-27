import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HomeClient } from '@/components/HomeClient';
import { Footer } from '@/components/Footer';
import { careers } from '@/data/careers';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content" className="space-y-16 pb-24">
        <Hero />
        <HomeClient careers={careers} />
      </main>
      <Footer />
    </>
  );
}
