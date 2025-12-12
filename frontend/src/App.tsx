import { Header } from "./components/Header";
import { InputConsole } from "./components/InputConsole";
import { DataNode } from "./components/DataNode";
import { Layout } from "./components/Layout";

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
    <Layout>
      <Header />

      <main className="flex-1 w-full mx-auto max-w-6xl px-6 pt-32 pb-16 flex flex-col gap-12">
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono uppercase tracking-[0.3em] text-cyan-200">
            Amazon Product Siamese • Multimodal
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Quantum Recommendation Deck
            </h1>
            <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Fuse textual embeddings and visual signals inside a Siamese network to surface products that feel tailor-made. Input a description, upload an image, and let the model triangulate the closest matches.
            </p>
          </div>

          <InputConsole />
        </section>

        <section className="bg-void-800/70 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/10 pointer-events-none" />
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div>
              <p className="text-xs font-mono text-cyan-200/80 tracking-[0.3em]">INFERENCE OUTPUT</p>
              <h2 className="text-xl font-semibold text-white">Closest Product Vectors</h2>
            </div>
            <div className="h-px w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_DATA.map((item, i) => (
              <DataNode key={i} data={item} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default App;
