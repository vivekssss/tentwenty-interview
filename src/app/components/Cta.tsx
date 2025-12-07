export function Cta() {
  return (
    <section className="section py-16 sm:py-24">
      <div className="rounded-[var(--radius-card)] bg-ocean px-8 py-12 text-shell shadow-[var(--shadow-soft)] sm:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mist">
              Let&apos;s Talk
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Ready to craft your next experience?
            </h2>
            <p className="max-w-xl text-mist">
              We design animated, tactile brand journeys across hospitality and
              farm-to-table stories.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="mailto:hello@tentwenty.com"
              className="rounded-full bg-shell px-5 py-3 text-sm font-semibold text-ink shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Contact Us
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-shell/50 px-5 py-3 text-sm font-semibold text-shell transition hover:-translate-y-0.5 hover:bg-shell/10"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
