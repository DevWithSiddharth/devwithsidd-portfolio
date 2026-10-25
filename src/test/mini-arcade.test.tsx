import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryMatch } from "@/components/experiments/MiniArcade";

describe("Memory Match", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("keeps matching cards revealed and counts the pair", () => {
    render(<MemoryMatch />);

    fireEvent.click(screen.getByRole("button", { name: "Reveal card 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal card 5" }));

    expect(screen.getByRole("button", { name: /^Card 1:/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /^Card 5:/ })).toBeDisabled();
    expect(screen.getByText("1 / 4 pairs · 1 moves")).toBeInTheDocument();
  });

  it("flips a mismatched pair back and lets the next turn start", () => {
    render(<MemoryMatch />);

    fireEvent.click(screen.getByRole("button", { name: "Reveal card 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal card 2" }));

    expect(screen.getByText(/don't match/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Card 1:/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /^Card 2:/ })).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByRole("button", { name: "Reveal card 1" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Reveal card 2" })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: "Reveal card 3" }));
    expect(screen.getByRole("button", { name: /^Card 3:/ })).toBeInTheDocument();
  });

  it("clears an in-progress mismatch when starting a new game", () => {
    render(<MemoryMatch />);

    fireEvent.click(screen.getByRole("button", { name: "Reveal card 1" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal card 2" }));
    fireEvent.click(screen.getByRole("button", { name: "New game" }));

    act(() => {
      vi.advanceTimersByTime(900);
    });

    expect(screen.getByText("0 / 4 pairs · 0 moves")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Reveal card/ })).toHaveLength(8);
  });
});
