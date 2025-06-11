import { Mountain } from "lucide-react";
import { FaTwitter, FaLinkedin, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center animate-pulse-glow shadow-lg">
                  <Mountain className="text-navy font-bold" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent brand-3d premium-text-glow">
                  MARKHOR
                </span>
                <span className="text-xs font-bold text-accent tracking-[0.2em] -mt-1">
                  TRADER
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">Premium trading platform for professional traders and institutions worldwide.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 glass-morph rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 glass-morph rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 glass-morph rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <FaTelegram />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">Trading</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Spot Trading</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Futures</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Options</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Copy Trading</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">Services</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">VIP Trading</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Analytics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Institutional</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">Support</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trading Academy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-charcoal pt-8 text-center">
          <p className="text-muted-foreground">© 2024 <span className="text-primary font-bold">MARKHOR TRADER</span>. All rights reserved. Premium trading platform with exclusive features.</p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <span className="text-emerald-500">🔒 Bank-Grade Security</span>
            <span className="text-accent">⚡ Ultra-Low Latency</span>
            <span className="text-primary">🏆 Premium Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
