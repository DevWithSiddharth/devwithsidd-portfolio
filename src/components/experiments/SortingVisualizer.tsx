import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

type Step = { arr: number[]; active: [number, number] };
const algos = {
  Bubble(a: number[]) {
    const s: Step[] = [];
    const x = [...a];
    for (let i = 0; i < x.length; i++)
      for (let j = 0; j < x.length - i - 1; j++) {
        if (x[j]! > x[j + 1]!) [x[j], x[j + 1]] = [x[j + 1]!, x[j]!];
        s.push({ arr: [...x], active: [j, j + 1] });
      }
    return s;
  },
  Insertion(a: number[]) {
    const s: Step[] = [];
    const x = [...a];
    for (let i = 1; i < x.length; i++)
      for (let j = i; j > 0 && x[j - 1]! > x[j]!; j--) {
        [x[j], x[j - 1]] = [x[j - 1]!, x[j]!];
        s.push({ arr: [...x], active: [j - 1, j] });
      }
    return s;
  },
  Selection(a: number[]) {
    const s: Step[] = [];
    const x = [...a];
    for (let i = 0; i < x.length; i++) {
      let m = i;
      for (let j = i + 1; j < x.length; j++) {
        if (x[j]! < x[m]!) m = j;
        s.push({ arr: [...x], active: [i, j] });
      }
      [x[i], x[m]] = [x[m]!, x[i]!];
    }
    return s;
  },
};
type Algo = keyof typeof algos;
const rand = () => Array.from({ length: 24 }, () => 8 + Math.floor(Math.random() * 92));

export function SortingVisualizer() {
  const [algo, setAlgo] = useState<Algo>("Bubble");
  const [arr, setArr] = useState<number[]>(() =>
    Array.from({ length: 24 }, (_, i) => ((i * 37) % 90) + 8),
  );
  const [active, setActive] = useState<[number, number]>([-1, -1]);
  const [running, setRunning] = useState(false);
  const steps = useRef<Step[]>([]);
  const idx = useRef(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const s = steps.current[idx.current++];
      if (!s) {
        setRunning(false);
        setActive([-1, -1]);
        return;
      }
      setArr(s.arr);
      setActive(s.active);
    }, 40);
    return () => clearInterval(t);
  }, [running]);

  const start = () => {
    if (idx.current === 0 || idx.current >= steps.current.length) {
      steps.current = algos[algo](arr);
      idx.current = 0;
    }
    setRunning((r) => !r);
  };
  const reset = () => {
    setRunning(false);
    steps.current = [];
    idx.current = 0;
    setActive([-1, -1]);
    setArr(rand());
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div
          role="radiogroup"
          aria-label="Algorithm"
          className="flex rounded-md border border-border p-0.5"
        >
          {(Object.keys(algos) as Algo[]).map((a) => (
            <button
              key={a}
              role="radio"
              aria-checked={algo === a}
              disabled={running}
              onClick={() => {
                setAlgo(a);
                steps.current = [];
                idx.current = 0;
              }}
              className={`rounded px-3 py-1.5 text-sm ${algo === a ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {a}
            </button>
          ))}
        </div>
        <button
          onClick={start}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:border-primary"
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? "Pause" : "Run"}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm hover:border-primary"
        >
          <RotateCcw className="size-4" />
          Shuffle
        </button>
      </div>
      <div
        className="mt-6 flex h-48 items-end gap-[3px] rounded-lg border border-border bg-terminal p-3"
        aria-label="Array bars"
        role="img"
      >
        {arr.map((v, i) => (
          <div
            key={i}
            style={{ height: `${v}%` }}
            className={`flex-1 rounded-t-sm transition-[height] duration-75 ${active.includes(i) ? "bg-cyan" : "bg-primary/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
