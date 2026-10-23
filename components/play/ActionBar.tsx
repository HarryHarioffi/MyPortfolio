import type { ReactNode } from "react";

/**
 * The floating bar at the bottom of the canvas, like a design tool's toolbar: the game's actions
 * (Lock in and the like) live here, in the same place whichever game is open.
 */
export function ActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-5 z-10 flex justify-center">
      <div className="pointer-events-auto flex items-center gap-1.5 border border-line bg-paper p-1.5 shadow-[0_8px_24px_rgb(42_48_53/0.12)]">
        {children}
      </div>
    </div>
  );
}
