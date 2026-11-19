// Komponen pratinjau pesan WhatsApp dan panel konfirmasi tautan kirim sesuai FT-06.
import {Check, ChevronDown, ChevronUp, Copy, ExternalLink} from 'lucide-react';
import {useState} from 'react';

interface WhatsAppPreviewPanelProps {
  message: string;
  whatsappUrl: string;
  hasSubmitted: boolean;
}

export function WhatsAppPreviewPanel({
  message,
  whatsappUrl,
  hasSubmitted,
}: WhatsAppPreviewPanelProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <section aria-label="Pratinjau dan tautan WhatsApp" className="mt-4 space-y-4">
      {hasSubmitted && (
        <div
          role="status"
          className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <p className="font-semibold">
            Pesanan Anda siap dikirim ke WhatsApp.
          </p>
          <p className="mt-1">
            Jika halaman WhatsApp belum terbuka otomatis, gunakan tautan atau
            tombol salin pesan di bawah ini.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
            >
              <span>Buka WhatsApp Sekarang</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-700" />
                  <span>Pesan Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white p-4">
        <button
          type="button"
          aria-expanded={isPreviewOpen}
          aria-controls="panel-pratinjau-whatsapp"
          onClick={() => setIsPreviewOpen((prev) => !prev)}
          className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl px-1 text-left text-sm font-medium text-neutral-900 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
        >
          <span>Lihat Pratinjau Pesan</span>
          {isPreviewOpen ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-600" />
          ) : (
            <ChevronUp className="h-4 w-4 shrink-0 text-neutral-600" />
          )}
        </button>

        {isPreviewOpen && (
          <div
            id="panel-pratinjau-whatsapp"
            className="mt-3 border-t border-neutral-200 pt-3"
          >
            <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-700 leading-relaxed">
              {message}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
