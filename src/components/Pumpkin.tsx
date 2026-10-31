type PumpkinProps = {
  className?: string
}

function Pumpkin({ className }: PumpkinProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 104"
      role="presentation"
      aria-hidden="true"
    >
      <path
        d="M58 22c0-8 3-14 11-18l6 6c-5 3-7 7-7 12z"
        fill="var(--color-brown)"
        stroke="var(--color-orange-light)"
        strokeWidth="1.5"
      />
      <ellipse cx="26" cy="60" rx="22" ry="34" fill="#c75f08" />
      <ellipse cx="94" cy="60" rx="22" ry="34" fill="#c75f08" />
      <ellipse cx="44" cy="60" rx="22" ry="38" fill="var(--color-orange)" />
      <ellipse cx="76" cy="60" rx="22" ry="38" fill="var(--color-orange)" />
      <ellipse cx="60" cy="60" rx="18" ry="39" fill="var(--color-orange-light)" />
      <g fill="var(--color-brown-dark)">
        <path d="M30 52l13-11 8 15z" />
        <path d="M90 52L77 41l-8 15z" />
        <path d="M60 58l7 10H53z" />
        <path d="M26 72c11 4 20 5 22 5l3 6 6-5h6l6 5 3-6c2 0 11-1 22-5-6 14-19 20-34 20s-28-6-34-20z" />
      </g>
    </svg>
  )
}

export default Pumpkin
