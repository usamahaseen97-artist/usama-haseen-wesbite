import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, ServiceOrder } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { 
  Bot, LogOut, CheckCircle2, Clock, Mail, 
  Trash2, ExternalLink, Filter, Smartphone, 
  Globe, Code, Database, ChevronDown, User, Phone,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const { user, login, logout, isAdmin, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted'>('all');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ServiceOrder[];
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, 'list' as any, 'orders');
    });

    return unsubscribe;
  }, [isAdmin]);

  const toggleExpand = (id: string) => {
    const next = new Set(expandedOrders);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedOrders(next);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { 
        status: newStatus 
      });
    } catch (error) {
      handleFirestoreError(error, 'update' as any, `orders/${orderId}`);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (error) {
      handleFirestoreError(error, 'delete' as any, `orders/${orderId}`);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-brand-primary">Initializing Intelligence...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full glass p-10 rounded-[40px] text-center">
          <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Bot className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
          <p className="text-slate-400 mb-8">Please authenticate with your secure account to manage incoming inquiries.</p>
          <button 
            onClick={login}
            className="w-full bg-brand-primary text-brand-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90"
          >
            Authenticate with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md glass p-10 rounded-[40px]">
          <h1 className="text-3xl font-bold text-red-500 mb-4">ACCESS DENIED</h1>
          <p className="text-slate-400 mb-8">Your account does not have administrative privileges for this system.</p>
          <button onClick={logout} className="text-brand-primary font-bold hover:underline">Sign Out</button>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter(o => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-brand-dark" />
          </div>
          <h2 className="font-display font-bold text-lg">Inquiry Command Center</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden md:inline">Logged in as {user.email}</span>
          <button 
            onClick={logout}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold uppercase mb-2">Incoming Streams</h1>
            <p className="text-slate-500">Pipeline total: {orders.length} inquiries</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {(['all', 'pending', 'contacted'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-xl text-sm font-bold uppercase transition-all ${
                  filter === f ? 'bg-brand-primary text-brand-dark' : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Retrieving encrypted data...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const isExpanded = expandedOrders.has(order.id!);
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass rounded-[32px] overflow-hidden border border-white/5 hover:border-brand-primary/20 transition-all"
                  >
                    <div className="p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col justify-between md:w-1/4 pb-6 md:pb-0 md:border-r border-white/5">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {order.status === 'pending' ? <Clock className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                              order.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold leading-tight mb-2 flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-500" />
                            {order.clientName}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-wider mb-4">
                            <Calendar className="w-3 h-3" />
                            {new Date(order.createdAt?.seconds * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <a href={`mailto:${order.clientEmail}`} className="p-2 glass rounded-lg hover:bg-brand-primary/20 text-brand-primary transition-colors" title="Send Email">
                            <Mail className="w-4 h-4" />
                          </a>
                          {order.clientPhone && (
                            <a href={`tel:${order.clientPhone}`} className="p-2 glass rounded-lg hover:bg-brand-secondary/20 text-brand-secondary transition-colors" title="Call Client">
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                          <button 
                            onClick={() => deleteOrder(order.id!)}
                            className="p-2 glass rounded-lg hover:bg-rose-500/20 text-rose-500 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                            <span className="text-xs font-black uppercase text-brand-secondary tracking-widest">{order.serviceType}</span>
                          </div>
                          <button 
                            onClick={() => toggleExpand(order.id!)}
                            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
                          >
                            {isExpanded ? 'Hide Details' : 'View Details'}
                            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 italic text-slate-300 leading-relaxed text-sm line-clamp-2">
                          "{order.message}"
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-white/5 mt-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="glass p-4 rounded-xl">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Contact Email</p>
                                    <p className="text-sm font-bold text-brand-primary">{order.clientEmail}</p>
                                  </div>
                                  <div className="glass p-4 rounded-xl">
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-sm font-bold text-white">{order.clientPhone || 'Not provided'}</p>
                                  </div>
                                </div>
                                <div className="glass p-6 rounded-xl">
                                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Full Message Payload</p>
                                  <p className="text-sm text-slate-200 whitespace-pre-wrap">{order.message}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="md:w-1/5 flex flex-col gap-3 justify-center">
                        {order.status === 'pending' && (
                          <button 
                            onClick={() => updateStatus(order.id!, 'contacted')}
                            className="w-full py-4 glass text-emerald-500 border-emerald-500/20 font-bold rounded-2xl hover:bg-emerald-500 hover:text-white transition-all text-sm uppercase tracking-widest"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {order.status === 'contacted' && (
                          <button 
                             onClick={() => updateStatus(order.id!, 'completed')}
                             className="w-full py-4 glass text-brand-primary border-brand-primary/20 font-bold rounded-2xl hover:bg-brand-primary hover:text-brand-dark transition-all text-sm uppercase tracking-widest"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button 
                           onClick={() => window.open(`mailto:${order.clientEmail}?subject=Regarding your ${order.serviceType} inquiry`)}
                           className="w-full py-4 bg-brand-primary text-brand-dark font-black rounded-2xl hover:scale-105 transition-transform text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                          Draft Email <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filteredOrders.length === 0 && (
              <div className="text-center py-20 glass rounded-[40px] border-dashed border-white/10">
                <p className="text-slate-500 uppercase tracking-[0.2em] text-sm">No synchronized transmissions found in this filter.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

