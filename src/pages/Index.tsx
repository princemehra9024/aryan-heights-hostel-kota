import { SmoothScroll } from "@/components/aryan/SmoothScroll";
import { Cursor } from "@/components/aryan/Cursor";
import { Loader } from "@/components/aryan/Loader";
import { Nav } from "@/components/aryan/Nav";
import { Hero } from "@/components/aryan/Hero";
import { Marquee } from "@/components/aryan/Marquee";
import { About } from "@/components/aryan/About";
import { Facilities } from "@/components/aryan/Facilities";
import { Rooms } from "@/components/aryan/Rooms";
import { FacilitiesSlider } from "@/components/aryan/FacilitiesSlider";
import { Mess } from "@/components/aryan/Mess";
import { Gallery } from "@/components/aryan/Gallery";
import { Wardens } from "@/components/aryan/Wardens";
import { WhyChooseUs } from "@/components/aryan/WhyChooseUs";
import { Location } from "@/components/aryan/Location";
import { Contact } from "@/components/aryan/Contact";

const Index = () => {
  return (
    <main className="bg-background text-foreground grain relative">
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Facilities />
      <Rooms />
      <FacilitiesSlider />
      <Mess />
      <Gallery />
      <Wardens />
      <WhyChooseUs />
      <Location />
      <Contact />
    </main>
  );
};

export default Index;
