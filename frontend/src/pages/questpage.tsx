import { useEffect, useMemo, useState } from "react"

/* Types */
type QuestStatus = "active" | "expired" | "full"

interface Quest {
  id: number
  name: string
  description: string
  category: string
  enrolled: number
  reward: number
  deadline: string
  status: QuestStatus
  createdAt: string
}

/* Props */
interface Props {
  onSelectQuest: (id: number) => void
}

/* Mock Data */
const MOCK_QUESTS: Quest[] = [
  {
    id: 1,
    name: "Frontend Mastery",
    description: "Build modern UI",
    category: "frontend",
    enrolled: 120,
    reward: 500,
    deadline: "2026-04-10",
    status: "active",
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    name: "Frontend Mastery",
    description: "Build modern UI",
    category: "frontend",
    enrolled: 120,
    reward: 500,
    deadline: "2026-04-10",
    status: "expired",
    createdAt: "2026-03-01",
  },
  {
    id: 3,
    name: "Frontend Mastery",
    description: "Build modern UI",
    category: "frontend",
    enrolled: 120,
    reward: 500,
    deadline: "2026-04-10",
    status: "active",
    createdAt: "2026-03-01",
  },
  {
    id: 4,
    name: "Frontend Mastery",
    description: "Build modern UI",
    category: "frontend",
    enrolled: 120,
    reward: 500,
    deadline: "2026-04-10",
    status: "active",
    createdAt: "2026-03-01",
  },
]

/* Card */
function QuestCard({ quest, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="shimmer-on-hover cursor-pointer border-[3px] border-black shadow-[6px_6px_0_#000] transition"
    >
      <div className="bg-primary flex items-center justify-between border-b-[3px] border-black px-6 py-3">
        <span className="text-xs font-black tracking-wider uppercase">{quest.status}</span>
        <div className="flex items-center gap-1.5">
          {quest.status === "active" ? (
            <div className="bg-success h-2.5 w-2.5 border border-black" />
          ) : quest.status === "full" ? (
            <div className="bg-success h-2.5 w-2.5 border border-black" />
          ) : (
            quest.status === "expired" && (
              <div className="h-2.5 w-2.5 border border-black bg-red-500" />
            )
          )}
          {quest.status === "active" ? (
            <span className="text-xs font-bold">Live</span>
          ) : quest.status === "full" ? (
            <span className="text-xs font-bold">Live</span>
          ) : (
            quest.status === "expired" && <span className="text-xs font-bold">Ended</span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-1 text-xl font-black">{quest.name}</h3>
        <p className="text-muted-foreground mb-1 text-sm">
          {quest.enrolled} &middot; {quest.reward} USDC pool
        </p>
        <p className="mb-6 text-sm font-bold">{quest.category}</p>

        <div className="text-sm font-bold">
          {" "}
          <span>Deadline : </span>
          {new Date(quest.deadline).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

/* Page */
export function QuestsPage({ onSelectQuest }: Props) {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("")
  const [sort, setSort] = useState("newest")

  useEffect(() => {
    setTimeout(() => {
      setQuests(MOCK_QUESTS)
      setLoading(false)
    }, 1000)
  }, [])

  const filtered = useMemo(() => {
    let data = [...quests]

    if (search) {
      data = data.filter(
        q =>
          q.name.toLowerCase().includes(search.toLowerCase()) ||
          q.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) data = data.filter(q => q.category === category)
    if (status) data = data.filter(q => q.status === status)

    if (sort === "newest") {
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    if (sort === "popular") {
      data.sort((a, b) => b.enrolled - a.enrolled)
    }

    if (sort === "reward") {
      data.sort((a, b) => b.reward - a.reward)
    }

    return data
  }, [quests, search, category, status, sort])

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-black">Discover Quests</h1>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          placeholder="Search quests..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border-2 border-black px-3 py-2"
        />

        <select
          className="border-2 border-black px-3 py-2 focus:outline-0"
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="frontend">Frontend</option>
        </select>

        <select
          className="border-2 border-black px-3 py-2 focus:outline-0"
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="full">Full</option>
        </select>

        <select
          className="border-2 border-black px-3 py-2 focus:outline-0"
          onChange={e => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Enrolled</option>
          <option value="reward">Highest Reward</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse border-4 border-black bg-gray-200" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-20 text-center">
          <h2 className="text-xl font-black">No quests found</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(q => (
            <QuestCard key={q.id} quest={q} onClick={() => onSelectQuest(q.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
