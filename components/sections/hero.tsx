"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

const SLIDES = [
  {
    id: 1,
    title: "Membangun Solusi Digital untuk Pertumbuhan Bisnis Anda.",
    description: "Kami membantu bisnis, startup, dan organisasi membangun website, aplikasi, dan solusi digital melalui kombinasi teknologi modern, tim berpengalaman, dan AI Assistant yang siap membantu kapan saja.",
    image: "/images/hero-slide-1.jpg",
    ctaPrimaryText: "Mulai konsultasi gratis",
    ctaPrimaryLink: "/#kontak",
    ctaSecondaryText: "Lihat portfolio",
    ctaSecondaryLink: "/#showcase"
  },
  {
    id: 2,
    title: "Desain Modern dan Responsif untuk Pengalaman Terbaik.",
    description: "Tingkatkan interaksi pelanggan dengan antarmuka yang intuitif dan menarik. Kami memastikan setiap produk digital yang kami buat tidak hanya indah, tapi juga mudah digunakan.",
    image: "/images/hero-slide-2.jpg",
    ctaPrimaryText: "Pelajari lebih lanjut",
    ctaPrimaryLink: "/#layanan",
    ctaSecondaryText: "Hubungi kami",
    ctaSecondaryLink: "/#kontak"
  },
  {
    id: 3,
    title: "Optimasi Performa dan Keamanan Terjamin.",
    description: "Kecepatan dan keamanan adalah prioritas utama. Solusi kami dibangun dengan standar industri tertinggi untuk memastikan bisnis Anda berjalan lancar tanpa hambatan.",
    image: "/images/hero-slide-3.jpg",
    ctaPrimaryText: "Lihat teknologi kami",
    ctaPrimaryLink: "/#teknologi",
    ctaSecondaryText: "Mulai sekarang",
    ctaSecondaryLink: "/#kontak"
  }
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const extendedSlides = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]]

  const nextSlide = useCallback(() => {
    if (currentSlide >= extendedSlides.length - 1) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => prev + 1)
  }, [currentSlide, extendedSlides.length])

  const prevSlide = useCallback(() => {
    if (currentSlide <= 0) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => prev - 1)
  }, [currentSlide])

  const goToSlide = useCallback((idx: number) => {
    setIsTransitioning(true)
    setCurrentSlide(idx + 1)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handleTransitionEnd = () => {
    if (currentSlide >= extendedSlides.length - 1) {
      setIsTransitioning(false)
      setCurrentSlide(1)
    } else if (currentSlide <= 0) {
      setIsTransitioning(false)
      setCurrentSlide(extendedSlides.length - 2)
    }
  }

  let activeDotIndex = currentSlide - 1
  if (currentSlide === 0) activeDotIndex = SLIDES.length - 1
  else if (currentSlide === extendedSlides.length - 1) activeDotIndex = 0

  return (
    <Section
      id="beranda"
      size="md"
      className="relative overflow-hidden pt-8 pb-16"
    >
      <div className="relative overflow-hidden w-full">
        <div 
          className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`} 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div key={`${slide.id}-${index}`} className="w-full shrink-0">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="max-w-xl space-y-8 animate-fade-up">
                  <div className="space-y-5">
                    <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance text-foreground sm:text-5xl lg:text-[3.2rem]">
                      {slide.title}
                    </h1>
                    <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" className="h-12 px-7 text-base sm:w-auto" asChild>
                      <Link href={slide.ctaPrimaryLink}>
                        {slide.ctaPrimaryText}
                        <ArrowRight aria-hidden className="size-4 ml-2" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-7 text-base sm:w-auto"
                      asChild
                    >
                      <Link href={slide.ctaSecondaryLink}>{slide.ctaSecondaryText}</Link>
                    </Button>
                  </div>
                </div>

                <div
                  className="flex items-center justify-center relative w-full aspect-[4/3] lg:aspect-auto lg:h-[450px] animate-fade-up"
                  style={{ animationDelay: "120ms" }}
                >
                  <Image
                    src={slide.image}
                    alt="Hero illustration"
                    fill
                    className="object-contain"
                    priority={index === 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        
        <div className="flex gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeDotIndex ? "w-8 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        
      </div>
    </Section>
  )
}

