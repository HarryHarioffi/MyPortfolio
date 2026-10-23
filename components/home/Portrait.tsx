import Image from "next/image";

/**
 * The photo that sits inside the intro sentence, about a capital letter tall. On hover it
 * tips back and grows (.portrait in globals.css). Initials hold its place until there's a photo.
 */
export function Portrait({ src, name }: { src: string | null; name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <span className="portrait">
      {src ? (
        // Sized for the hover state: about 90px across, on a 2x screen.
        <Image src={src} alt={name} width={180} height={180} sizes="192px" className="size-full object-cover" />
      ) : (
        <span aria-hidden="true" className="portrait-initials">
          {initials}
        </span>
      )}
    </span>
  );
}
