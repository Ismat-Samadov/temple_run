// src/app/admin/page.tsx
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | Healthcare Assistant',
  description: 'Manage your healthcare application settings and users',
};

export default function AdminPage() {
  return <AdminDashboard />;
}