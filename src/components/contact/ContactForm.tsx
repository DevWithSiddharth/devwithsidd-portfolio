import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { validateContact, type ContactFields } from "@/lib/contact";

const empty: ContactFields = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [f, setF] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "unconfigured">(
    "idle",
  );
  const endpoint = profile.contactFormEndpoint;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateContact(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!endpoint) return setState("unconfigured");
    setState("sending");
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(f),
      });
      if (!r.ok) throw new Error();
      setState("sent");
      setF(empty);
    } catch {
      setState("error");
    }
  };

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`)}`;
  const field = (k: keyof ContactFields, label: string, type = "text") => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {k === "message" ? (
        <textarea
          id={k}
          rows={5}
          value={f[k]}
          onChange={(e) => setF({ ...f, [k]: e.target.value })}
          aria-invalid={!!errors[k]}
          aria-describedby={errors[k] ? `${k}-err` : undefined}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      ) : (
        <input
          id={k}
          type={type}
          value={f[k]}
          onChange={(e) => setF({ ...f, [k]: e.target.value })}
          aria-invalid={!!errors[k]}
          aria-describedby={errors[k] ? `${k}-err` : undefined}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      )}
      {errors[k] && (
        <p id={`${k}-err`} className="mt-1 text-sm text-destructive">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={submit}
      noValidate
      className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-card"
    >
      {!endpoint && (
        <p className="rounded-md border border-dashed border-warning/60 px-3 py-2 text-sm text-warning">
          Online form delivery isn't set up yet. After checking your message, you can send it
          through your email app.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Name")}
        {field("email", "Email", "email")}
      </div>
      {field("subject", "Subject")}
      {field("message", "Message")}
      <button
        disabled={state === "sending"}
        className="rounded-full bg-primary px-4 py-2.5 font-medium text-primary-foreground shadow-button transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
      <div role="status" aria-live="polite">
        {state === "sent" && (
          <p className="text-sm text-success">Thanks! Your message was delivered.</p>
        )}
        {state === "error" && (
          <p className="text-sm text-destructive">
            Couldn't send right now. Please email directly instead.
          </p>
        )}
        {state === "unconfigured" && (
          <p className="text-sm text-muted-foreground">
            Your message was <strong>not</strong> sent.{" "}
            <a href={mailto} className="text-primary underline">
              Open it in your email app
            </a>{" "}
            to send it.
          </p>
        )}
      </div>
    </form>
  );
}
