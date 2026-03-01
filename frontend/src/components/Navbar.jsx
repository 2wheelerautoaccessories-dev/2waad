import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = [
        { name: 'Helmets', path: '/category/helmets' },
        { name: 'Riding Gloves', path: '/category/riding-gloves' },
        { name: 'Riding Jackets', path: '/category/riding-jackets' },
        { name: 'Bike Covers', path: '/category/bike-covers' },
        { name: 'Mirrors', path: '/category/mirrors' },
        { name: 'Lights & LEDs', path: '/category/lights-leds' },
        { name: 'Grips & Handlebars', path: '/category/grips-handlebars' },
        { name: 'Locks & Security', path: '/category/locks-security' },
        { name: 'Phone Mounts', path: '/category/phone-mounts' },
        { name: 'Luggage & Bags', path: '/category/luggage-bags' },
        { name: 'Cleaning & Care', path: '/category/cleaning-care' },
        { name: 'Stickers & Decals', path: '/category/stickers-decals' },
    ];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-navy/95 backdrop-blur-md sticky top-0 z-50 border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center flex-shrink-0 gap-4 group">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <img
                                src="/logo.png"
                                alt="2waad Logo"
                                className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(192,192,192,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(192,192,192,0.5)] transition-all duration-300"
                            />
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className="font-heading text-2xl font-extrabold text-gold tracking-widest uppercase transition-all duration-300 group-hover:text-offwhite group-hover:tracking-[0.15em]">
                                2waad
                            </span>
                            <span className="text-[10px] text-slate font-medium tracking-[0.3em] uppercase opacity-70">
                                Two Wheeler Auto Accessories Den
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-slate hover:text-gold font-medium text-xs transition-colors uppercase tracking-widest">Home</Link>
                        <Link to="/shop" className="text-slate hover:text-gold font-medium text-xs transition-colors uppercase tracking-widest">Shop</Link>

                        {/* Categories Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                className="text-slate hover:text-gold font-medium text-xs transition-colors uppercase tracking-widest flex items-center gap-1.5 py-8"
                            >
                                Categories <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        onMouseLeave={() => setIsDropdownOpen(false)}
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-charcoal border border-gold/20 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-2"
                                    >
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-charcoal border-t border-l border-gold/20 rotate-45"></div>
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                to={cat.path}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="text-slate hover:text-gold text-[13px] font-medium transition-colors py-2 flex items-center gap-2 group"
                                            >
                                                <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/about" className="text-slate hover:text-gold font-medium text-xs transition-colors uppercase tracking-widest">About</Link>
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-steel border-t border-gold/20 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-offwhite text-lg font-heading font-bold uppercase tracking-widest flex items-center justify-between group"
                                >
                                    {link.name}
                                    <span className="w-8 h-[1px] bg-gold/30 group-hover:w-12 transition-all"></span>
                                </Link>
                            ))}

                            <div className="pt-4 space-y-4">
                                <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Categories</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            to={cat.path}
                                            onClick={() => setIsOpen(false)}
                                            className="text-slate text-sm font-medium hover:text-gold transition-colors"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
