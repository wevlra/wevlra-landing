import { getShowcaseData } from "@/lib/content/showcase-data"

const REVALIDATE = 21600

async function fetchHtml(repo: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/wevlra/${repo}/main/index.html`,
      { next: { revalidate: REVALIDATE } }
    )
    if (!res.ok) return null
    return res.text()
  } catch {
    return null
  }
}

function transformHtmlPaths(html: string, repo: string): string {
  const base = `https://raw.githubusercontent.com/wevlra/${repo}/main`
  return html.replace(
    /((?:src|href)\s*=\s*["'])(?:\.\/)?(assets|images)\//gi,
    `$1${base}/$2/`
  )
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const categories = await getShowcaseData()
  let repo: string | undefined
  for (const cat of categories) {
    for (const item of cat.items) {
      if (item.slug === slug) {
        repo = item.repo
        break
      }
    }
    if (repo) break
  }
  if (!repo) {
    return new Response("Not Found", { status: 404 })
  }

  const html = await fetchHtml(repo)
  if (!html) {
    return new Response("Not Found", { status: 404 })
  }

  return new Response(transformHtmlPaths(html, repo), {
    headers: { "content-type": "text/html; charset=utf-8" },
  })
}
