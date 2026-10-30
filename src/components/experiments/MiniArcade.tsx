import { useEffect, useRef, useState, type FormEvent } from "react";
import { Brain, RotateCcw, Timer, WandSparkles } from "lucide-react";

const games = ["Memory match", "Reaction test", "Number guess"] as const;
type Game = (typeof games)[number];

type Card = { id: number; symbol: string };
const symbols = ["◆", "●", "▲", "✦"];

function shuffledDeck(): Card[] {
  const deck = [...symbols, ...symbols].map((symbol, id) => ({ id, symbol }));
  for (let index = deck.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex]!, deck[index]!];
  }
  return deck;
}

export function MemoryMatch() {
  const [deck, setDeck] = useState<Card[]>(() =>
    [...symbols, ...symbols].map((symbol, id) => ({ id, symbol })),
  );
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const mismatchTimeout = useRef<number | null>(null);

  useEffect(() => {
    setDeck(shuffledDeck());
  }, []);

  useEffect(
    () => () => {
      if (mismatchTimeout.current !== null) window.clearTimeout(mismatchTimeout.current);
    },
    [],
  );

  const chooseCard = (card: Card) => {
    if (locked || open.includes(card.id) || matched.includes(card.id)) return;
    const firstCardId = open[0];
    if (firstCardId === undefined) {
      setOpen([card.id]);
      return;
    }

    setMoves((count) => count + 1);
    setOpen([firstCardId, card.id]);
    const firstCard = deck.find(({ id }) => id === firstCardId);
    if (firstCard?.symbol === card.symbol) {
      setMatched((ids) => [...ids, firstCardId, card.id]);
      setOpen([]);
    } else {
      setLocked(true);
      mismatchTimeout.current = window.setTimeout(() => {
        setOpen([]);
        setLocked(false);
        mismatchTimeout.current = null;
      }, 900);
    }
  };

  const reset = () => {
    if (mismatchTimeout.current !== null) {
      window.clearTimeout(mismatchTimeout.current);
      mismatchTimeout.current = null;
    }
    setDeck(shuffledDeck());
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setLocked(false);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {matched.length === deck.length
            ? `All matched in ${moves} moves!`
            : locked
              ? `Those cards don't match — try another pair. · ${moves} moves`
              : `${matched.length / 2} / ${symbols.length} pairs · ${moves} moves`}
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary"
        >
          <RotateCcw className="size-4" /> New game
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Memory match cards">
        {deck.map((card) => {
          const revealed = open.includes(card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              type="button"
              aria-label={
                revealed ? `Card ${card.id + 1}: ${card.symbol}` : `Reveal card ${card.id + 1}`
              }
              aria-pressed={revealed}
              disabled={locked || revealed}
              onClick={() => chooseCard(card)}
              className={`grid aspect-square place-items-center rounded-xl border text-2xl transition-all duration-200 sm:text-3xl ${
                revealed
                  ? "border-primary/50 bg-primary/10 text-primary shadow-button"
                  : "border-border bg-secondary/70 text-muted-foreground hover:-translate-y-0.5 hover:border-primary hover:bg-accent"
              }`}
            >
              {revealed ? card.symbol : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type ReactionPhase = "idle" | "waiting" | "ready" | "result" | "early";

function ReactionTest() {
  const [phase, setPhase] = useState<ReactionPhase>("idle");
  const [result, setResult] = useState<number | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    if (phase !== "waiting") return;
    const timeout = window.setTimeout(
      () => {
        startedAt.current = performance.now();
        setPhase("ready");
      },
      1400 + Math.random() * 1800,
    );
    return () => window.clearTimeout(timeout);
  }, [phase]);

  const play = () => {
    if (phase === "waiting") {
      setPhase("early");
    } else if (phase === "ready") {
      setResult(Math.round(performance.now() - startedAt.current));
      setPhase("result");
    } else {
      setResult(null);
      setPhase("waiting");
    }
  };

  const label = {
    idle: "Start test",
    waiting: "Wait for green…",
    ready: "CLICK NOW!",
    result: `${result} ms — try again`,
    early: "Too soon — try again",
  }[phase];

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <p className="text-sm leading-6 text-muted-foreground" aria-live="polite">
        {phase === "idle" &&
          "Press start, wait for the panel to turn green, then click as quickly as you can."}
        {phase === "waiting" && "Stay ready… don’t click until it turns green."}
        {phase === "ready" && "Go! Click the green panel now."}
        {phase === "result" && `Your reaction time was ${result} milliseconds.`}
        {phase === "early" && "That was a false start. Wait for the green signal this time."}
      </p>
      <button
        type="button"
        onClick={play}
        className={`min-h-20 rounded-2xl border px-6 py-4 font-semibold transition-colors sm:min-w-52 ${
          phase === "ready"
            ? "border-emerald-300 bg-emerald-400 text-slate-950 shadow-[0_0_36px_-8px_rgba(52,211,153,0.8)]"
            : "border-border bg-secondary text-foreground hover:border-primary"
        }`}
      >
        {label}
      </button>
    </div>
  );
}

function NumberGuess() {
  const [target, setTarget] = useState(50);
  const [value, setValue] = useState("");
  const [guesses, setGuesses] = useState(0);
  const [message, setMessage] = useState("I picked a number from 1 to 100. Can you find it?");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  const submitGuess = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const guess = Number(value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      setMessage("Enter a whole number from 1 to 100.");
      return;
    }
    const nextCount = guesses + 1;
    setGuesses(nextCount);
    if (guess === target) {
      setMessage(`You got it in ${nextCount} ${nextCount === 1 ? "guess" : "guesses"}!`);
      setComplete(true);
    } else {
      setMessage(guess < target ? "Too low — go higher." : "Too high — go lower.");
    }
    setValue("");
  };

  const reset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setValue("");
    setGuesses(0);
    setMessage("I picked a number from 1 to 100. Can you find it?");
    setComplete(false);
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {message}
      </p>
      <form onSubmit={submitGuess} className="mt-4 flex flex-wrap gap-2">
        <label htmlFor="number-guess" className="sr-only">
          Guess a number from 1 to 100
        </label>
        <input
          id="number-guess"
          type="number"
          min="1"
          max="100"
          step="1"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          disabled={complete}
          className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm"
          placeholder="Your guess (1–100)"
        />
        <button
          type="submit"
          disabled={complete}
          className="rounded-xl bg-gradient-accent px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
        >
          Guess
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:border-primary"
        >
          <RotateCcw className="size-4" /> Restart
        </button>
      </form>
      <p className="mt-3 font-mono text-xs text-muted-foreground">Attempts: {guesses}</p>
    </div>
  );
}

export function MiniArcade() {
  const [game, setGame] = useState<Game>(games[0]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Choose an arcade game">
        {games.map((item, index) => {
          const Icon = [Brain, Timer, WandSparkles][index]!;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={game === item}
              onClick={() => setGame(item)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-colors ${
                game === item
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              <Icon className="size-4" /> {item}
            </button>
          );
        })}
      </div>
      {game === "Memory match" && <MemoryMatch />}
      {game === "Reaction test" && <ReactionTest />}
      {game === "Number guess" && <NumberGuess />}
    </div>
  );
}
