import './index.css';
import { useLenis } from './hooks/useLenis';
import { useMouse } from './hooks/useMouse';
import Preloader from './components/ui/Preloader';
import SmokeTrail from './components/ui/SmokeTrail';
import Header from './components/layout/Header';
import HeroSection from './sections/Hero';
import About from './sections/About/About';
import WorksSection from './sections/Works';
import WorksToContactTransition from './components/ui/WorksToContactTransition';
import ContactSection from './sections/Contact';

import SoundToggle from './components/ui/SoundToggle';

function App() {
  // Khởi tạo Lenis smooth scroll
  useLenis();

  // Theo dõi vị trí chuột (cho custom cursor)
  useMouse();

  return (
    <>
      <div className="relative min-h-screen">
        <SmokeTrail />
        <Preloader />
        {/* ─── Fixed Header ─── */}
        <Header />
        <SoundToggle />

        <main>
          {/* ─── Hero Section ─── */}
          <HeroSection />

          {/* ─── About Section ─── */}
          <About />

          {/* ─── Selected Works (Editorial 3D Carousel) ─── */}
          <WorksSection />

          {/* ─── Works to Contact Power Surge Conduit Transition ─── */}
          <WorksToContactTransition />

          {/* ─── Contact Section (Cyber Deck Terminal) ─── */}
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default App;
