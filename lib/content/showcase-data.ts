export type ShowcaseItem = {
  name: string
  description: string
  image: string
  slug: string
  repo: string
}

export type ShowcaseCategory = {
  id: string
  label: string
  items: ShowcaseItem[]
}

type RawData = {
  title: string
  description: string
  category: string
  image: string
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const CATEGORY_MAP: Record<string, string> = {
  corporate: "korporat",
  umkm: "umkm",
  personal: "personal",
}

const CATEGORY_LABELS: Record<string, string> = {
  umkm: "UMKM",
  personal: "Personal",
  korporat: "Korporat",
}

const REVALIDATE = 21600

async function fetchRepos(): Promise<string[]> {
  const token = process.env.GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const res = await fetch(
      "https://api.github.com/orgs/wevlra/repos?per_page=100&sort=updated",
      { headers, next: { revalidate: REVALIDATE } }
    )
    if (!res.ok) {
      return []
    }
    const repos = await res.json() as Array<{ name: string; fork: boolean; private: boolean }>
    return repos
      .filter(r => !r.fork && !r.private)
      .map(r => r.name)
  } catch {
    return []
  }
}

async function fetchAllRepos(): Promise<ShowcaseCategory[]> {
  const repoNames = await fetchRepos()
  if (repoNames.length === 0) return []

  const responses = await Promise.allSettled(
    repoNames.map(async (repo) => {
      const res = await fetch(
        `https://raw.githubusercontent.com/wevlra/${repo}/main/data.json`,
        { next: { revalidate: REVALIDATE } }
      )
      if (!res.ok) return null
      const raw: RawData = await res.json()
      return {
        name: raw.title,
        description: raw.description,
        image: `https://raw.githubusercontent.com/wevlra/${repo}/main/preview.webp`,
        slug: toSlug(raw.title),
        repo,
        _category: CATEGORY_MAP[raw.category] ?? "personal",
      }
    })
  )

  const items: (ShowcaseItem & { _category: string })[] = []
  for (const r of responses) {
    if (r.status === "fulfilled" && r.value) {
      items.push(r.value)
    }
  }

  const map = new Map<string, ShowcaseItem[]>()
  for (const item of items) {
    const cat = item._category
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat)!.push({
      name: item.name,
      description: item.description,
      image: item.image,
      slug: item.slug,
      repo: item.repo,
    })
  }

  return Array.from(map.entries()).map(([id, items]) => ({
    id,
    label: CATEGORY_LABELS[id] ?? id,
    items,
  }))
}

export async function getShowcaseData(): Promise<ShowcaseCategory[]> {
  return fetchAllRepos()
}
