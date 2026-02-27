import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { getImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';
import { LogOut, Plus, Edit2, Trash2, Link as LinkIcon, Image as ImageIcon, Package, X, Grid } from 'lucide-react';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('products');
    const navigate = useNavigate();

    // Product Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', originalPrice: '', categoryId: '',
        meeshoLink: '', badge: '', isFeatured: false, isTrending: false, inStock: true
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) { navigate('/admin/login'); return; }
        fetchData();
    }, [token, navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [prodRes, catRes, statRes] = await Promise.all([
                API.get('/products?limit=100'),
                API.get('/categories'),
                API.get('/analytics')
            ]);
            setProducts(prodRes.data.products);
            setCategories(catRes.data);
            setStats(statRes.data);
        } catch (err) {
            if (err.response?.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin/login'); }
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login'); };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try { await API.delete(`/products/${id}`); toast.success('Product deleted'); fetchData(); }
        catch (err) { toast.error('Failed to delete'); }
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name, description: product.description, price: product.price,
                originalPrice: product.originalPrice, categoryId: product.category?._id || product.category,
                meeshoLink: product.meeshoLink, badge: product.badge || '',
                isFeatured: product.isFeatured, isTrending: product.isTrending, inStock: product.inStock
            });
            setImagePreview(product.images?.[0] || '');
        } else {
            setEditingProduct(null);
            setFormData({
                name: '', description: '', price: '', originalPrice: '',
                categoryId: categories.length > 0 ? categories[0]._id : '',
                meeshoLink: '', badge: '', isFeatured: false, isTrending: false, inStock: true
            });
            setImagePreview('');
        }
        setSelectedImage(null);
        setIsModalOpen(true);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) { toast.error('Image too large! Max 5 MB.'); e.target.value = ''; return; }
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) { toast.error('Use JPG, PNG, or WebP.'); e.target.value = ''; return; }
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1500;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                    } else {
                        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                    }, 'image/jpeg', 0.85); // 85% quality
                };
            };
        });
    };

    const uploadToCloudinary = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            console.warn('Cloudinary credentials missing, falling back to local upload');
            return null;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.secure_url) return data.secure_url;
            throw new Error(data.error?.message || 'Upload failed');
        } catch (err) {
            console.error('Cloudinary Error:', err);
            toast.error('Cloudinary upload failed: ' + err.message);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();

        // Add basic fields
        Object.keys(formData).forEach(key => submitData.append(key, formData[key]));

        const cat = categories.find(c => c._id === formData.categoryId);
        if (cat) submitData.append('categoryName', cat.name);

        try {
            if (selectedImage) {
                toast.loading('Uploading image...', { id: 'upload' });
                const compressed = await compressImage(selectedImage);
                const cloudinaryUrl = await uploadToCloudinary(compressed);

                if (cloudinaryUrl) {
                    // Send as JSON string for images array
                    submitData.append('images', JSON.stringify([cloudinaryUrl]));
                } else {
                    // Fallback to local upload
                    submitData.append('images', selectedImage);
                }
                toast.dismiss('upload');
            } else if (editingProduct) {
                // Keep existing images if no new one selected
                submitData.append('images', JSON.stringify(editingProduct.images || []));
            }

            if (editingProduct) {
                await API.put(`/products/${editingProduct._id}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Product updated');
            } else {
                await API.post('/products', submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
                toast.success('Product added');
            }
            setIsModalOpen(false); fetchData();
        } catch (err) {
            toast.dismiss('upload');
            toast.error(err.response?.data?.message || 'Operation failed');
        }
    };

    const inputCls = "w-full bg-navy border border-gold/20 rounded-xl px-4 py-2.5 text-offwhite placeholder-slate outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm";

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-navy">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-navy flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-charcoal border-r border-gold/20 flex-col hidden md:flex">
                <div className="h-20 flex items-center px-6 border-b border-gold/20 gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-110" />
                    </div>
                    <span className="font-heading text-xl font-bold text-gold tracking-widest uppercase">Alpha Strix</span>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-heading uppercase tracking-wider text-sm ${activeTab === 'products' ? 'bg-gold/10 text-gold border border-gold/30' : 'text-slate hover:bg-steel/50 hover:text-offwhite'}`}
                    >
                        <Package size={20} /> Products
                    </button>
                </nav>

                <div className="p-4 border-t border-gold/20">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-colors font-heading uppercase tracking-wider text-sm">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile header */}
                <div className="md:hidden h-16 bg-charcoal border-b border-gold/20 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain brightness-110" />
                        </div>
                        <span className="font-heading text-lg font-bold text-gold uppercase tracking-widest">Alpha Strix</span>
                    </div>
                    <button onClick={handleLogout} className="text-red-400"><LogOut size={20} /></button>
                </div>

                {/* Mobile tabs */}
                <div className="md:hidden flex border-b border-gold/20 bg-charcoal">
                    <button onClick={() => setActiveTab('products')} className={`flex-1 py-3 text-sm font-heading uppercase tracking-wider ${activeTab === 'products' ? 'text-gold border-b-2 border-gold' : 'text-slate'}`}>Products</button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-navy">

                    {/* Stats */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                            {[
                                { label: 'Total Products', value: stats.totalProducts },
                                { label: 'Total Categories', value: stats.totalCategories },
                                { label: 'Featured Items', value: stats.featuredCount },
                                { label: 'Trending Items', value: stats.trendingCount },
                            ].map(s => (
                                <div key={s.label} className="bg-steel p-6 rounded-xl border border-gold/10">
                                    <div className="text-slate text-sm mb-1">{s.label}</div>
                                    <div className="text-3xl font-bold text-gold font-heading">{s.value}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── PRODUCTS TAB ── */}
                    {activeTab === 'products' && (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h1 className="text-2xl font-bold text-offwhite font-heading uppercase tracking-wider">Products</h1>
                                <button onClick={() => openModal()} className="btn-primary py-2.5 px-5 text-sm">
                                    <Plus size={18} /> Add Product
                                </button>
                            </div>

                            <div className="bg-steel rounded-xl border border-gold/10 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-charcoal border-b border-gold/20 text-slate text-xs uppercase tracking-widest">
                                                <th className="px-6 py-4 font-medium">Product</th>
                                                <th className="px-6 py-4 font-medium">Price</th>
                                                <th className="px-6 py-4 font-medium">Category</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gold/10">
                                            {products.map(product => (
                                                <tr key={product._id} className="hover:bg-navy/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-lg bg-navy overflow-hidden shrink-0 border border-gold/10">
                                                                <img
                                                                    src={getImageUrl(product.images?.[0]) || ''}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100'; }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-offwhite truncate max-w-[200px] text-sm">{product.name}</div>
                                                                <a href={product.meeshoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-gold/60 flex items-center gap-1 hover:text-gold transition-colors">
                                                                    <LinkIcon size={12} /> Meesho Link
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gold font-heading">₹{product.price}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-navy text-slate text-xs px-2.5 py-1 rounded-md border border-gold/20">{product.categoryName}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            {product.isFeatured && <span className="text-xs text-gold bg-gold/10 border border-gold/20 px-2 rounded w-fit">Featured</span>}
                                                            {product.isTrending && <span className="text-xs text-amber-400 bg-amber-400/10 px-2 rounded w-fit">Trending</span>}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => openModal(product)} className="text-slate hover:text-gold transition-colors">
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button onClick={() => handleDelete(product._id)} className="text-slate hover:text-red-400 transition-colors">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Main content area */}
                </div>
            </main>

            {/* ── ADD/EDIT PRODUCT MODAL ── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm">
                    <div className="bg-steel rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gold/20 animate-slide-up">
                        <div className="sticky top-0 bg-steel/95 backdrop-blur-md px-8 py-5 border-b border-gold/20 flex justify-between items-center z-10">
                            <h2 className="text-xl font-heading font-bold text-offwhite uppercase tracking-wider">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate hover:text-offwhite bg-navy/50 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left – Image & Basic */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate mb-2">Product Image</label>
                                        <div className="border-2 border-dashed border-gold/20 rounded-xl h-56 flex flex-col items-center justify-center relative overflow-hidden group hover:border-gold transition-colors">
                                            {imagePreview ? (
                                                <>
                                                    <img src={getImageUrl(imagePreview)} alt="Preview" className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-lg">Click to change</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <div className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                        <ImageIcon size={28} className="text-gold" />
                                                    </div>
                                                    <p className="text-sm font-medium text-slate">Click to upload image</p>
                                                    <p className="text-xs text-slate/60 mt-1">JPG · PNG · WebP · Max 5 MB</p>
                                                </div>
                                            )}
                                            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate mb-2">Product Name</label>
                                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate mb-2">Selling Price (₹)</label>
                                            <input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className={inputCls} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate mb-2">Original Price (₹)</label>
                                            <input type="number" required value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} className={inputCls} />
                                        </div>
                                    </div>
                                </div>

                                {/* Right – Details */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate mb-2">Meesho Affiliate Link</label>
                                        <input type="url" required value={formData.meeshoLink} onChange={e => setFormData({ ...formData, meeshoLink: e.target.value })} className={inputCls} placeholder="https://www.meesho.com/..." />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate mb-2">Category</label>
                                        <select required value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className={inputCls}>
                                            <option value="" disabled>Select a category</option>
                                            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate mb-2">Description</label>
                                        <textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${inputCls} resize-none`}></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate mb-2">Badge</label>
                                            <input type="text" value={formData.badge} onChange={e => setFormData({ ...formData, badge: e.target.value })} className={inputCls} placeholder="e.g. Hot, Sale, New" />
                                        </div>
                                        <div className="flex flex-col justify-end gap-3 pb-2">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} className="rounded h-4 w-4 accent-gold" />
                                                <span className="text-sm text-slate">Featured (Home)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={formData.isTrending} onChange={e => setFormData({ ...formData, isTrending: e.target.checked })} className="rounded h-4 w-4 accent-gold" />
                                                <span className="text-sm text-slate">Trending</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gold/20 flex justify-end gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl border border-gold/20 text-slate font-medium hover:bg-navy transition-colors">Cancel</button>
                                <button type="submit" className="btn-primary py-2.5">{editingProduct ? 'Save Changes' : 'Publish Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
