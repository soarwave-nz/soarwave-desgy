import markdownToHtml from "@/utils/markdownToHtml";

describe("markdownToHtml", () => {
  it("converts a paragraph to an HTML <p> tag", async () => {
    const result = await markdownToHtml("Hello world");
    expect(result).toContain("<p>Hello world</p>");
  });

  it("converts an h1 heading", async () => {
    const result = await markdownToHtml("# Heading One");
    expect(result).toContain("<h1>Heading One</h1>");
  });

  it("converts an h2 heading", async () => {
    const result = await markdownToHtml("## Heading Two");
    expect(result).toContain("<h2>Heading Two</h2>");
  });

  it("converts bold text using **", async () => {
    const result = await markdownToHtml("**bold text**");
    expect(result).toContain("<strong>bold text</strong>");
  });

  it("converts italic text using *", async () => {
    const result = await markdownToHtml("*italic text*");
    expect(result).toContain("<em>italic text</em>");
  });

  it("converts a markdown link to an anchor tag", async () => {
    const result = await markdownToHtml("[click here](https://example.com)");
    expect(result).toContain('<a href="https://example.com">click here</a>');
  });

  it("converts an unordered list", async () => {
    const result = await markdownToHtml("- item one\n- item two");
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>item one</li>");
    expect(result).toContain("<li>item two</li>");
  });

  it("converts an ordered list", async () => {
    const result = await markdownToHtml("1. first\n2. second");
    expect(result).toContain("<ol>");
    expect(result).toContain("<li>first</li>");
    expect(result).toContain("<li>second</li>");
  });

  it("converts inline code", async () => {
    const result = await markdownToHtml("`const x = 1`");
    expect(result).toContain("<code>const x = 1</code>");
  });

  it("returns an empty string for empty input", async () => {
    const result = await markdownToHtml("");
    expect(result.trim()).toBe("");
  });

  it("returns a string", async () => {
    const result = await markdownToHtml("some content");
    expect(typeof result).toBe("string");
  });
});
