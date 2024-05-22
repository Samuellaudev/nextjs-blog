import BlogSection from '@/components/HomePage/BlogSection';
import HeroSection from '@/components/HomePage/HeroSection';

export default function Home() {
  return (
    <div className="px-12">
      <HeroSection />
      <BlogSection />
    </div>
  );
}
