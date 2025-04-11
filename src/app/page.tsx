import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 bg-gray-50 p-4 pt-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Healthcare Assistant</h1>
          <p className="text-gray-600 mb-4">
            Get quick answers to your health questions and general medical information.
          </p>
        </div>
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