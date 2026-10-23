/**
 * The HH mark: two H's sharing one stem, crossbars stepping down. One merged path in
 * currentColor, so it takes whatever text colour it sits in (see public/brand for the
 * two-colour versions). Size it in multiples of 5px so every cell lands on whole pixels.
 */
export function HHMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M0 0H20V20H40V0H60V60H80V0H100V100H80V80H60V100H40V40H20V100H0Z" />
    </svg>
  );
}
