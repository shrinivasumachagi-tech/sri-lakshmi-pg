'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  HelpCircle,
  LogOut,
  Search,
  Download,
  Trash2,
  MessageCircle,
} from 'lucide-react';

type Tab = 'dashboard' | 'admissions' | 'gallery' | 'faq';

interface Admission {
  id: string;
  admission_id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp: string;
  date_of_birth: string;
  college_name: string;
  course_name: string;
  room_type: string;
  stay_duration: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin');
      return;
    }
    const load = async () => {
      try {
        const res = await fetch('/api/admin/admissions');
        const data = await res.json();
        setAdmissions(data.data || []);
      } catch (e) {
        console.error('Failed to fetch admissions', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admission?')) return;
    try {
      await fetch(`/api/admin/admissions?id=${id}`, { method: 'DELETE' });
      setAdmissions((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  const handleExportCSV = () => {
    const header = 'ID,Name,Email,Phone,Room,Status,Date\n';
    const rows = admissions
      .map(
        (a) =>
          `${a.admission_id},"${a.full_name}",${a.email},${a.phone},${a.room_type},${a.status},${a.created_at}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredAdmissions = admissions.filter(
    (a) =>
      a.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.admission_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone?.includes(searchQuery) ||
      a.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs: { key: Tab; label: string; icon: LucideIcon }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'admissions', label: 'Admissions', icon: Users },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon },
    { key: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-black text-sm shadow-lg">
            SL
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Admin Panel</p>
            <p className="text-xs text-gray-500">Sri Lakshmi PG</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-4"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Total Admissions</p>
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-900">{admissions.length}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Pending</p>
                  <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-900">
                  {admissions.filter((a) => a.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-500 text-sm font-medium">Confirmed</p>
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-black text-gray-900">
                  {admissions.filter((a) => a.status === 'confirmed').length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent Admissions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-600">ID</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Phone</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Room</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissions.slice(0, 5).map((a) => (
                      <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-mono text-xs">{a.admission_id}</td>
                        <td className="p-4 font-medium">{a.full_name}</td>
                        <td className="p-4 text-gray-600">{a.phone}</td>
                        <td className="p-4">{a.room_type}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              a.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 text-xs">
                          {new Date(a.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Admissions</h1>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 h-12 bg-white border border-gray-200 rounded-xl pl-10 pr-4 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 h-12 px-6 bg-gradient-brand text-white rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-500">Loading...</div>
              ) : filteredAdmissions.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No admissions found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-4 font-semibold text-gray-600">ID</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Email</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Phone</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Parent</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Room</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                        <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmissions.map((a) => (
                        <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="p-4 font-mono text-xs text-pink-600 font-semibold">
                            {a.admission_id}
                          </td>
                          <td className="p-4 font-medium">{a.full_name}</td>
                          <td className="p-4 text-gray-600">{a.email}</td>
                          <td className="p-4 text-gray-600">{a.phone}</td>
                          <td className="p-4 text-gray-600">-</td>
<td className="p-4">{a.room_type}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                a.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-500 text-xs">
                            {new Date(a.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Gallery Management</h1>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-medium">
                Gallery images can be uploaded via Supabase Storage dashboard.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Images appear on the public website automatically.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">FAQ Management</h1>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 font-medium">
                FAQ entries can be managed through Supabase database directly.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                FAQs are loaded from the `faq_entries` table in Supabase.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
