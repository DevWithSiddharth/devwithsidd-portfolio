import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "@/data/projects";
import { runCommand } from "@/components/terminal/commands";
import { validateContact } from "@/components/contact/ContactForm";
import { isSafeUrl } from "@/lib/theme";
import { SITE_URL, seo } from "@/lib/seo";

describe("portfolio rules", () => {
  it("search and category filters combine", () => {
    expect(filterProjects(projects, "react", "Web").map((p) => p.slug)).toEqual([
      "developer-portfolio",
      "timereaper",
      "taskreaper",
    ]);
    expect(filterProjects(projects, "react", "Python")).toEqual([]);
  });
  it("terminal clears and rejects unknown commands", () => {
    expect(runCommand("clear")).toBe("clear");
    expect((runCommand("rm -rf /") as string[])[0]).toContain("command not found");
  });
  it("terminal offers useful portfolio commands and project search", () => {
    expect(runCommand("about")[0]).toContain("Siddharth Yadav");
    expect(runCommand("projects color catcher")[0]).toContain("Color Catcher");
    expect(runCommand("projects no-such-project")[0]).toContain("No projects matched");
    expect(runCommand("repo")[0]).toContain("github.com/DevWithSiddharth/devwithsidd-portfolio");
    expect((runCommand("resume") as string[])[0]).toContain("command not found");
  });
  it("projects use real screenshots when available and placeholder previews otherwise", () => {
    const timeReaper = projects.find((project) => project.slug === "timereaper");
    expect(timeReaper?.image).toBe("/projects/TimeReaper/Dashboard.png");
    expect(timeReaper?.screenshots).toContainEqual({
      src: "/projects/TimeReaper/Dashboard.png",
      alt: "TimeReaper dashboard",
    });
    expect(projects.filter((project) => project.slug !== "timereaper").every(
      (project) => project.image === "/projects/preview-placeholder.svg",
    )).toBe(true);
  });
  it("contact form requires a valid email", () => {
    expect(validateContact({ name: "Sid", email: "bad", subject: "Hello", message: "Long enough msg" }).email).toBeTruthy();
  });
  it("rejects javascript: urls", () => {
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
  });
  it("builds route-specific canonical SEO metadata", () => {
    const metadata = seo("Color Catcher", "A project description.", "/projects/color-catcher");
    expect(metadata.links).toEqual([{ rel: "canonical", href: `${SITE_URL}/projects/color-catcher` }]);
    expect(metadata.meta).toContainEqual({ property: "og:url", content: `${SITE_URL}/projects/color-catcher` });
  });
});
