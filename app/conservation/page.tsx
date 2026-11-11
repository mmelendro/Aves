import type { Metadata } from "next";
import Link from "next/link";
import { NavigationHeader } from "@/components/navigation-header";
import { Footer } from "@/components/footer";
import { PageIntroduction } from "@/components/page-introduction";
import { publicMetadata } from "@/lib/public-metadata";
import { canonicalUrl } from "@/lib/site-path";

export const metadata: Metadata = publicMetadata({
  title: "Conservation and responsible travel",
  description:
    "How AVES plans to document environmental and community impacts, review suppliers and support respectful nature travel. AVES is not B Corp certified.",
  alternates: { canonical: canonicalUrl("/conservation") },
});
const priorities = [
  {
    title: "Understand the impact",
    text: "Our proposed starting point is a documented baseline for the travel and operating impacts AVES can influence. Sources, methods, dates and missing information should stay visible.",
  },
  {
    title: "Plan practical reductions",
    text: "Consider travel distance, transport choices, pace and local conditions when reviewing a route. Any environmental comparison needs a stated method and a clear scope.",
  },
  {
    title: "Use resources carefully",
    text: "Plan for reusable supplies and equipment, reduce unnecessary purchases and record waste where AVES controls the service.",
  },
  {
    title: "Respect wildlife and access",
    text: "Give wildlife space, follow the site's visitor rules and protect sensitive locations. A park boundary, photograph or species checklist does not establish access or guarantee a sighting.",
  },
  {
    title: "Work with local hosts",
    text: "Before offering a service, agree responsibilities, rates, permissions and use of local knowledge. Community participation and cultural stories require consent and fair terms.",
  },
  {
    title: "Keep supplier evidence specific",
    text: "Distinguish a published environmental practice from independent certification. Company certification does not automatically describe every property, product or visit.",
  },
];
/** Plans and evidence requirements, never an unsupported impact result or funding promise. */
export default function ConservationPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/conservation" />
      <main id="main-content" tabIndex={-1}>
        <PageIntroduction
          title="Conservation and responsible travel"
          eyebrow="AVES Colombia"
          description="Nature travel needs clear evidence, respect for local hosts and care for wildlife. These are our proposed stewardship priorities as we develop AVES."
        />
        <section className="py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-medium text-emerald-950">
              What we plan to put into practice
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              We are using B Lab's Environmental Stewardship and Circularity
              guidance to shape our preparation. The priorities below describe
              work to develop and document, rather than completed impact
              results.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {priorities.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-emerald-100 p-6"
                >
                  <h3 className="text-xl font-medium text-emerald-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-gray-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-emerald-50 py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-medium text-emerald-950">
              Evidence before impact claims
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-gray-700">
              When we report a result, it should include the activity, period,
              method and supporting record. Conservation payments need a named
              recipient and evidence of payment. Travel emissions need a stated
              boundary and calculation method. Local benefit needs agreed terms,
              actual payments and feedback from the people involved.
            </p>
            <p className="mt-4 max-w-3xl leading-8 text-gray-700">
              We do not currently publish a verified AVES impact total or claim
              carbon neutral tours. No conservation trust contribution or
              donation percentage is promised on this page. Any future
              commitment will need a funded policy, clear terms and records that
              support it.
            </p>
          </div>
        </section>
        <section className="py-12 sm:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-medium text-emerald-950">
              B Corp preparation
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              AVES is not a certified B Corporation. Certification is a future
              ambition, subject to the applicable requirements and independent
              review. Using B Lab guidance does not establish certification.
            </p>
            <div className="mt-5 flex flex-wrap gap-5">
              <a
                className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                href="https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/"
                target="_blank"
                rel="noreferrer"
              >
                Read B Lab's stewardship guidance
              </a>
              <Link
                className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                href="/about/b-corp"
              >
                Review our preparation priorities
              </Link>
              <Link
                className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline"
                href="/contact"
              >
                Discuss your nature trip
              </Link>
            </div>
            <p className="mt-5 text-xs leading-6 text-gray-500">
              Editorial review 12 November 2026 Sydney. Public references,
              operator statements, certification and visitor access are separate
              kinds of evidence.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
