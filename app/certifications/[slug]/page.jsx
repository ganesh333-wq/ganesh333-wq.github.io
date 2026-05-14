import { certifications } from "@/utils/data/certifications";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return certifications.map((certificate) => ({
    slug: certificate.slug,
  }));
}

export function generateMetadata({ params }) {
  const certificate = certifications.find((item) => item.slug === params.slug);

  return {
    title: certificate
      ? `${certificate.title} | Ganesh Pratap Barade`
      : "Certificate | Ganesh Pratap Barade",
  };
}

export default function CertificateViewer({ params }) {
  const certificate = certifications.find((item) => item.slug === params.slug);

  if (!certificate) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d1224] px-4 py-6 text-white sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 rounded-lg border border-[#1b2c68a0] bg-[#11152c] p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[#16f2b3]">Certificate</p>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {certificate.title}
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/#certifications"
              className="rounded-md border border-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-500"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="relative min-h-[78vh] overflow-hidden rounded-lg border border-[#1b2c68a0] bg-white">
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            sizes="(max-width: 768px) 100vw, 1152px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}
