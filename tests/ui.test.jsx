// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard" }));
vi.mock("next/link", () => ({ default: ({ href, children, ...rest }) => <a href={href} {...rest}>{children}</a> }));

const { default: SideNav } = await import("@/app/dashboard/_components/SideNav");

afterEach(cleanup);

describe("Button", () => {
  it("renders a real link, not a button inside a link, with asChild", () => {
    render(
      <Button asChild>
        <a href="/x">Go</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: "Go" }).getAttribute("href")).toBe("/x");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders a button by default", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeTruthy();
  });
});

describe("SideNav", () => {
  it("lists only routes that exist and marks the current page", () => {
    render(<SideNav />);
    const links = screen.getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual(["/dashboard", "/dashboard/create-new"]);
    expect(screen.getByRole("link", { name: "Dashboard" }).getAttribute("aria-current")).toBe("page");
  });
});
