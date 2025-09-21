export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="mt-2 text-sm text-[color:var(--foreground)]/80">Connect with Everyone Deserves Better Foundation.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border p-4">
          <div className="font-medium">Email</div>
          <div className="text-sm text-[color:var(--foreground)]/80">info@edbfoundation.org</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="font-medium">Social</div>
          <div className="text-sm text-[color:var(--foreground)]/80 space-x-4">
            <a className="text-blue-700 hover:underline" href="#">Twitter</a>
            <a className="text-blue-700 hover:underline" href="#">Facebook</a>
            <a className="text-blue-700 hover:underline" href="#">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}

