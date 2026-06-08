
import Footer from "@/components/layout/Footer";
import Hero from "@/components/layout/section/Hero";
import Categories from "@/components/layout/section/Categories";
import FeaturedProducts from "@/components/layout/section/FeaturesProducts";
import PromoBanner from "@/PromoBanner/Promobanner";
import Testimonials from "@/PromoBanner/Testimonials";
import FAQ from "@/PromoBanner/FAQ";
import Newsletter from "@/PromoBanner/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </>
  );
}
