import { Header } from "./components/Header";
import { InputConsole } from "./components/InputConsole";
import { DataNode } from "./components/DataNode";

// High quality mock data
const MOCK_DATA = [
  {
    title: "Razer BlackWidow V3 Pro",
    similarity: 0.96,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "SteelSeries Rival 650",
    similarity: 0.82,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Sony WH-1000XM4",
    similarity: 0.78,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "RTX 4090 Founder's Edition",
    similarity: 0.65,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800",
  },
];

function App() {
  return (
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-32 pb-20 flex flex-col">
        {/* Title Area */}
        <section className="text-center mb-16 space-y-2">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            NEURAL<span className="text-neon">SEARCH</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
            Multimodal Siamese Network // Amazon Dataset
          </p>

          <InputConsole />
        </section>

        {/* Results Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xs font-mono text-gray-500">
              INFERENCE_OUTPUT
            </h2>
            <div className="h-px bg-white/10 flex-1 mx-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_DATA.map((item, i) => (
              <DataNode key={i} data={item} />
            ))}
          </div>
        </section>
      </main>
  );
}

export default App;
