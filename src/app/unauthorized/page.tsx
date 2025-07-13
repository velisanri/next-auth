export default function Unauthorized() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h1 className="text-5xl font-bold text-yellow-700 mb-4">403</h1>
      <p className="text-xl text-yellow-800 mb-6">
        Bu sayfaya erişim yetkiniz yok.
      </p>
      <a
        href="/dashboard"
        className="text-yellow-600 underline hover:text-yellow-800"
      >
        Ana Sayfaya Dön
      </a>
    </main>
  );
}
