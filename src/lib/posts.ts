import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");

type Post = PostMetadata & {
  html: string;
};

type PostMetadata = {
  title: string;
  filename: string;
  description: string;
  date: string;
  tags: string[];
  readTime?: number;
};

async function parseMetadata(filepath: string): Promise<Post> {
  const [markdown = "", metadataText] = (
    await readFile(filepath, "utf8")
  ).split("!!!METADATA");

  const processedContent = await remark().use(html).process(markdown);
  const metadataLines =
    metadataText
      ?.trim()
      .split("\n")
      .filter((line) => line.length > 0) ?? [];

  return metadataLines.reduce<Post>(
    (metadata, line) => {
      const [key, value] = line.split(":");
      if (key && value) {
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        if (trimmedKey === "tags") {
          metadata.tags = trimmedValue
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        } else {
          (metadata as unknown as Record<string, string>)[trimmedKey] =
            trimmedValue;
        }
      }
      return metadata;
    },
    {
      filename: filepath.split("/").pop()!.replace(".md", ""),
      readTime: Math.ceil(markdown.split(" ").length / 200),
      title: "",
      description: "",
      date: "",
      tags: [],
      html: processedContent.toString(),
    },
  );
}

async function getMetadata(filename: string): Promise<Post | null> {
  try {
    return await parseMetadata(path.join(POSTS_DIRECTORY, filename));
  } catch (error) {
    console.error(`[posts] Error getting metadata for "${filename}":`, error);
    return null;
  }
}

async function getAllPostsMetadata(): Promise<Post[]> {
  return (
    await Promise.all(
      (await readdir(POSTS_DIRECTORY, { withFileTypes: true }))
        .filter((entry) => entry.isFile())
        .map(async (entry) => await getMetadata(entry.name)),
    )
  ).filter((post) => post !== null);
}

async function getPost(filename: string): Promise<Post | null> {
  console.log(`[posts] Getting post by filename "${filename}"`);
  const post = await getMetadata(filename + ".md");
  if (!post) return null;
  return post;
}

export { getAllPostsMetadata, getPost, type Post, type PostMetadata };
