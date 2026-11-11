/**
 * Blog-article introduction: title and metadata beside the shared bird carousel.
 * The article key selects a related bird list in ArticleBirdCarousel. Keep biography
 * and article body content in their separate components or route files.
 */
import type { ComponentProps, ReactNode } from "react"
import Link from "next/link"
import { Calendar, MapPin, User } from "lucide-react"
import { PageHeading } from "@/components/page-introduction"
import ArticleBirdCarousel from "@/components/article-bird-carousel"

type ArticleHeroProps = {
  article: ComponentProps<typeof ArticleBirdCarousel>["article"]
  title: string
  eyebrow: string
  location: string
  date: string
  readTime: string
  description?: string
  children?: ReactNode
}

export default function ArticleHero({ article, title, eyebrow, location, date, readTime, description, children }: ArticleHeroProps) {
  return <section aria-label="Article introduction" className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 sm:py-10 lg:py-12">
    <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <PageHeading title={title} description={description} eyebrow={eyebrow} />
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-gray-600">
          <Link href="/team#martin-melendro" className="inline-flex min-h-11 items-center gap-2 rounded hover:text-emerald-700"><User className="h-4 w-4" aria-hidden="true" />Martin Melendro</Link>
          <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden="true" />{date}</span>
          <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />{location}</span>
          <span className="inline-flex items-center">{readTime}</span>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
      <div className="mx-auto w-full min-w-0"><ArticleBirdCarousel article={article} /></div>
    </div>
  </section>
}
