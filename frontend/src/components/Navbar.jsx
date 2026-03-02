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
        { name: 'Lubricants', path: '/category/lubricants' },
        { name: 'General & OE Spares', path: '/category/general-oe-spares' },
    ];

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-navy/95 backdrop-blur-md sticky top-0 z-50 border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Main Bar ── */}
                <div className="flex items-center h-16 md:h-20 gap-4">

                    {/* ── Brand (Logo + Name) ── flex-1 so it fills left side */}
                    <Link
                        to="/"
                        className="flex items-center group flex-1 min-w-0"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Logo — wide rectangular, shows 2WAAD text inside */}
                        <div className="flex-shrink-0 h-10 md:h-12 w-36 md:w-44 flex items-center justify-start overflow-hidden">
                            <img
                                src="/logo.png"
                                alt="2WAAD Logo"
                                className="h-full w-auto object-contain group-hover:brightness-125 transition-all duration-300"
                            />
                        </div>
                    </Link>

                    {/* ── Desktop Nav Links ── flex-shrink-0 so they never wrap */}
                    <div className="hidden md:flex items-center gap-7 flex-shrink-0">
                        <Link to="/" className="text-slate hover:text-gold font-medium text-[11px] transition-colors uppercase tracking-[0.15em]">
                            Home
                        </Link>
                        <Link to="/shop" className="text-slate hover:text-gold font-medium text-[11px] transition-colors uppercase tracking-[0.15em]">
                            Shop
                        </Link>

                        {/* Categories Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                className="text-slate hover:text-gold font-medium text-[11px] transition-colors uppercase tracking-[0.15em] flex items-center gap-1 py-8"
                            >
                                Categories
                                <ChevronDown size={13} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                        transition={{ duration: 0.15 }}
                                        onMouseLeave={() => setIsDropdownOpen(false)}
                                        className="absolute top-full right-0 w-[540px] bg-charcoal border border-gold/20 rounded-2xl shadow-2xl p-5 grid grid-cols-3 gap-x-6 gap-y-1"
                                    >
                                        {/* Caret */}
                                        <div className="absolute -top-2 right-6 w-4 h-4 bg-charcoal border-t border-l border-gold/20 rotate-45" />
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                to={cat.path}
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="text-slate hover:text-gold text-[12px] font-medium transition-colors py-2 flex items-center gap-2 group/item"
                                            >
                                                <span className="w-1 h-1 bg-gold rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0" />
                                                <span className="truncate">{cat.name}</span>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link to="/about" className="text-slate hover:text-gold font-medium text-[11px] transition-colors uppercase tracking-[0.15em]">
                            About
                        </Link>
                    </div>

                    {/* ── Mobile Burger ── always flex-shrink-0 */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex-shrink-0 text-slate hover:text-gold transition-colors p-1.5 rounded-lg hover:bg-gold/10"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen
                                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <X size={22} />
                                </motion.span>
                                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Menu size={22} />
                                </motion.span>
                            }
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* ── Mobile Slide-Down Menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden bg-steel border-t border-gold/20 overflow-hidden"
                    >
                        <div className="px-5 py-6 space-y-1">
                            {/* Main Nav Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between py-3 text-offwhite text-base font-heading font-bold uppercase tracking-widest border-b border-gold/10 hover:text-gold transition-colors"
                                >
                                    {link.name}
                                    <span className="text-gold/40 text-xs">›</span>
                                </Link>
                            ))}

                            {/* Categories */}
                            <div className="pt-4 pb-2">
                                <p className="text-gold text-[9px] font-bold uppercase tracking-[0.35em] mb-3 px-0.5">
                                    Categories
                                </p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.name}
                                            to={cat.path}
                                            onClick={() => setIsOpen(false)}
                                            className="text-slate text-sm font-medium hover:text-gold transition-colors py-2.5 flex items-center gap-2 border-b border-gold/5"
                                        >
                                            <span className="w-1 h-1 bg-gold/40 rounded-full flex-shrink-0" />
                                            <span className="truncate">{cat.name}</span>
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
