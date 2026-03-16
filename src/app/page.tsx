 "use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleJoinSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const linkedin = String(formData.get("linkedin") || "").trim();

    try {
      setStatus("submitting");
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, linkedin }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: string; message?: string }
          | null;
        const message =
          payload?.message ||
          (payload?.error === "EMAIL_NOT_CONFIGURED"
            ? "Email sending isn’t configured yet. Please try again later."
            : "Request failed");
        throw new Error(message);
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:ring-2 focus:ring-[#FF6600]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#FF6600]/10">
              <span className="text-sm font-semibold text-[#FF6600]">AI</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">
              AI Build Club
            </span>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <Link className="hover:text-[#FF6600] hover:underline" href="#how">
              How it works
            </Link>
            <Link
              className="hover:text-[#FF6600] hover:underline"
              href="#framework"
            >
              Framework
            </Link>
            <Link
              className="hover:text-[#FF6600] hover:underline"
              href="#pricing"
            >
              Pricing
            </Link>
            <Link className="hover:text-[#FF6600] hover:underline" href="#faq">
              FAQ
            </Link>
          </nav>
          <Dialog>
            <div className="flex items-center gap-2">
              <DialogTrigger>
                <Button
                  size="lg"
                  className="h-10 rounded-lg bg-[#FF6600] px-4 text-sm font-medium text-white hover:bg-[#E65C00] hover:scale-[1.02]"
                >
                  Join the Next Cohort
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent>
              {status === "success" ? (
                <div className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>Thanks for your interest</DialogTitle>
                    <DialogDescription>
                      We&apos;ve received your application and will be in
                      touch with next steps over the coming days.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end">
                    <DialogClose>
                      <Button className="rounded-lg" variant="outline">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Join the next AI Build Club cohort</DialogTitle>
                    <DialogDescription>
                      Share a few details and we&apos;ll follow up with next
                      steps. This is for a small, motivated group of AI-native
                      builders who want real portfolio evidence, not just
                      buzzwords.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    className="mt-4 space-y-4"
                    onSubmit={handleJoinSubmit}
                  >
                    <div className="space-y-1">
                      <label
                        htmlFor="nav-name"
                        className="block text-sm font-medium text-foreground"
                      >
                        Name
                      </label>
                      <input
                        id="nav-name"
                        name="name"
                        type="text"
                        required
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="nav-email"
                        className="block text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <input
                        id="nav-email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="nav-linkedin"
                        className="block text-sm font-medium text-foreground"
                      >
                        LinkedIn
                      </label>
                      <input
                        id="nav-linkedin"
                        name="linkedin"
                        type="url"
                        required
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                        placeholder="https://www.linkedin.com/in/you"
                      />
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={status === "submitting"}
                        className="h-10 rounded-lg bg-[#FF6600] px-5 text-sm font-medium text-white hover:bg-[#E65C00] hover:scale-[1.02] disabled:opacity-60"
                      >
                        {status === "submitting"
                          ? "Submitting..."
                          : "Join the Next Cohort"}
                      </Button>
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-600">
                        Something went wrong. Please try again in a moment.
                      </p>
                    )}
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main id="main" className="min-h-screen bg-white text-black">
        <section id="hero" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FF6600]/10 via-transparent to-transparent" />
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:py-32">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <Badge className="mb-5 bg-[#FF6600] text-white">
                Free for Founding Members
              </Badge>
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Build AI Products. Ship Every Week. Land Better Roles.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Join a small community of AI-native builders prototyping
                features, evaluating with proven frameworks, and creating
                portfolio evidence that gets interviews. No fluff. Just reps.
              </p>

              <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Dialog>
                  <DialogTrigger>
                    <Button
                      size="lg"
                      className="h-14 w-full rounded-lg bg-[#FF6600] px-8 text-lg font-medium text-white transition hover:bg-[#E65C00] hover:scale-[1.02] sm:w-auto"
                    >
                      Join the Next Cohort
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    {status === "success" ? (
                      <div className="space-y-4">
                        <DialogHeader>
                          <DialogTitle>Thanks for your interest</DialogTitle>
                          <DialogDescription>
                            We&apos;ve received your application and will be
                            in touch with next steps over the coming days.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end">
                          <DialogClose>
                            <Button className="rounded-lg" variant="outline">
                              Close
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle>
                            Join the next AI Build Club cohort
                          </DialogTitle>
                          <DialogDescription>
                            Share a few details and we&apos;ll follow up with
                            next steps. This is for a small, motivated group
                            of AI-native builders who want real portfolio
                            evidence, not just buzzwords.
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          className="mt-4 space-y-4"
                          onSubmit={handleJoinSubmit}
                        >
                          <div className="space-y-1">
                            <label
                              htmlFor="hero-name"
                              className="block text-sm font-medium text-foreground"
                            >
                              Name
                            </label>
                            <input
                              id="hero-name"
                              name="name"
                              type="text"
                              required
                              className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                              placeholder="Your full name"
                            />
                          </div>

                          <div className="space-y-1">
                            <label
                              htmlFor="hero-email"
                              className="block text-sm font-medium text-foreground"
                            >
                              Email
                            </label>
                            <input
                              id="hero-email"
                              name="email"
                              type="email"
                              required
                              className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                              placeholder="you@example.com"
                            />
                          </div>

                          <div className="space-y-1">
                            <label
                              htmlFor="hero-linkedin"
                              className="block text-sm font-medium text-foreground"
                            >
                              LinkedIn
                            </label>
                            <input
                              id="hero-linkedin"
                              name="linkedin"
                              type="url"
                              required
                              className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                              placeholder="https://www.linkedin.com/in/you"
                            />
                          </div>

                          <div className="mt-6 flex justify-end">
                            <Button
                              type="submit"
                              size="lg"
                              disabled={status === "submitting"}
                              className="h-10 rounded-lg bg-[#FF6600] px-5 text-sm font-medium text-white hover:bg-[#E65C00] hover:scale-[1.02] disabled:opacity-60"
                            >
                              {status === "submitting"
                                ? "Submitting..."
                                : "Join the Next Cohort"}
                            </Button>
                          </div>
                          {status === "error" && (
                            <p className="text-sm text-red-600">
                              Something went wrong. Please try again in a
                              moment.
                            </p>
                          )}
                        </form>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
                <a
                  href="#how"
                  className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-border px-8 text-base font-medium transition hover:border-[#FF6600]/40 hover:bg-[#FF6600]/5 sm:w-auto"
                >
                  See how it works
                </a>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Next cohort starts:{" "}
                <span className="font-semibold text-black">
                  Tuesday, March 18, 2026
                </span>{" "}
                • Limited to{" "}
                <span className="font-semibold text-black">8-10 people</span>
              </p>
            </div>
          </div>
        </section>

        <section id="problem" className="bg-muted">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  You can use AI tools. So can everyone else.
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  <p>
                    You&rsquo;ve learned Claude Code, Cursor, v0. You&rsquo;re
                    experimenting on side projects. You know you&rsquo;re ahead
                    of most PMs.
                  </p>
                  <p>
                    But when you interview, you sound like everyone else
                    claiming &ldquo;AI-native PM.&rdquo; You have tools, not
                    proof.
                  </p>
                  <p>
                    Meanwhile, the competitive advantage you had three months
                    ago? It&rsquo;s eroding every week.
                  </p>
                </div>
                <p className="mt-6 text-base font-medium">
                  Sound familiar?
                </p>
              </div>

              <Card className="border-0 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">
                    What changes when you have proof
                  </CardTitle>
                  <CardDescription>
                    Hiring managers don&rsquo;t need more buzzwords, they need
                    evidence.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      You can demo real prototypes.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      You can explain what you killed, and why.
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      You can talk through edge cases and trade-offs like a
                      builder.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="solution">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                AI Build Club: Weekly prototyping sprints with real PMs
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A small community that builds together using Aakash Gupta&rsquo;s{" "}
                <span className="font-medium text-black">
                  Taste at Speed
                </span>{" "}
                framework. Each week: prototype 2-3 divergent solutions,
                evaluate using 5 Lenses, kill 80%, ship the survivor, document
                what you learned.
              </p>
              <p className="mt-3 text-base font-medium">
                You don&rsquo;t just talk about AI product work. You do the reps.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Real building, not discussion groups",
                  desc: "Every week you ship evaluated prototypes you can demo in interviews.",
                },
                {
                  title: "Proven framework",
                  desc: "Apply the 5 Lenses evaluation system: Problem-Solution Fit, Interaction Cost, Edge Cases, Technical Debt, Business Model Alignment.",
                },
                {
                  title: "Portfolio evidence",
                  desc: "Build a library of prototypes, kill decisions, and documented learnings that prove you’re AI-native.",
                },
              ].map((b) => (
                <Card
                  key={b.title}
                  className="border-0 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-[#FF6600]/10">
                      <span className="text-sm font-semibold text-[#FF6600]">
                        ✓
                      </span>
                    </div>
                    <CardTitle className="text-base">{b.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {b.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="framework" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                The framework: Taste at Speed
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Based on Aakash Gupta&rsquo;s research on what separates AI-native
                PMs from everyone else.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-4">
              {[
                {
                  badge: "Prototype-first workflow",
                  title: "Build divergent options before deciding",
                  desc: "Prototype 4-5 approaches fast. Most teams spend two weeks on spec approval. You’ll prototype, test, and kill features in an afternoon.",
                },
                {
                  badge: "5 Lenses evaluation",
                  title: "A simple system for good judgment",
                  desc: "Problem-Solution Fit, Interaction Cost, Edge Case Exposure, Technical Debt Signal, Business Model Alignment.",
                },
                {
                  badge: "Force divergence",
                  title: "Avoid anchoring to the first demo",
                  desc: "Specify axes of variation like proactive vs passive, automated vs manual, visible vs background.",
                },
                {
                  badge: "Kill discipline",
                  title: "80%+ kill rate",
                  desc: "Speed without judgment just means building the wrong thing faster.",
                },
              ].map((f) => (
                <Card key={f.badge} className="border-0 shadow-sm">
                  <CardHeader className="space-y-2">
                    <Badge className="w-fit bg-[#FF6600] text-white">
                      {f.badge}
                    </Badge>
                    <CardTitle className="text-xl leading-tight sm:text-2xl">
                      {f.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {f.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Get started in 3 steps. You build async. We evaluate together.
                You leave with evidence you can demo.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Join a weekly sprint",
                  desc: "Pick a feature to prototype (we suggest options or bring your own). Build 2-3 divergent approaches using your preferred tools.",
                },
                {
                  step: "2",
                  title: "Evaluate together",
                  desc: "Meet weekly to apply the 5 Lenses framework. Force divergence, make kill/ship decisions, and learn what makes prototypes succeed or fail.",
                },
                {
                  step: "3",
                  title: "Document & demo",
                  desc: "Every prototype becomes portfolio evidence. Write up what you learned, what you killed, what you shipped, and use it in interviews.",
                },
              ].map((s) => (
                <Card
                  key={s.step}
                  className="border-0 shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-[#FF6600]/10">
                      <span className="text-sm font-semibold text-[#FF6600]">
                        {s.step}
                      </span>
                    </div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="founders" className="bg-muted">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Founded by two builders who need this too
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We&rsquo;re both job searching. We&rsquo;re both building with AI
                daily. We started this because we needed it ourselves.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                {
                  name: "Fahad Quraishi",
                  location: "NYC",
                  bio: "PM with 7+ years at Code for America (AI Studio, federal/civic tech). Built job search automation system in Claude Code. Targeting Principal/Staff PM roles.",
                },
                {
                  name: "Simon Conway",
                  location: "Barcelona",
                  bio: "20+ years building products and transforming product operations across startups, scaleups, corporates and consulting (IFS, AND Digital, Capgemini). Currently deep in the Claude Code rabbit hole and aiming for a role focused on building fast with AI and shaping how teams build with it.",
                },
              ].map((p) => (
                <Card key={p.name} className="border-0 bg-white shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-[#FF6600]/10">
                      <span className="text-base font-semibold text-[#FF6600]">
                        {p.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <CardDescription>{p.location}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                What people are saying
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                You&rsquo;re not alone in feeling the bar has moved. The difference
                is showing real work.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  quote:
                    "Most PMs talk about AI tools. You're one of the few actually building with them every day.",
                  who: "Chief Product Officer",
                  context: "reviewing Fahad’s job search hub demo",
                },
                {
                  quote:
                    "The stakeholder intelligence system is exactly the kind of proof point that shows you're not just following trends.",
                  who: "PM leader",
                  context: "at an Anthropic-adjacent company",
                },
                {
                  quote:
                    "I've interviewed 20+ PMs claiming 'AI-native' experience. Maybe 2 had real examples like this.",
                  who: "Hiring manager",
                  context: "Series B AI startup",
                },
              ].map((t) => (
                <Card
                  key={t.quote}
                  className="border-l-4 border-[#FF6600] bg-muted/50"
                >
                  <CardContent className="pt-6">
                    <p className="text-base italic leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      — {t.who}, {t.context}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Pricing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We&rsquo;re launching with a small cohort to validate the format.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-3">
                    <CardTitle className="text-xl">Free for Founding Members</CardTitle>
                    <Badge className="bg-[#FF6600] text-white">
                      Limited to 8-10 people
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    No cost. Just commitment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      Build 2-3 prototypes each week
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      Attend weekly 45-min evaluation sessions
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      Document your learnings
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#FF6600]" />
                      Give feedback on what works and what doesn&rsquo;t
                    </li>
                  </ul>

                  <div className="pt-2">
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          size="lg"
                          className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#FF6600] px-6 font-medium text-white transition hover:bg-[#E65C00] hover:scale-[1.02] sm:w-auto"
                        >
                          Join the Next Cohort
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        {status === "success" ? (
                          <div className="space-y-4">
                            <DialogHeader>
                              <DialogTitle>Thanks for your interest</DialogTitle>
                              <DialogDescription>
                                We&apos;ve received your application and will
                                be in touch with next steps over the coming
                                days.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end">
                              <DialogClose>
                                <Button
                                  className="rounded-lg"
                                  variant="outline"
                                >
                                  Close
                                </Button>
                              </DialogClose>
                            </div>
                          </div>
                        ) : (
                          <>
                            <DialogHeader>
                              <DialogTitle>
                                Join the next AI Build Club cohort
                              </DialogTitle>
                              <DialogDescription>
                                Share a few details and we&apos;ll follow up
                                with next steps. This is for a small, motivated
                                group of AI-native builders who want real
                                portfolio evidence, not just buzzwords.
                              </DialogDescription>
                            </DialogHeader>
                            <form
                              className="mt-4 space-y-4"
                              onSubmit={handleJoinSubmit}
                            >
                              <div className="space-y-1">
                                <label
                                  htmlFor="pricing-name"
                                  className="block text-sm font-medium text-foreground"
                                >
                                  Name
                                </label>
                                <input
                                  id="pricing-name"
                                  name="name"
                                  type="text"
                                  required
                                  className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                                  placeholder="Your full name"
                                />
                              </div>

                              <div className="space-y-1">
                                <label
                                  htmlFor="pricing-email"
                                  className="block text-sm font-medium text-foreground"
                                >
                                  Email
                                </label>
                                <input
                                  id="pricing-email"
                                  name="email"
                                  type="email"
                                  required
                                  className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                                  placeholder="you@example.com"
                                />
                              </div>

                              <div className="space-y-1">
                                <label
                                  htmlFor="pricing-linkedin"
                                  className="block text-sm font-medium text-foreground"
                                >
                                  LinkedIn
                                </label>
                                <input
                                  id="pricing-linkedin"
                                  name="linkedin"
                                  type="url"
                                  required
                                  className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                                  placeholder="https://www.linkedin.com/in/you"
                                />
                              </div>

                              <div className="mt-6 flex justify-end">
                                <Button
                                  type="submit"
                                  size="lg"
                                  disabled={status === "submitting"}
                                  className="h-10 rounded-lg bg-[#FF6600] px-5 text-sm font-medium text-white hover:bg-[#E65C00] hover:scale-[1.02] disabled:opacity-60"
                                >
                                  {status === "submitting"
                                    ? "Submitting..."
                                    : "Join the Next Cohort"}
                                </Button>
                              </div>
                              {status === "error" && (
                                <p className="text-sm text-red-600">
                                  Something went wrong. Please try again in a
                                  moment.
                                </p>
                              )}
                            </form>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <p className="mt-3 text-xs text-muted-foreground">
                      If we validate the format, we may charge later. Founding
                      members stay free.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                FAQ
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Quick answers to the most common questions.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <Accordion defaultValue={["item-1"]}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>When do sessions happen?</AccordionTrigger>
                  <AccordionContent>
                    Weekly 45-min evaluation sessions on Tuesdays at 10am ET /
                    3pm GMT / 4pm CET. Building happens async on your own
                    schedule.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What tools do I need?</AccordionTrigger>
                  <AccordionContent>
                    Any AI coding tool you&rsquo;re comfortable with: Claude Code,
                    Cursor, v0, Replit, Lovable. We don&rsquo;t mandate specific
                    tools. The skill is evaluation, not coding.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Do I need to be job searching right now?
                  </AccordionTrigger>
                  <AccordionContent>
                    Ideally yes, or planning your next move within 3-6 months.
                    This is optimized for people who want interview material and
                    portfolio evidence.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Can I join if I&rsquo;m outside US/EU timezones?
                  </AccordionTrigger>
                  <AccordionContent>
                    The Tuesday 10am ET slot is challenging for Asia-Pacific. If
                    there&rsquo;s demand, we&rsquo;ll run a second cohort in a
                    different timezone.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Is this recorded?</AccordionTrigger>
                  <AccordionContent>
                    Yes, evaluation sessions are recorded. Building is async so
                    nothing to record there.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Will this become a product?</AccordionTrigger>
                  <AccordionContent>
                    Maybe. Right now it&rsquo;s two PMs running a peer community
                    because we need it ourselves. If it works, we might evolve
                    it.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section id="final-cta" className="bg-muted">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
            <Card className="border-0 bg-white shadow-sm ring-1 ring-[#FF6600]/20">
              <CardContent className="py-12 text-center sm:py-16">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to build real portfolio evidence?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Stop claiming you&rsquo;re AI-native. Start proving it.
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        size="lg"
                        className="h-14 w-full rounded-lg bg-[#FF6600] px-8 text-lg font-medium text-white transition hover:bg-[#E65C00] hover:scale-[1.02] sm:w-auto"
                      >
                        Join the Next Cohort
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {status === "success" ? (
                        <div className="space-y-4">
                          <DialogHeader>
                            <DialogTitle>Thanks for your interest</DialogTitle>
                            <DialogDescription>
                              We&apos;ve received your application and will be
                              in touch with next steps over the coming days.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end">
                            <DialogClose>
                              <Button
                                className="rounded-lg"
                                variant="outline"
                              >
                                Close
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      ) : (
                        <>
                          <DialogHeader>
                            <DialogTitle>
                              Join the next AI Build Club cohort
                            </DialogTitle>
                            <DialogDescription>
                              Share a few details and we&apos;ll follow up
                              with next steps. This is for a small, motivated
                              group of AI-native builders who want real
                              portfolio evidence, not just buzzwords.
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            className="mt-4 space-y-4"
                            onSubmit={handleJoinSubmit}
                          >
                            <div className="space-y-1">
                              <label
                                htmlFor="final-name"
                                className="block text-sm font-medium text-foreground"
                              >
                                Name
                              </label>
                              <input
                                id="final-name"
                                name="name"
                                type="text"
                                required
                                className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                                placeholder="Your full name"
                              />
                            </div>

                            <div className="space-y-1">
                              <label
                                htmlFor="final-email"
                                className="block text-sm font-medium text-foreground"
                              >
                                Email
                              </label>
                              <input
                                id="final-email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                                placeholder="you@example.com"
                              />
                            </div>

                            <div className="space-y-1">
                              <label
                                htmlFor="final-linkedin"
                                className="block text-sm font-medium text-foreground"
                              >
                                LinkedIn
                              </label>
                              <input
                                id="final-linkedin"
                                name="linkedin"
                                type="url"
                                required
                                className="block w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-[#FF6600] focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2"
                                placeholder="https://www.linkedin.com/in/you"
                              />
                            </div>

                            <div className="mt-6 flex justify-end">
                              <Button
                                type="submit"
                                size="lg"
                                disabled={status === "submitting"}
                                className="h-10 rounded-lg bg-[#FF6600] px-5 text-sm font-medium text-white hover:bg-[#E65C00] hover:scale-[1.02] disabled:opacity-60"
                              >
                                {status === "submitting"
                                  ? "Submitting..."
                                  : "Join the Next Cohort"}
                              </Button>
                            </div>
                            {status === "error" && (
                              <p className="text-sm text-red-600">
                                Something went wrong. Please try again in a
                                moment.
                              </p>
                            )}
                          </form>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  <a
                    href="#hero"
                    className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-border px-6 font-medium transition hover:border-[#FF6600]/40 hover:bg-[#FF6600]/5 sm:w-auto"
                  >
                    Back to top
                  </a>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                  Next cohort starts:{" "}
                  <span className="font-semibold text-black">
                    Tuesday, March 18, 2026
                  </span>
                  <br />
                  First project: Stakeholder Intelligence System evaluation
                  <br />
                  Commitment: 4 weeks, 3-5 hours/week
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="border-t bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted-foreground sm:px-6 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} AI Build Club</p>
            <p>
              Questions?{" "}
              <a
                className="underline underline-offset-4 hover:text-[#FF6600]"
                href="mailto:simon.conway@condaal.com"
              >
                simon.conway@condaal.com
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
