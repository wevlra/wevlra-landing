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

const REPOS = [
  { repo: "greenbuild-indonesia", category: "corporate" },
  { repo: "nexora-consulting", category: "corporate" },
  { repo: "logichain-indonesia", category: "corporate" },
  { repo: "freshfarm-market", category: "umkm" },
  { repo: "arunika-craft", category: "umkm" },
  { repo: "lumina", category: "personal" },
  { repo: "rasa-nusantara", category: "umkm" },
] as const

const REVALIDATE = 21600

async function fetchAllRepos(): Promise<ShowcaseCategory[]> {
  const responses = await Promise.allSettled(
    REPOS.map(async ({ repo, category }) => {
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
        _category: CATEGORY_MAP[raw.category] ?? CATEGORY_MAP[category],
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
