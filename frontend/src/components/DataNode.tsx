interface Props {
  data: {
    title: string;
    image: string;
    similarity: number;
  };
}

export const DataNode = ({ data }: Props) => {
  return (
    <div className="group relative bg-void-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-300/60 transition-all duration-300 shadow-lg shadow-black/30">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/20" />

      <div className="relative aspect-[4/3] w-full bg-white/5 p-5 flex items-center justify-center overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="max-h-full max-w-full object-contain mix-blend-normal opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />

        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur border border-white/10 px-2 py-1 rounded text-[11px] font-mono text-cyan-200 shadow-lg shadow-black/40">
          {(data.similarity * 100).toFixed(1)}%
        </div>
      </div>

      <div className="relative p-4 border-t border-white/5 bg-void-800/70">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-slate-100 text-sm font-semibold truncate group-hover:text-white transition-colors">
            {data.title}
          </h3>
          <span className="text-[11px] font-mono text-cyan-200/80">Vector</span>
        </div>
      </div>
    </div>
  );
};
