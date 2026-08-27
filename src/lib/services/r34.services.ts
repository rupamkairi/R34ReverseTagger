const API_URL = "https://api.rule34.xxx/index.php";

export async function scrape(url: string, apiKey: string, userId: string) {
  const postId = extractPostId(url);
  if (!postId) {
    throw new Error("Could not extract post ID from URL");
  }

  if (!apiKey || !userId) {
    throw new Error("Rule34 API credentials are not configured");
  }

  const params = new URLSearchParams({
    page: "dapi",
    s: "post",
    q: "index",
    id: postId,
    json: "1",
    fields: "tag_info",
    api_key: apiKey,
    user_id: userId,
  });

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; r34-tagger/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Rule34 API request failed: ${response.status}`);
  }

  const data = await response.json();

  if (typeof data === "string") {
    throw new Error(`Rule34 API error: ${data}`);
  }

  const post = Array.isArray(data) ? data[0] : null;
  if (!post?.tags) {
    throw new Error("No tags found for this post");
  }

  return post.tags.split(" ").join(", ");
}

function extractPostId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("id");
    if (id && /^\d+$/.test(id)) {
      return id;
    }
  } catch {
    // fall through to regex fallback
  }

  const match = url.match(/(?:id=)(\d+)/);
  return match ? match[1] : null;
}
