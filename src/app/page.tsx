import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Healthcare Assistant</h1>
        </div>
      </header>
      <div className="flex-1 bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow h-[70vh] flex flex-col">
          <ChatInterface />
        </div>
        <div className="max-w-2xl mx-auto mt-4 text-center text-sm text-gray-500">
          <p>
            This healthcare assistant is for informational purposes only. Always consult with a qualified healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </main>
  );
}