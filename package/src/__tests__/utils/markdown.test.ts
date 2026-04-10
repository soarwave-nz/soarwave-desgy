import { getPostSlugs, getPostBySlug, getAllPosts } from "@/utils/markdown";
import fs from "fs";
import matter from "gray-matter";

jest.mock("fs");
jest.mock("gray-matter");

const mockFs = jest.mocked(fs);
const mockMatter = jest.mocked(matter);

const MOCK_SLUGS = ["first-post.mdx", "second-post.mdx", "third-post.mdx"];

const MOCK_FILE_CONTENTS: Record<string, { data: Record<string, unknown>; content: string }> = {
  "first-post.mdx": {
    data: { title: "First Post", date: "2024-03-01", coverImage: "/images/first.jpg" },
    content: "This is the **first** post content.",
  },
  "second-post.mdx": {
    data: { title: "Second Post", date: "2024-01-15" },
    content: "Content with an image: ![alt](https://example.com/img.png)",
  },
  "third-post.mdx": {
    data: { title: "Third Post", date: "2024-06-20", coverImage: "/images/third.jpg" },
    content: "Third post body.",
  },
};

function setupMocks(slugs: string[] = MOCK_SLUGS) {
  mockFs.readdirSync = jest.fn().mockReturnValue(slugs) as typeof fs.readdirSync;
  mockFs.readFileSync = jest.fn().mockImplementation((filePath: unknown) => {
    const slug = MOCK_SLUGS.find((s) => (filePath as string).includes(s.replace(/\.mdx$/, "")));
    return slug ? "mocked-file-content" : "";
  }) as typeof fs.readFileSync;

  mockMatter.mockImplementation((source: unknown) => {
    // Determine which post this call is for by matching the call order
    const call = (mockMatter.mock.calls.length - 1) % MOCK_SLUGS.length;
    const slug = MOCK_SLUGS[call];
    const mock = MOCK_FILE_CONTENTS[slug];
    return {
      data: mock.data,
      content: mock.content,
      orig: source as Buffer,
      language: "",
      matter: "",
      stringify: () => "",
    } as ReturnType<typeof matter>;
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getPostSlugs", () => {
  it("returns an array of filenames from the blog directory", () => {
    mockFs.readdirSync = jest.fn().mockReturnValue(MOCK_SLUGS) as typeof fs.readdirSync;
    const slugs = getPostSlugs();
    expect(slugs).toEqual(MOCK_SLUGS);
  });

  it("returns an empty array when the directory is empty", () => {
    mockFs.readdirSync = jest.fn().mockReturnValue([]) as typeof fs.readdirSync;
    const slugs = getPostSlugs();
    expect(slugs).toEqual([]);
  });

  it("calls readdirSync exactly once", () => {
    mockFs.readdirSync = jest.fn().mockReturnValue(MOCK_SLUGS) as typeof fs.readdirSync;
    getPostSlugs();
    expect(mockFs.readdirSync).toHaveBeenCalledTimes(1);
  });
});

describe("getPostBySlug", () => {
  beforeEach(() => {
    mockFs.readFileSync = jest.fn().mockReturnValue("mocked-content") as typeof fs.readFileSync;
  });

  it("strips the .mdx extension from the slug", () => {
    mockMatter.mockReturnValue({
      data: { title: "Test" },
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("my-post.mdx", ["slug"]);
    expect(post.slug).toBe("my-post");
  });

  it("returns the slug field when requested", () => {
    mockMatter.mockReturnValue({
      data: {},
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("example-post", ["slug"]);
    expect(post.slug).toBe("example-post");
  });

  it("returns the content field with markdown image syntax converted to <img> tags", () => {
    mockMatter.mockReturnValue({
      data: {},
      content: "![my image](https://example.com/photo.jpg)",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("example-post", ["content"]);
    expect(post.content).toContain('<img src="https://example.com/photo.jpg" alt="" />');
    expect(post.content).not.toContain("![my image]");
  });

  it("returns the metadata field with coverImage from front matter", () => {
    mockMatter.mockReturnValue({
      data: { title: "My Post", coverImage: "/images/cover.jpg" },
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("my-post", ["metadata"]);
    expect(post.metadata).toEqual({ title: "My Post", coverImage: "/images/cover.jpg" });
  });

  it("sets coverImage to null in metadata when it is absent from front matter", () => {
    mockMatter.mockReturnValue({
      data: { title: "No Image Post" },
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("no-image-post", ["metadata"]);
    expect(post.metadata.coverImage).toBeNull();
  });

  it("returns top-level front matter fields when requested by name", () => {
    mockMatter.mockReturnValue({
      data: { title: "Direct Field", date: "2024-05-01" },
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("my-post", ["title", "date"]);
    expect(post.title).toBe("Direct Field");
    expect(post.date).toBe("2024-05-01");
  });

  it("returns only the requested fields and no others", () => {
    mockMatter.mockReturnValue({
      data: { title: "Title", date: "2024-01-01", author: "Someone" },
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("my-post", ["title"]);
    expect(post.title).toBe("Title");
    expect(post.date).toBeUndefined();
    expect(post.author).toBeUndefined();
  });

  it("returns an empty object when no fields are requested", () => {
    mockMatter.mockReturnValue({
      data: { title: "Title" },
      content: "body",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("my-post", []);
    expect(Object.keys(post)).toHaveLength(0);
  });

  it("leaves content unchanged when there are no markdown images", () => {
    mockMatter.mockReturnValue({
      data: {},
      content: "Just plain text with **bold** and no images.",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });
    const post = getPostBySlug("my-post", ["content"]);
    expect(post.content).toBe("Just plain text with **bold** and no images.");
  });
});

describe("getAllPosts", () => {
  it("returns posts sorted by date in descending order", () => {
    const slugs = ["first-post.mdx", "second-post.mdx", "third-post.mdx"];
    mockFs.readdirSync = jest.fn().mockReturnValue(slugs) as typeof fs.readdirSync;
    mockFs.readFileSync = jest.fn().mockReturnValue("mocked") as typeof fs.readFileSync;

    const dates = ["2024-03-01", "2024-01-15", "2024-06-20"];
    let callCount = 0;
    mockMatter.mockImplementation(() => {
      const date = dates[callCount % dates.length];
      callCount++;
      return {
        data: { date },
        content: "body",
        orig: Buffer.from(""),
        language: "",
        matter: "",
        stringify: () => "",
      };
    });

    const posts = getAllPosts(["slug", "date"]);
    const returnedDates = posts.map((p) => p.date);
    expect(returnedDates).toEqual(["2024-06-20", "2024-03-01", "2024-01-15"]);
  });

  it("returns an empty array when there are no posts", () => {
    mockFs.readdirSync = jest.fn().mockReturnValue([]) as typeof fs.readdirSync;
    const posts = getAllPosts(["slug"]);
    expect(posts).toEqual([]);
  });

  it("returns the same number of posts as there are slugs", () => {
    const slugs = ["a.mdx", "b.mdx"];
    mockFs.readdirSync = jest.fn().mockReturnValue(slugs) as typeof fs.readdirSync;
    mockFs.readFileSync = jest.fn().mockReturnValue("mocked") as typeof fs.readFileSync;
    mockMatter.mockReturnValue({
      data: { date: "2024-01-01" },
      content: "",
      orig: Buffer.from(""),
      language: "",
      matter: "",
      stringify: () => "",
    });

    const posts = getAllPosts(["slug"]);
    expect(posts).toHaveLength(2);
  });
});
