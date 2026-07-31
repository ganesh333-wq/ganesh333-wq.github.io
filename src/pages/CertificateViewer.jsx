import { useParams, Link } from "react-router-dom";
import { certifications } from "@/utils/data/certifications";
import { useDocumentTitle } from "@/utils/useDocumentTitle";

export default function CertificateViewer() {
  const { slug } = useParams();
  const certificate = certifications.find((item) => item.slug === slug);

  useDocumentTitle(certificate ? `${certificate.title} | Ganesh Pratap Barade` : "Certificate Not Found | Ganesh Pratap Barade");

  if (!certificate) {
    return (
      <main className="min-h-screen bg-[#0d1224] px-4 py-6 text-white sm:px-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Certificate Not Found</h1>
        <Link
          to="/#certifications"
          className="rounded-md border border-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-500"
        >
          Back to Portfolio
        </Link>
      </main>
    );
  }

  return (
    <>
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
                to="/#certifications"
                className="rounded-md border border-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-500"
              >
                Back
              </Link>
            </div>
          </div>

          <div className="relative min-h-[78vh] overflow-hidden rounded-lg border border-[#1b2c68a0] bg-white">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>
      </main>
    </>
  );
}
