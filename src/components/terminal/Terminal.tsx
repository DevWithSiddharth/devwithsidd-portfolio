import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { commandHelp, runCommand } from "./commands";

type Line = { kind: "in" | "out"; text: string };
const welcome: Line[] = [
  { kind: "out", text: "siddharth-os v1.0 — a simulated terminal (not a real shell)." },
  { kind: "out", text: "Type 'help' to get started." },
];

export function Terminal({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<Line[]>(welcome);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (cmd: string) => {
    const res = runCommand(cmd);
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 50));
    if (res === "clear") {
      setLines([]);
      return;
    }

    const output = res.filter((text, index, items) => text.trim() && (index === 0 || text !== items[index - 1]));
    setLines((l) => [...l, { kind: "in", text: cmd }, ...output.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(value);
      setValue("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIdx + 1, history.length - 1);
      if (history[i] !== undefined) { setHIdx(i); setValue(history[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(i, -1));
      setValue(i >= 0 ? (history[i] ?? "") : "");
    }
  };

  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-terminal text-terminal-foreground shadow-card ${className}`}>
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="size-3 rounded-full bg-destructive/80" aria-hidden />
        <span className="size-3 rounded-full bg-warning/80" aria-hidden />
        <span className="size-3 rounded-full bg-success/80" aria-hidden />
        <span className="ml-2 font-mono text-xs opacity-60">guest@siddharth: ~</span>
      </div>
      <div ref={scrollRef} onClick={() => inputRef.current?.focus()} className="h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed" role="log" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {l.kind === "in" ? <><span className="text-cyan">❯ </span>{l.text}</> : <span className="opacity-80">{l.text}</span>}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-cyan">❯&nbsp;</span>
          <label htmlFor="term-input" className="sr-only">Terminal command</label>
          <input id="term-input" ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey} autoComplete="off" spellCheck={false} maxLength={80} className="flex-1 bg-transparent font-mono text-terminal-foreground outline-none" />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-border/60 p-3">
        {Object.keys(commandHelp).map((c) => (
          <button key={c} onClick={() => submit(c.split(" ")[0]!)} className="rounded border border-border/60 px-2 py-1 font-mono text-xs opacity-80 hover:border-cyan hover:text-cyan hover:opacity-100">{c}</button>
        ))}
      </div>
    </div>
  );
}
