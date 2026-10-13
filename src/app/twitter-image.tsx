import { site } from "@/content/site";
import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = `${site.name} — ${site.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgImage();
}
