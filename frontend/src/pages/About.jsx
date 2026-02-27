import { Shield, Star, Zap, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop';

const About = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

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
                        Built for the <br /> Alpha Male
                    </h1>
                    <p className="text-slate max-w-2xl mx-auto text-lg leading-relaxed">
                        Welcome to Alpha Strix, your ultimate destination for premium men's fashion, accessories, and footwear.
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
                                alt="Alpha Strix men's fashion"
                                className="relative z-10 w-full h-[500px] object-cover object-center rounded-xl shadow-2xl border border-gold/20"
                                loading="lazy"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop'; }}
                            />
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold font-heading text-offwhite">Our Mission</h2>
                            <div className="w-16 h-1 bg-gold rounded-full"></div>
                            <p className="text-slate leading-relaxed">
                                Alpha Strix was born from a passion to curate the best in men's fashion. We believe every man deserves to look sharp, feel confident, and express himself through premium style.
                            </p>
                            <p className="text-slate leading-relaxed">
                                As a curated showcase platform, we handpick the finest t-shirts, formal shirts, accessories, and footwear. We partner with trusted sellers via Meesho to ensure secure, reliable purchasing.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                        <Star size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold mb-1 text-offwhite uppercase tracking-wide text-sm">Curated with Pride</h4>
                                        <p className="text-sm text-slate">Only the best quality items on our platform.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold mb-1 text-offwhite uppercase tracking-wide text-sm">Authentic Buying</h4>
                                        <p className="text-sm text-slate">Secure transactions through Meesho.</p>
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
                    <h2 className="text-3xl font-bold font-heading mb-12 text-offwhite uppercase tracking-wider">The Alpha Strix Promise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors hover:shadow-2xl">
                            <Star className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-heading font-bold text-xl mb-3 text-gold uppercase tracking-wider">Premium Quality</h3>
                            <p className="text-slate text-sm leading-relaxed">Uncompromising quality in every piece we showcase for the modern man.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors hover:shadow-2xl transform md:-translate-y-4">
                            <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-heading font-bold text-xl mb-3 text-gold uppercase tracking-wider">Secure Shopping</h3>
                            <p className="text-slate text-sm leading-relaxed">Shop safely through trusted affiliate links with full buyer protection.</p>
                        </div>
                        <div className="bg-steel/50 p-8 rounded-xl border border-gold/10 hover:border-gold/30 transition-colors hover:shadow-2xl">
                            <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
                            <h3 className="font-heading font-bold text-xl mb-3 text-gold uppercase tracking-wider">Bold First</h3>
                            <p className="text-slate text-sm leading-relaxed">Your bold style is our priority. We feature products loved by real men.</p>
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
                                    <p className="text-slate leading-relaxed">
                                        Tarnaka, Hyderabad,<br />
                                        Telangana, 500007
                                    </p>
                                </div>
                            </div>

                            <div className="bg-steel/50 p-6 rounded-xl border border-gold/20 flex gap-6">
                                <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-lg mb-2 text-offwhite uppercase tracking-wide">Email Us</h3>
                                    <a href="mailto:contact@alphastrix.in" className="text-gold hover:text-gold-lt block transition-colors">
                                        contact@alphastrix.in
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
