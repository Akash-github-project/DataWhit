"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const placeholderImage: string = "https://fastly.picsum.photos/id/164/300/300.jpg?hmac=1gjcXwsC3304oN3K4brJnU3uhQS6_kR6_zWOHolbBNM"
const carouselImages = [
  { src: "https://picsum.photos/100/100", alt: "DataWit Course 1" },
  { src: "https://picsum.photos/100/100", alt: "DataWit Course 2" },
  { src: "https://picsum.photos/100/100", alt: "DataWit Course 3" },
  { src: "https://picsum.photos/100/100", alt: "DataWit Course 4" },
  { src: "https://picsum.photos/100/100", alt: "DataWit Course 5" },
]

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      })
      setCurrentSlide(index)
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft
      const slideWidth = carouselRef.current.offsetWidth
      const newSlide = Math.round(scrollPosition / slideWidth)
      setCurrentSlide(newSlide)
    }
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll)
      return () => carousel.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % carouselImages.length
    scrollToSlide(newSlide)
  }

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + carouselImages.length) % carouselImages.length
    scrollToSlide(newSlide)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            DataWit
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 py-2">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 py-2">
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-600 hover:text-blue-600">
                Programs <ChevronDown className="inline-block w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Data Science</DropdownMenuItem>
                <DropdownMenuItem>Machine Learning</DropdownMenuItem>
                <DropdownMenuItem>Web Development</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/request_demo" className="text-gray-600 hover:text-blue-600 py-2">
              Request Demo
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Register</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register for DataWit</DialogTitle>
                  <DialogDescription>Create your account to get started with our courses.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </nav>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-white py-4">
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              About Us
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                Programs <ChevronDown className="inline-block w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Data Science</DropdownMenuItem>
                <DropdownMenuItem>Machine Learning</DropdownMenuItem>
                <DropdownMenuItem>Web Development</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/demo" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Request Demo
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full text-left px-4 py-2">
                  Register
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register for DataWit</DialogTitle>
                  <DialogDescription>Create your account to get started with our courses.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name-mobile">Name</Label>
                    <Input id="name-mobile" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email-mobile">Email</Label>
                    <Input id="email-mobile" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password-mobile">Password</Label>
                    <Input id="password-mobile" type="password" placeholder="Create a password" />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </nav>
        )}
      </header>

      <main>
        {/* New Scrollable Carousel */}
        <section className="relative h-96">
          <div
            ref={carouselRef}
            className="flex overflow-x-hidden snap-x snap-mandatory h-full"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 snap-center">
                <div className="relative h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl text-white font-bold text-center px-4">
                      Empower Your Future with DataWit
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16">
          <div className="mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center mb-16">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img src={placeholderImage}
                  alt="Learn from Experts" className="rounded-lg w-full h-96" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-bold mb-4">Learn from Industry Experts</h2>
                <p className="text-gray-600">
                  Our courses are designed and taught by professionals with years of experience in the tech industry.
                  Gain practical knowledge that you can apply immediately in your career.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <img src={placeholderImage}
                  alt="Learn from Experts" className="rounded-lg w-full h-96" />
              </div>
              <div className="md:w-1/2 md:pr-8">
                <h2 className="text-3xl font-bold mb-4">Cutting-edge Curriculum</h2>
                <p className="text-gray-600">
                  Stay ahead of the curve with our constantly updated course content. We ensure you're learning the
                  latest technologies and methodologies in the fast-paced tech world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Programs</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {[
                { title: "Data Science", description: "Master the art of data analysis and interpretation" },
                { title: "Machine Learning", description: "Build intelligent systems that learn and adapt" },
                { title: "Web Development", description: "Create modern, responsive web applications" },
                { title: "Cloud Computing", description: "Harness the power of cloud technologies" },
              ].map((program, index) => (
                <Card key={index} className="w-72 flex-shrink-0">
                  <CardHeader>
                    <CardTitle>{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{program.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Flexible Learning",
                  description: "Study at your own pace with our on-demand video lectures and resources",
                },
                {
                  title: "Hands-on Projects",
                  description: "Apply your knowledge to real-world projects and build a strong portfolio",
                },
                {
                  title: "Career Support",
                  description: "Get personalized career guidance and job placement assistance",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {[
                { name: "John Doe", role: "Data Scientist at Tech Co", quote: "DataWit transformed my career!" },
                { name: "Jane Smith", role: "ML Engineer at AI Corp", quote: "The best investment in my future." },
                { name: "Alex Johnson", role: "Full Stack Developer at Web Inc", quote: "Practical skills that matter." },
              ].map((story, index) => (
                <Card key={index} className="w-80 flex-shrink-0">
                  <CardHeader>
                    <CardTitle>{story.name}</CardTitle>
                    <CardDescription>{story.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="italic">"{story.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Companies */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Hiring Companies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Tech Giant Inc",
                "Innovate Co",
                "Data Systems Ltd",
                "Web Solutions",
                "AI Frontiers",
                "Cloud Nexus",
                "Cyber Secure",
                "Dev Dynamics",
              ].map((company, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                    <span className="text-2xl font-bold">{company[0]}</span>
                  </div>
                  <p className="text-center">{company}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DataWit Family */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">DataWit Family</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Alice Johnson",
                "Bob Smith",
                "Carol Davis",
                "David Wilson",
                "Eva Brown",
                "Frank Taylor",
                "Grace Lee",
                "Henry Clark",
              ].map((person, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={placeholderImage}
                    alt={person}
                    width={100}
                    height={100}
                    className="rounded-full mb-2"
                  />
                  <p className="text-center">{person}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 DataWit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
