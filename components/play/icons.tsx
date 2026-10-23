import type { SVGProps } from "react";

/**
 * Icons from Tabler Icons (https://tabler.io/icons, MIT licence), copied in as paths so the site
 * needs no icon package. They are drawn on a 24px grid with a 2px round stroke and take the
 * colour of the text they sit in. To use another one, copy its paths the same way.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Outline({ size = 16, paths, ...props }: IconProps & { paths: readonly string[] }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

/** Tabler: vector-spline */
export const IconSpline = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M17 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
      "M3 17m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
      "M17 5c-6.627 0 -12 5.373 -12 12",
    ]}
  />
);

/** Tabler: vector-bezier */
export const IconBezier = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M3 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
      "M17 14m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
      "M10 6m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z",
      "M10 8.5a6 6 0 0 0 -5 5.5",
      "M14 8.5a6 6 0 0 1 5 5.5",
      "M10 8l-6 0",
      "M20 8l-6 0",
      "M3 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
      "M21 8m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    ]}
  />
);

/** Tabler: letter-spacing */
export const IconLetterSpacing = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M5 12v-5.5a2.5 2.5 0 0 1 5 0v5.5m0 -4h-5",
      "M13 4l3 8l3 -8",
      "M5 18h14",
      "M17 20l2 -2l-2 -2",
      "M7 16l-2 2l2 2",
    ]}
  />
);

/** Tabler: lock */
export const IconLock = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z",
      "M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",
      "M8 11v-4a4 4 0 1 1 8 0v4",
    ]}
  />
);

/** Tabler: arrow-back-up */
export const IconUndo = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M9 14l-4 -4l4 -4",
      "M5 10h11a4 4 0 1 1 0 8h-1",
    ]}
  />
);

/** Tabler: trash */
export const IconTrash = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M4 7l16 0",
      "M10 11l0 6",
      "M14 11l0 6",
      "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",
      "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",
    ]}
  />
);

/** Tabler: restore */
export const IconReset = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M3.06 13a9 9 0 1 0 .49 -4.087",
      "M3 4.001v5h5",
      "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",
    ]}
  />
);

/** Tabler: reload */
export const IconReplay = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747",
      "M20 4v5h-5",
    ]}
  />
);

/** Tabler: help */
export const IconHelp = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
      "M12 17l0 .01",
      "M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4",
    ]}
  />
);

/** Tabler: player-play */
export const IconPlay = (props: IconProps) => (
  <Outline
    {...props}
    paths={[
      "M7 4v16l13 -8z",
    ]}
  />
);

/** Tabler: trophy (filled). The medal colour comes from the text colour around it. */
export function IconTrophy({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2.17a3 3 0 1 1 0 5.659v.171a6.002 6.002 0 0 1 -5 5.917v2.083h3a1 1 0 0 1 .117 1.993l-.117 .007h-8a1 1 0 0 1 -.117 -1.993l.117 -.007h3v-2.083a6.002 6.002 0 0 1 -4.996 -5.692l-.004 -.225v-.171a3 3 0 0 1 -3.996 -2.653l-.003 -.176l.005 -.176a3 3 0 0 1 3.995 -2.654l-.001 -2.17a1 1 0 0 1 1 -1h10zm-12 5a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm14 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z" />
    </svg>
  );
}
