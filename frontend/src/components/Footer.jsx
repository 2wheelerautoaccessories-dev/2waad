import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-charcoal pt-16 pb-8 border-t border-gold/20 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-4 mb-2 group">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="Alpha Strix"
                                    className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_5px_rgba(192,192,192,0.2)]"
                                />
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <span className="font-heading text-xl font-extrabold text-gold tracking-widest uppercase">
                                    Alpha Strix
                                </span>
                                <span className="text-[8px] text-slate font-medium tracking-[0.3em] uppercase opacity-70">
                                    Luxury Collection
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate text-sm leading-relaxed">
                            Discover our curated collection of premium men's fashion, accessories, and footwear designed for the bold and modern man.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="https://www.instagram.com/alphastrix.in/" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-steel flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.facebook.com/alphastrix" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-steel flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.youtube.com/@alphastrix" target="_blank" rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-steel flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4 text-gold tracking-wider uppercase">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/shop" className="text-slate hover:text-gold text-sm transition-colors">Shop All</Link></li>
                            <li><Link to="/about" className="text-slate hover:text-gold text-sm transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-slate hover:text-gold text-sm transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4 text-gold tracking-wider uppercase">Categories</h3>
                        <ul className="space-y-3">
                            <li><Link to="/category/t-shirts" className="text-slate hover:text-gold text-sm transition-colors">T-Shirts</Link></li>
                            <li><Link to="/category/shirts" className="text-slate hover:text-gold text-sm transition-colors">Shirts</Link></li>
                            <li><Link to="/category/accessories" className="text-slate hover:text-gold text-sm transition-colors">Accessories</Link></li>
                            <li><Link to="/category/footwear" className="text-slate hover:text-gold text-sm transition-colors">Footwear</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4 text-gold tracking-wider uppercase">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate">
                                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                                <span>Wadala Junction, Pratiksha Nagar,<br />Mumbai, Maharashtra 400022</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate">
                                <Mail size={18} className="text-gold shrink-0" />
                                <a href="mailto:contact@alphastrix.in" className="hover:text-gold transition-colors">contact@alphastrix.in</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate">
                        &copy; {new Date().getFullYear()} Alpha Strix. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-slate">
                        <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
