// src/app/privacy/page.tsx
import PrivacyPolicy from '../../components/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy | Healthcare Assistant',
  description: 'Learn how the Healthcare Assistant handles your data and protects your privacy',
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}