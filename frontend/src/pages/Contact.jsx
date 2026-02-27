import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Mail, MapPin, Send, Phone } from 'lucide-react';
import API from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        whatsappNumber: '+919876543210',
        email: 'contact@alphastrix.in',
        address: 'Tarnaka, Hyderabad,\nTelangana, 500007'
    });

    useEffect(() => {
        API.get('/settings').then(res => {
            if (res.data) setSettings(res.data);
        }).catch(() => { });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success('Message sent! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-navy">
            <div className="bg-charcoal py-16 border-b border-gold/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading text-offwhite uppercase tracking-wider mb-4">Contact Us</h1>
                    <div className="w-16 h-1 bg-gold mx-auto rounded-full"></div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                                <input type="text" name="name" value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })} required
                                    className="w-full bg-navy border border-gold/20 focus:border-gold rounded-lg px-4 py-3 outline-none text-offwhite placeholder-slate text-sm"
                                    placeholder="Your Name" />
                                <input type="email" name="email" value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })} required
                                    className="w-full bg-navy border border-gold/20 focus:border-gold rounded-lg px-4 py-3 outline-none text-offwhite placeholder-slate text-sm"
                                    placeholder="Email Address" />
                            </div>
                            <input type="text" name="subject" value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })} required
                                className="w-full bg-navy border border-gold/20 focus:border-gold rounded-lg px-4 py-3 outline-none text-offwhite placeholder-slate text-sm"
                                placeholder="Subject" />
                            <textarea name="message" value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })} required rows="5"
                                className="w-full bg-navy border border-gold/20 focus:border-gold rounded-lg px-4 py-3 outline-none resize-none text-offwhite placeholder-slate text-sm"
                                placeholder="Your message..."></textarea>
                            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base disabled:opacity-70">
                                <Send size={18} /> {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
