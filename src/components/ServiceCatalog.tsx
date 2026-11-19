// Komponen katalog paket layanan utama dengan pilihan radio vertikal sesuai FT-01.
import {Check} from 'lucide-react';
import {MAIN_SERVICES, type ServiceCode} from '../config';
import {formatRupiah} from '../lib/format';

interface ServiceCatalogProps {
  selectedServiceCode: ServiceCode;
  onSelectService: (code: ServiceCode) => void;
}

export function ServiceCatalog({
  selectedServiceCode,
  onSelectService,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="judul-katalog-layanan">
      <h2
        id="judul-katalog-layanan"
        className="text-lg font-semibold text-neutral-900"
      >
        Pilih Layanan Utama
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        Pilih satu paket cucian sesuai kebutuhan Anda.
      </p>

      <fieldset className="mt-4 space-y-3">
        <legend className="sr-only">Daftar paket layanan utama</legend>
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedServiceCode;
          const inputId = `service-${service.code}`;

          return (
            <label
              key={service.code}
              htmlFor={inputId}
              className={`block cursor-pointer rounded-2xl border p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                id={inputId}
                type="radio"
                name="main-service"
                value={service.code}
                checked={isSelected}
                onChange={() => onSelectService(service.code)}
                className="sr-only"
              />

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-base font-semibold text-neutral-900">
                      {service.name}
                    </span>
                    <span className="text-base font-semibold text-blue-700 tabular-nums whitespace-nowrap">
                      {formatRupiah(service.pricePerKg)}/kg
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-neutral-700 tabular-nums">
                    Estimasi selesai {service.durationDays} hari
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    {service.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>
            </label>
          );
        })}
      </fieldset>
    </section>
  );
}
