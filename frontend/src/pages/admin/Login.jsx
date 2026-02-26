import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/auth/login', formData);
            localStorage.setItem('adminToken', res.data.token);
            toast.success('Welcome back, Admin!');
            navigate('/admin');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <img src="/logo.png" alt="Alpha Strix" className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_10px_rgba(192,192,192,0.3)]" />
                    </div>
                    <h1 className="font-heading text-4xl font-extrabold text-gold uppercase tracking-[0.2em]">Alpha Strix</h1>
                    <p className="text-slate text-xs mt-2 uppercase tracking-[0.4em] opacity-70 font-medium">The Alpha Collection</p>
                </div>

                <div className="bg-steel rounded-2xl p-8 border border-gold/20 shadow-2xl">
                    <h2 className="text-2xl font-heading font-bold text-offwhite mb-6 text-center uppercase tracking-wider">Sign In</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate mb-2">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-navy border border-gold/20 focus:border-gold rounded-xl px-4 py-3 text-offwhite placeholder-slate outline-none focus:ring-1 focus:ring-gold transition-colors"
                                placeholder="admin@alphastrix.in"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-navy border border-gold/20 focus:border-gold rounded-xl px-4 py-3 text-offwhite placeholder-slate outline-none focus:ring-1 focus:ring-gold transition-colors"
                                placeholder="Enter password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 mt-2 text-base disabled:opacity-70"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
