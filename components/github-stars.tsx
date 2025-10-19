import { Loader, Star } from "lucide-react";

export async function GithubStars() {

  const stars = await fetch("http://localhost:3000/api/github-star", {
    cache: "force-cache",
next: {
      revalidate: 86400,
    },
  });
  let starsResult: number | null = null;
  if (stars.ok) {
    const data = await stars.json();
    starsResult = data.stars;
  }

  return (
    <div
      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border bg-muted text-muted-foreground hover:bg-muted/70 transition"
      title="GitHub Stars for devAaus/better-auth"
    >
      <Star className="w-4 h-4 text-yellow-500"/>
      {starsResult !== null ? (
        <span className="font-medium">{starsResult}</span>
      ) : (
        <Loader className="w-4 h-4 animate-spin"/>
      )}
    </div>
  );
}
