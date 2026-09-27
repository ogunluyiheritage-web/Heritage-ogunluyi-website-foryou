import { contact, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="container-edge py-12 md:py-14 border-t border-line text-sm text-stone">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="mt-1">
            {site.role} / {site.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <a href={contact.emailHref} className="underline-hover w-fit pb-0.5">
            {contact.email}
          </a>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="underline-hover w-fit pb-0.5">
            {contact.whatsapp}
          </a>
          <a href={contact.phoneHref} className="underline-hover w-fit pb-0.5">
            {contact.phone}
          </a>
        </div>
      </div>

      <p className="mt-10 md:mt-12">
        © {site.year} {site.name}
      </p>
    </footer>
  );
}
