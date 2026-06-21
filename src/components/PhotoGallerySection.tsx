import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import food1 from "@/assets/food-1.jpeg";
import food15 from "@/assets/food-1-5.jpeg";
import food2 from "@/assets/food-2.jpg";
import food3 from "@/assets/food-3.jpeg";
import food4 from "@/assets/food-4.jpeg";
import food5 from "@/assets/food-5.jpeg";
import food6 from "@/assets/food-6.jpeg";
import food7 from "@/assets/food-7.jpeg";
import food8 from "@/assets/food-8.jpeg";
import food9 from "@/assets/food-9.jpeg";
import food10 from "@/assets/food-10.jpeg";
import food11 from "@/assets/food-11.jpeg";
import food12 from "@/assets/food-12.jpeg";
import food13 from "@/assets/food-13.jpg";
import food14 from "@/assets/food-14.jpeg";

const photos = [
  { src: food1, alt: "Brunch Spread" },
  { src: food15, alt: "Shaved Ice Desserts" },
  { src: food2, alt: "Wagyu Beef" },
  { src: food3, alt: "Japanese Donburi" },
  { src: food4, alt: "Fine Dining" },
  { src: food5, alt: "Café Brunch" },
  { src: food6, alt: "Brunch Platter" },
  { src: food7, alt: "Matcha Drinks" },
  { src: food8, alt: "Matcha and Cake" },
  { src: food9, alt: "Croissant and Matcha Drinks" },
  { src: food10, alt: "Iced Lattes" },
  { src: food11, alt: "Outdoor Café Drinks" },
  { src: food12, alt: "Layered Matcha Drinks" },
  { src: food13, alt: "Coffee at Wooden Table" },
  { src: food14, alt: "Café Tabletop Drinks" },
];

export default function PhotoGallerySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="photos" className="py-[100px] px-6 bg-background">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-14">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mt-3 max-w-2xl">
            Photography
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-xl text-[15px]">
            High-quality photos for menus, social, and brand campaigns; shot with no filters.
          </p>
        </div>

        {/* Staggered grid layout — rows of 3 with vertical offsets */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {photos.map((photo, i) => {
            const col = i % 3;
            const offsetsPx = [0, 24, 10];
            const aspects = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];
            const aspect = aspects[i % aspects.length];
            return (
              <div
                key={i}
                style={{ marginTop: col === 0 ? 0 : offsetsPx[col] }}
                className={`${aspect} overflow-hidden group cursor-pointer rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
