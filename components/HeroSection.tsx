import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="py-4">
          {/* Imagen principal */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image src="/assets/logo/imghero.png" alt="TMPLR Techwear Collection" fill priority className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}