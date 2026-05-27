import { useEffect } from 'react';

interface AdSlotProps {
  slot: string;
  format?: string;
}

const AD_CLIENT = 'ca-pub-5666903425312739';

export default function AdSlot({ slot, format = 'auto' }: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="ad-slot no-print" aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
