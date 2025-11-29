import type { ReactNode } from "react";
import { Clock, MapPin, Navigation2, Phone } from "lucide-react";

const locationDetails = {
  title: "Get Your Seat Booked",
  description:
    "Visit our offline Skillence classroom near VIMAK General Store to experience the setup, meet mentors, and reserve your seat for the next batch.",
  addressLines: [
    "Pali, Baghpat 250609",
    "Chaudhary Bhure Singh Marg",
  ],
  phone: "+91 97587 81006",
  whatsapp: "+91 97587 81006",
  hours: "Open daily · 10:00 AM – 9:00 PM",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=77.2361%2C28.9126%2C77.2461%2C28.9186&layer=mapnik&marker=28.9156%2C77.2411",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=28.9156%2C77.2411",
};

export default function LocationSection() {
  return (
    <section id="location" className="relative w-full bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                Visit Us
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {locationDetails.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {locationDetails.description}
              </p>
            </div>

            <div className="space-y-5">
              <InfoRow
                icon={<MapPin className="h-5 w-5" />}
                label="Offline center"
                content={
                  <address className="not-italic text-lg font-semibold text-gray-900">
                    {locationDetails.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>
                }
              />

              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label="Call / WhatsApp"
                content={
                  <div className="space-y-1 text-lg font-semibold text-gray-900">
                    <a href={`tel:${locationDetails.phone.replace(/\s/g, "")}`} className="hover:underline">
                      {locationDetails.phone}
                    </a>
                    <p className="text-base font-normal text-gray-500">
                      WhatsApp: {locationDetails.whatsapp}
                    </p>
                  </div>
                }
              />

              <InfoRow
                icon={<Clock className="h-5 w-5" />}
                label="Working hours"
                content={
                  <p className="text-lg font-semibold text-gray-900">
                    {locationDetails.hours}
                  </p>
                }
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${locationDetails.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-gray-900"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call the Team
              </a>
              <a
                href={locationDetails.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-900"
              >
                <Navigation2 className="mr-2 h-4 w-4" />
                Get Directions
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl shadow-black/5">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <iframe
                  title="Skillence offline center location"
                  src={locationDetails.mapEmbedUrl}
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute -left-6 -top-6 hidden h-16 w-16 rounded-2xl bg-blue-100/70 lg:block" />
            <div className="pointer-events-none absolute -right-6 -bottom-6 hidden h-24 w-24 rounded-3xl bg-amber-100/70 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  content: ReactNode;
};

function InfoRow({ icon, label, content }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {label}
        </p>
        {content}
      </div>
    </div>
  );
}

