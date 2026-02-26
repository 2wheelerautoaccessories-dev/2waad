import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'T-Shirts', path: '/category/t-shirts' },
        { name: 'Shirts', path: '/category/shirts' },
        { name: 'Accessories', path: '/category/accessories' },
        { name: 'Footwear', path: '/category/footwear' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav className="bg-navy/95 backdrop-blur-md sticky top-0 z-50 border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center flex-shrink-0 gap-4 group">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <img
                                src="/logo.png"
                                alt="Alpha Strix Logo"
                                className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(192,192,192,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(192,192,192,0.5)] transition-all duration-300"
                            />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="font-heading text-2xl font-extrabold text-gold tracking-widest uppercase transition-all duration-300 group-hover:text-offwhite group-hover:tracking-[0.15em]">
                                Alpha Strix
                            </span>
                            <span className="text-[10px] text-slate font-medium tracking-[0.4em] uppercase opacity-70">
                                The Alpha Collection
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-slate hover:text-gold font-medium text-xs transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate hover:text-gold transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-steel border-t border-gold/20 absolute w-full shadow-2xl animate-fade-in">
                    <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="text-slate block px-3 py-3 rounded-lg text-base font-medium hover:bg-navy/50 hover:text-gold uppercase tracking-wider"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
