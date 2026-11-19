// Komponen bar ringkasan biaya menempel di bawah layar beserta detail rincian sesuai FT-04.
import {ChevronDown, ChevronUp} from 'lucide-react';
import {useState, type ReactNode} from 'react';
import type {MainService} from '../config';
import type {CostBreakdown, SelectedAddOns} from '../lib/calculator';
import {formatBeratKg, formatRupiah} from '../lib/format';

interface FloatingPriceSummaryProps {
  selectedService: MainService;
  selectedAddOns: SelectedAddOns;
  breakdown: CostBreakdown;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
}

export function FloatingPriceSummary({
  selectedService,
  selectedAddOns,
  breakdown,
  primaryAction,
  secondaryAction,
}: FloatingPriceSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasWeight = breakdown.billedWeightKg !== null;

  return (
    <aside
      aria-label="Ringkasan estimasi biaya"
      className="fixed inset-x-0 bottom-0 z-20 bg-white border-t border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto max-w-3xl px-4 py-2.5">
        {isExpanded && (
          <div
            id="panel-rincian-biaya"
            className="mb-3 border-b border-neutral-200 pb-3 space-y-2 text-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-600">
                Biaya Layanan Utama ({selectedService.name}
                {hasWeight && breakdown.billedWeightKg !== null
                  ? `, ${formatBeratKg(breakdown.billedWeightKg)} kg`
                  : ''}
                )
              </span>
              <span className="font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                {formatRupiah(breakdown.mainCost)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-600">Biaya Tambahan</span>
              <span className="font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                {formatRupiah(breakdown.addOnsCost)}
              </span>
            </div>

            {selectedAddOns.T01 && (
              <div className="flex items-center justify-between gap-4 pl-3 text-neutral-600">
                <span>Antar-Jemput</span>
                <span className="tabular-nums whitespace-nowrap">
                  {formatRupiah(breakdown.deliveryCost)}
                </span>
              </div>
            )}

            {selectedAddOns.T02 && (
              <div className="flex items-center justify-between gap-4 pl-3 text-neutral-600">
                <span>Pewangi Premium</span>
                <span className="tabular-nums whitespace-nowrap">
                  {hasWeight
                    ? formatRupiah(breakdown.fragranceCost)
                    : 'Menunggu berat'}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-2">
              <span className="font-semibold text-neutral-900">
                Total Estimasi
              </span>
              <span className="text-base font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                {formatRupiah(breakdown.totalEstimate)}
              </span>
            </div>

            <p className="text-sm text-neutral-600">
              Nominal di atas adalah estimasi awal sebelum penimbangan ulang
              oleh toko.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-neutral-600 whitespace-nowrap">
                Total Estimasi
              </span>
              <span className="text-xl font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                {formatRupiah(breakdown.totalEstimate)}
              </span>
            </div>
            <p className="truncate text-sm text-neutral-600 tabular-nums">
              {hasWeight
                ? `Utama ${formatRupiah(breakdown.mainCost)} + Tambahan ${formatRupiah(breakdown.addOnsCost)}`
                : `${selectedService.name} (${formatRupiah(selectedService.pricePerKg)}/kg), berat belum diisi`}
            </p>
          </div>

          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls="panel-rincian-biaya"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1 rounded-xl px-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
          >
            <span>Rincian</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {secondaryAction}
          {primaryAction}
        </div>
      </div>
    </aside>
  );
}
