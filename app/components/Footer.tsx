"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import masLogo from "../../public/images_frontend/mas_without_wording.png";

export default function Footer() {
  return (
    <footer className="bg-[var(--secondary)] text-[var(--foreground)] rounded-t-[40px] pt-16 pb-8 px-8 md:px-16 -mt-8 font-sans relative z-50 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
        
        {/* Brand Section */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <Link href="/" className="block">
            <Image
              src={masLogo}
              alt="MAS Logistics Logo"
              width={180}
              height={54}
              className="h-auto w-auto max-w-[150px] hover:opacity-90 transition-opacity filter brightness-0 invert"
            />
          </Link>
          
          <p className="text-sm text-[var(--foreground)]/70 leading-relaxed max-w-sm">
            Delivering excellence in logistics and supply chain management with reliable, efficient, and innovative solutions worldwide.
          </p>

          <div className="flex space-x-4 pt-2">
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-white hover:bg-[var(--primary)] transition-all shadow-sm border border-white/10">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-white hover:bg-[var(--primary)] transition-all shadow-sm border border-white/10">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-white hover:bg-[var(--primary)] transition-all shadow-sm border border-white/10">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-white hover:bg-[var(--primary)] transition-all shadow-sm border border-white/10">
              <Youtube className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:text-white hover:bg-[var(--primary)] transition-all shadow-sm border border-white/10">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-1/4 grid grid-cols-2 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-bold text-xs mb-6 text-[var(--primary)] uppercase tracking-widest">Company</h3>
            <ul className="space-y-4 text-sm text-[var(--foreground)]/80">
              <li><Link href="/" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>About Us</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>FAQ</Link></li>
              <li><button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openQuoteModal')); }} className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>Get a Quote</button></li>
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="font-bold text-xs mb-6 text-[var(--primary)] uppercase tracking-widest">Offerings</h3>
            <ul className="space-y-4 text-sm text-[var(--foreground)]/80">
              <li><Link href="/services" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>Services</Link></li>
              <li><Link href="/network" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>Network</Link></li>
              <li><Link href="/industry" className="hover:text-white transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>Industry</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact & Map Section */}
        <div className="w-full lg:w-5/12 flex flex-col gap-6">
          <h3 className="font-bold text-xs text-[var(--primary)] uppercase tracking-widest">Reach Us At</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[var(--foreground)]/80">
            <div className="flex flex-col gap-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[var(--primary)] group-hover:border-transparent transition-colors text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="mt-1 font-medium flex flex-col space-y-1">
                  <a href="tel:+914442034201" className="hover:text-white transition-colors whitespace-nowrap">+91 44 4203 4201</a>
                  <a href="tel:+919043555290" className="hover:text-white transition-colors whitespace-nowrap">+91 9043555290</a>
                </div>
              </div>

              <a href="mailto:support@maslogistics.com" className="flex items-center space-x-3 hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[var(--primary)] group-hover:border-transparent transition-colors text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-medium">support@maslogistics.com</span>
              </a>
              
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[var(--primary)] group-hover:border-transparent transition-colors text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-1">
                  <p className="font-semibold text-white mb-1">Registered Office</p>
                  <p className="leading-relaxed">#37/23A, Periyar Nagar, TVT,<br />Chennai - 600019, TN, India</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="w-full h-full min-h-[160px] rounded-2xl overflow-hidden border border-white/10 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.602693892881!2d80.2227181!3d13.1242981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265b4c1fc0725%3A0x6b6c86720e74f179!2sPeriyar%20Nagar%2C%20Perambur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--foreground)]/60">
        <p className="font-medium">© {new Date().getFullYear()} MAS Logistics. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-0 font-medium">
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link>
          <Link href="/refund" className="hover:text-white transition-colors">Refund & Cancellation Policy</Link>
        </div>
      </div>
    </footer>
  );
}
