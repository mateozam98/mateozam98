"use client";

import { getGridItems } from "@/data";
import type { Lang } from "@/lib/i18n";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Grid = ({ lang }: { lang: Lang }) => {
  const gridItems = getGridItems(lang);
  return (
    <section id="sobre">
      <ScrollReveal variant="fade-up">
        <BentoGrid className="w-full py-20">
          {gridItems.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={i}
              title={item.title}
              description={item.description}
              // remove icon prop
              // remove original classname condition
              className={item.className}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
              lang={lang}
            />
          ))}
        </BentoGrid>
      </ScrollReveal>
    </section>
  );
};

export default Grid;
