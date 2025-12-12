interface Props {
  data: {
    title: string;
    image: string;
    similarity: number;
  };
}

export const DataNode = ({ data }: Props) => {
  return (
    <div className="group relative bg-[#0B0C15] border border-white/10 rounded-xl overflow-hidden hover:border-neon/50 transition-all duration-300">
      {/* Constrained Image Container - Aspect Ratio 4/3 */}
      <div className="relative aspect-[4/3] w-full bg-white/5 p-4 flex items-center justify-center overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="max-h-full max-w-full object-contain mix-blend-normal opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />

        {/* Similarity Pill */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-neon">
          {(data.similarity * 100).toFixed(1)}%
        </div>
      </div>

      {/* Minimal Title Only */}
      <div className="p-3 border-t border-white/5 bg-[#08090F]">
        <h3 className="text-gray-400 text-xs font-mono truncate group-hover:text-white transition-colors">
          {data.title}
        </h3>
      </div>
    </div>
  );
};
