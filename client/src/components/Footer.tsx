import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-playfair text-2xl font-bold mb-4">Kenya Luxury Villas</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Experience the best of Kenya with our premium collection of luxury villas and apartments. 
              From beachfront escapes to mountain retreats, we offer unforgettable stays across the country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/">
                  <span className="hover:text-white transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <span className="hover:text-white transition-colors cursor-pointer">Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="hover:text-white transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <span className="hover:text-white transition-colors cursor-pointer">Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Destinations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/properties?category=diani">
                  <span className="hover:text-white transition-colors cursor-pointer">Diani Beach</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?category=naivasha">
                  <span className="hover:text-white transition-colors cursor-pointer">Naivasha</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?category=nanyuki">
                  <span className="hover:text-white transition-colors cursor-pointer">Nanyuki</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?category=malindi">
                  <span className="hover:text-white transition-colors cursor-pointer">Malindi</span>
                </Link>
              </li>
              <li>
                <Link href="/properties?category=amboseli">
                  <span className="hover:text-white transition-colors cursor-pointer">Amboseli</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Kenya Luxury Villas. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
