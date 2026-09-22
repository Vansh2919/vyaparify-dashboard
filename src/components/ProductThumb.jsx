// Category-based abstract garment glyph — keeps the catalog visually distinct
// without depending on external product photography.
const PALETTES = {
  Men: ["#FFE4D6", "#E8542E"],
  Women: ["#E4E9F7", "#3B4A9E"],
  Unisex: ["#E1F2EE", "#0F766E"],
};

export default function ProductThumb({ category = "Unisex", size = "md" }) {
  const [bg, fg] = PALETTES[category] || PALETTES.Unisex;
  return (
    <div className={`product-thumb product-thumb--${size}`} style={{ background: bg }}>
      <svg viewBox="0 0 48 48" width="44%" height="44%" fill="none" stroke={fg} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M17 6l-9 6 4 6 3-2v26h18V16l3 2 4-6-9-6c-1 2-3.5 3.5-6.5 3.5S18 8 17 6z" />
      </svg>
    </div>
  );
}
