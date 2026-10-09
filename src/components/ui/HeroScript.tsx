/**
 * The owner's name in traditional Mongol script (Mongol bichig), set in its
 * native vertical direction beside the portrait.
 *
 * Gated: the spelling must come from the owner, never be guessed. Paste it
 * into NAME_MONG to turn this on, then check the rendering in a browser.
 */
export const NAME_MONG: string | null = null;

export function HeroScript() {
  if (!NAME_MONG) return null;
  return (
    <p className="hero-script" lang="mn-Mong">
      {NAME_MONG}
    </p>
  );
}
