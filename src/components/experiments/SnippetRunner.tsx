import { useState } from "react";

// Predefined functions only. User input is passed as data, never executed.
const snippets = {
  fizzbuzz: {
    label: "FizzBuzz",
    hint: "A number between 1 and 50",
    source: `function fizzbuzz(n) {\n  return Array.from({ length: n }, (_, i) => {\n    const k = i + 1;\n    return k % 15 === 0 ? "FizzBuzz"\n      : k % 3 === 0 ? "Fizz"\n      : k % 5 === 0 ? "Buzz" : k;\n  });\n}`,
    run: (input: string) => {
      const n = Number(input);
      if (!Number.isInteger(n) || n < 1 || n > 50) throw new Error("Enter a whole number from 1 to 50.");
      return Array.from({ length: n }, (_, i) => { const k = i + 1; return k % 15 === 0 ? "FizzBuzz" : k % 3 === 0 ? "Fizz" : k % 5 === 0 ? "Buzz" : String(k); }).join(", ");
    },
  },
  palindrome: {
    label: "Palindrome",
    hint: "Any word or phrase",
    source: `function isPalindrome(s) {\n  const c = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  return c === [...c].reverse().join("");\n}`,
    run: (input: string) => {
      const c = input.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!c) throw new Error("Enter some letters or numbers.");
      return String(c === [...c].reverse().join(""));
    },
  },
  fibonacci: {
    label: "Fibonacci",
    hint: "How many terms (1–30)",
    source: `function fibonacci(n) {\n  const seq = [0, 1];\n  while (seq.length < n) seq.push(seq.at(-1) + seq.at(-2));\n  return seq.slice(0, n);\n}`,
    run: (input: string) => {
      const n = Number(input);
      if (!Number.isInteger(n) || n < 1 || n > 30) throw new Error("Enter a whole number from 1 to 30.");
      const s = [0, 1]; while (s.length < n) s.push(s[s.length - 1]! + s[s.length - 2]!);
      return s.slice(0, n).join(", ");
    },
  },
};
type Key = keyof typeof snippets;

export function SnippetRunner() {
  const [key, setKey] = useState<Key>("fizzbuzz");
  const [input, setInput] = useState("15");
  const [out, setOut] = useState<{ ok: boolean; text: string } | null>(null);
  const s = snippets[key];

  const run = () => {
    try { setOut({ ok: true, text: s.run(input) }); } catch (e) { setOut({ ok: false, text: (e as Error).message }); }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Snippet">
        {(Object.keys(snippets) as Key[]).map((k) => (
          <button key={k} role="radio" aria-checked={k === key} onClick={() => { setKey(k); setOut(null); setInput(""); }} className={`rounded-md border px-3 py-1.5 text-sm ${k === key ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>{snippets[k].label}</button>
        ))}
      </div>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-terminal p-4 font-mono text-xs text-terminal-foreground"><code>{s.source}</code></pre>
      <form onSubmit={(e) => { e.preventDefault(); run(); }} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="snip-input" className="sr-only">Input</label>
        <input id="snip-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={s.hint} maxLength={100} className="flex-1 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm" />
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Run</button>
      </form>
      {out && <p role="status" className={`mt-3 break-words rounded-md border px-3 py-2 font-mono text-sm ${out.ok ? "border-success/40 text-success" : "border-destructive/40 text-destructive"}`}>{out.ok ? "→ " : "✕ "}{out.text}</p>}
    </div>
  );
}
