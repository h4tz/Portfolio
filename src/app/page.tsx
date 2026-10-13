import { Hero } from "@/components/home/Hero";
import { Capabilities } from "@/components/home/Capabilities";
import { SelectedWork } from "@/components/home/SelectedWork";
import { StoreTeaser } from "@/components/home/StoreTeaser";
import { Now } from "@/components/home/Now";
import { ContactStrip } from "@/components/home/ContactStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <SelectedWork />
      <StoreTeaser />
      <Now />
      <ContactStrip />
    </>
  );
}
