"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/section"
import { SLIDES } from "@/lib/content/hero"

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const dragOffset = useRef(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const isTransitioningRef = useRef(false)

  const extendedSlides = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]]

  const handleSlideChange = useCallback((newSlide: number) => {
    if (isTransitioningRef.current) return
    setIsTransitioning(true)
    isTransitioningRef.current = true
    setCurrentSlide(newSlide)

    setTimeout(() => {
      isTransitioningRef.current = false
      if (newSlide >= extendedSlides.length - 1) {
        setIsTransitioning(false)
        setCurrentSlide(1)
      } else if (newSlide <= 0) {
        setIsTransitioning(false)
        setCurrentSlide(extendedSlides.length - 2)
      }
    }, 550)
  }, [extendedSlides.length])

  const nextSlide = useCallback(() => {
    handleSlideChange(currentSlide + 1)
  }, [currentSlide, handleSlideChange])

  const prevSlide = useCallback(() => {
    handleSlideChange(currentSlide - 1)
  }, [currentSlide, handleSlideChange])

  const goToSlide = useCallback((idx: number) => {
    handleSlideChange(idx + 1)
  }, [handleSlideChange])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging.current && !isTransitioningRef.current) {
        nextSlide()
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    
    if (isTransitioningRef.current) {
      isTransitioningRef.current = false
      if (currentSlide >= extendedSlides.length - 1) {
        setIsTransitioning(false)
        setCurrentSlide(1)
      } else if (currentSlide <= 0) {
        setIsTransitioning(false)
        setCurrentSlide(extendedSlides.length - 2)
      }
    }
    
    isDragging.current = true
    startX.current = e.clientX
    dragOffset.current = 0
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'none'
    }
    try {
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    } catch(err) {}
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const diff = e.clientX - startX.current
    if (Math.abs(diff) > 5 && e.cancelable) {
      e.preventDefault()
    }
    dragOffset.current = diff
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(calc(-${currentSlide * 100}% + ${diff}px), 0, 0)`
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false

    try {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    } catch(err) {}

    if (sliderRef.current) {
      sliderRef.current.style.transition = ''
    }

    const diff = dragOffset.current
    if (diff <= -40) {
      nextSlide()
    } else if (diff >= 40) {
      prevSlide()
    } else {
      if (Math.abs(diff) > 5) {
        isTransitioningRef.current = true
        if (sliderRef.current) {
          sliderRef.current.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`
        }
        setTimeout(() => {
          isTransitioningRef.current = false
        }, 550)
      } else {
        if (sliderRef.current) {
          sliderRef.current.style.transform = `translate3d(-${currentSlide * 100}%, 0, 0)`
        }
      }
    }
    dragOffset.current = 0
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
      <div 
        className="relative overflow-hidden w-full touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div 
          ref={sliderRef}
          className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`} 
          style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
        >
          {extendedSlides.map((slide, index) => (
            <div key={`${slide.id}-${index}`} className="w-full shrink-0">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="max-w-xl space-y-8 animate-fade-up">
                  <div className="space-y-5">
                    {slide.badge && (
                      <Badge variant="secondary" className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        {slide.badge}
                      </Badge>
                    )}
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
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={60}
                    className="object-contain"
                    priority={index === 1}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="mt-12 flex items-center z-20">
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

