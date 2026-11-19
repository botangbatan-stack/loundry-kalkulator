// Komponen penunjuk posisi langkah pemesanan pada tata letak langkah bertahap.

export interface StepItem {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: readonly StepItem[];
  currentStep: number;
  onStepSelect?: (stepNumber: number) => void;
  maxReachableStep: number;
}

export function StepIndicator({
  steps,
  currentStep,
  onStepSelect,
  maxReachableStep,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Tahapan pemesanan" className="w-full">
      <ol className="flex items-center gap-2 overflow-x-auto py-1">
        {steps.map((step, index) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isClickable = Boolean(onStepSelect) && step.number <= maxReachableStep && step.number !== currentStep;

          return (
            <li key={step.number} className="flex items-center gap-2 shrink-0">
              {isClickable ? (
                <button
                  type="button"
                  onClick={() => onStepSelect?.(step.number)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-colors duration-150 ease-out motion-reduce:transition-none"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700 tabular-nums">
                    {step.number}
                  </span>
                  <span className="whitespace-nowrap">{step.label}</span>
                </button>
              ) : (
                <div
                  aria-current={isCurrent ? 'step' : undefined}
                  className="inline-flex min-h-[44px] items-center gap-2 px-1 text-sm"
                >
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold tabular-nums ${
                      isCurrent
                        ? 'bg-blue-700 text-white'
                        : isCompleted
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`whitespace-nowrap ${
                      isCurrent
                        ? 'font-semibold text-neutral-900'
                        : 'font-normal text-neutral-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              )}

              {index < steps.length - 1 && (
                <span aria-hidden="true" className="h-px w-4 bg-neutral-200 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
