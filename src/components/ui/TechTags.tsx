export function TechTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line px-2.5 py-1 label text-text-mute"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
