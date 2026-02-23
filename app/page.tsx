import { cookies, headers } from "next/headers";

import { getNavItems } from "@/data";
import { detectLang, getLangCookieName } from "@/lib/i18n";
import LanguageToggle from "@/components/ui/LanguageToggle";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import Education from "@/components/Education";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  const cookieLang = cookies().get(getLangCookieName())?.value;
  const lang = detectLang(cookieLang, headers());
  const navItems = getNavItems(lang);
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="fixed right-3 top-36 z-[6001] sm:right-6 sm:top-6">
        <LanguageToggle value={lang} />
      </div>
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero lang={lang} />
        <Grid lang={lang} />
        <RecentProjects lang={lang} />
        <Clients lang={lang} />
        <Experience lang={lang} />
        <Approach lang={lang} />
        <Education lang={lang} />
        <Footer lang={lang} />
      </div>
    </main>
  );
};

export default Home;
