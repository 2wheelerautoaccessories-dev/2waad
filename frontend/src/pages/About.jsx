import { Shield, Star, Zap, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSettings } from '../context/SettingsContext';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop';

const About = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const settings = useSettings();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('Message sent! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-navy min-h-screen">
            {/* Hero */}
            <div className="relative pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden bg-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <span className="block text-gold font-heading text-lg tracking-widest uppercase mb-2">Our Story</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-offwhite">
                        Built for <br /> Every Rider
                    </h1>
                    <p className="text-slate max-w-2xl mx-auto text-lg leading-relaxed">
                        Welcome to 2waad — your ultimate destination for premium two-wheeler accessories. Two Wheeler Auto Accessories Den.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-16 bg-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gold/10 rounded-xl transform translate-x-4 translate-y-4 border border-gold/20"></div>
                            <img
                                src={ABOUT_IMAGE}
                                alt="2waad two-wheeler accessories"
                                className="relative z-10 w-full h-[500px] object-cover object-center rounded-xl shadow-2xl border border-gold/20"
                                loading="lazy"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=800&auto=format&fit=crop'; }}
                            />
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold font-heading text-offwhite">Our Mission</h2>
                            <div className="w-16 h-1 bg-gold rounded-full"></div>
                            <p className="text-slate leading-relaxed">
                                2waad was born from a passion for riding. We believe every rider deserves the best gear — whether you're commuting daily or hitting the highway. We curate only the finest accessories for your two-wheeler.
                            </p>
                            <p className="text-slate leading-relaxed">
                                As a curated showcase platform, we handpick top-rated helmets, riding jackets, lights, mirrors, and more. We partner with trusted sellers to ensure secure, reliable purchasing for every biker and scooter rider.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                        <Star size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold mb-1 text-offwhite uppercase tracking-wide text-sm">Curated with Pride</h4>
                                        <p className="text-sm text-slate">Only the best quality accessories on our platform.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold mb-1 text-offwhite uppercase tracking-wide text-sm">Authentic Buying</h4>
                                        <p className="text-sm text-slate">Secure transactions through verified sellers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-charcoal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold font-heading mb-12 text-offwhite uppercase tracking-wider">The 2waad Promise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors hover:shadow-2xl">
                            <Star className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-heading font-bold text-xl mb-3 text-gold uppercase tracking-wider">Premium Quality</h3>
                            <p className="text-slate text-sm leading-relaxed">Uncompromising quality in every accessory we showcase for the modern rider.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors hover:shadow-2xl transform md:-translate-y-4">
                            <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-heading font-bold text-xl mb-3 text-gold uppercase tracking-wider">Secure Shopping</h3>
                            <p className="text-slate text-sm leading-relaxed">Shop safely through trusted affiliate links with full buyer protection.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors hover:shadow-2xl">
                            <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-heading font-bold text-xl mb-3 text-gold uppercase tracking-wider">Rider First</h3>
                            <p className="text-slate text-sm leading-relaxed">Your safety and riding experience is our priority. We feature gear trusted by real riders.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-20 bg-navy">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-heading mb-4 text-offwhite uppercase tracking-wider">Get in Touch</h2>
                        <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-6"></div>
                        <p className="text-slate max-w-2xl mx-auto">
                            Have questions or need assistance? Reach out to us below.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="bg-steel/50 p-6 rounded-xl border border-gold/20 flex gap-6">
                                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-2 text-offwhite uppercase tracking-wide">Our Location</h3>
                                    <p className="text-slate leading-relaxed whitespace-pre-line">
                                        {settings.address}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-steel/50 p-6 rounded-xl border border-gold/20 flex gap-6">
                                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-2 text-offwhite uppercase tracking-wide">Email Us</h3>
                                    <a href={`mailto:${settings.email}`} className="text-gold hover:text-gold-lt block transition-colors">
                                        {settings.email}
                                    </a>
                                </div>
                            </div>

                            <div className="bg-steel/50 p-6 rounded-xl border border-gold/20 flex gap-6">
                                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-2 text-offwhite uppercase tracking-wide">Call/WhatsApp</h3>
                                    <a href={`tel:${settings.whatsappNumber}`} className="text-gold hover:text-gold-lt block transition-colors">
                                        {settings.whatsappNumber}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/20">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                        className="w-full bg-navy border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold rounded-lg px-4 py-3 outline-none text-offwhite placeholder-slate text-sm"
                                        placeholder="Your Name" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                        className="w-full bg-navy border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold rounded-lg px-4 py-3 outline-none text-offwhite placeholder-slate text-sm"
                                        placeholder="Email Address" />
                                </div>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required
                                    className="w-full bg-navy border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold rounded-lg px-4 py-3 outline-none text-offwhite placeholder-slate text-sm"
                                    placeholder="Subject" />
                                <textarea name="message" value={formData.message} onChange={handleChange} required rows="4"
                                    className="w-full bg-navy border border-gold/20 focus:border-gold focus:ring-1 focus:ring-gold rounded-lg px-4 py-3 outline-none resize-none text-offwhite placeholder-slate text-sm"
                                    placeholder="Message"></textarea>
                                <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-70">
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
