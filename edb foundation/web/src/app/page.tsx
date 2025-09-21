export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-[color:var(--background)]">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--foreground)]">Everyone Deserves Better</h1>
            <p className="mt-4 text-[color:var(--foreground)]/80">
              EDB Foundation advances opportunities for vulnerable communities through
              programs in education, health, and livelihoods.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="/donate" className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700">Donate</a>
              <a href="/programs" className="px-5 py-3 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">Explore Programs</a>
            </div>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-3xl font-bold text-blue-600">+10K</div>
                <div className="text-[color:var(--foreground)]/70">Lives impacted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-[color:var(--foreground)]/70">Community partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-[color:var(--foreground)]/70">Active programs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-[color:var(--foreground)]/70">Donation transparency</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
