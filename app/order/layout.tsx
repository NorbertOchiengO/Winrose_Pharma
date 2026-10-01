import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order medicines via WhatsApp',
  description:
    'Browse everyday medicines and supplies, add them to a request, and send it to Winrose Pharmaceuticals in Utawala on WhatsApp. The pharmacy confirms availability, price and any prescription requirements.',
  alternates: { canonical: '/order' },
}

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children
}
