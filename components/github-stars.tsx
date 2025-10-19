import { Link } from "@/components/i18n/link";

import packageJson from "@/package.json"
import { Github, Loader, Star } from "lucide-react";
import { Suspense } from "react"


interface GitHubStarsProps {
  owner: string
  repo: string
}

export const GITHUB_REPO: GitHubStarsProps = {
  owner: packageJson.author.name || "andriilive",
  repo: packageJson.name || "andriilive",
}

async function fetchGitHubStars(owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    next: { revalidate: 86400 }, // Revalidate every 24 hours (86400 seconds)
  })

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub stars")
  }

  const data = await res.json()
  return data.stargazers_count as number
}

async function GitHubStarsContent({ owner, repo }: GitHubStarsProps) {
  const stars = await fetchGitHubStars(owner, repo)

  return (
    <span className='font-medium'>{stars.toLocaleString()}</span>
  )
}

export function GithubStars({
  owner = GITHUB_REPO.owner,
  repo = GITHUB_REPO.repo,
}: Partial<GitHubStarsProps>) {

  const repoSlug = `${owner}/${repo}`
  const repoUrl = `https://github.com/${repoSlug}`

  return (
    <div
      className='text-sm rounded-full border bg-muted text-muted-foreground hover:bg-muted/70 transition'
    >
      <Link title={`GitHub Stars for ${repoSlug}`} href={repoUrl} isTranslatible={false} rel={"me"} className='px-4 py-1.5 inline-flex items-center gap-1'>
        <Github className='size-3 mr-0.5'/>
        <strong className='pr-1'>{repoSlug}</strong>
        <i className='divider pl-1 h-4 border-l border-muted-foreground/50'/>
        <Suspense fallback={<Loader className='w-4 h-4 animate-spin'/>}>
          <GitHubStarsContent owner={owner} repo={repo}/>
        </Suspense>
        <Star className='size-3 text-yellow-500'/>
      </Link>
    </div>
  )
}
