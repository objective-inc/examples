// app/page.tsx
import { ObjectiveClient } from "objective-sdk";

// Initialize the Objective SDK client outside of your component to avoid re-initialization on each render
const objective = new ObjectiveClient({
  apiKey: process.env.OBJECTIVE_API_KEY,
});

type EmojiPageProps = {
  searchParams: {
    q?: string
  }
}

export default async function Page({
  searchParams,
}: EmojiPageProps) {
  const results = await objective.indexes.index.search("idx_TJ6a2dVrJAmF", {
    query: searchParams.q || "",
    limit: 9,
    object_fields: "*",
  });

  console.log(results)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-24">
      <form action="/" method="get" className="w-full">
        <div className="flex flex-col sm:flex-row items-center border-b-2 border-teal-500 py-2">
          <input
            name="q"
            type="text"
            placeholder="Search..."
            className="appearance-none bg-transparent border-none w-full text-gray-700 mb-3 sm:mb-0 sm:mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button type="submit" className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded w-full sm:w-auto">
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {results.results.map((result, index) => (
          <img key={index} src={result.object.url} className="rounded-lg shadow-md" />
        ))}
      </div>
    </main>
  );
}
