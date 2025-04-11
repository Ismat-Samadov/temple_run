// src/app/terms/page.tsx
import TermsOfService from '../../components/TermsOfService';

export const metadata = {
  title: 'Terms of Service | Healthcare Assistant',
  description: 'Terms and conditions for using the Healthcare Assistant application',
};

export default function TermsPage() {
  return <TermsOfService />;
}