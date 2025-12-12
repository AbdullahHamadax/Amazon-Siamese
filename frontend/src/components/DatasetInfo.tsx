import {
  Database,
  FolderOpen,
  Layers,
  FileImage,
  ExternalLink,
} from "lucide-react";

const InfoCard = ({ title, value, icon: Icon, sub }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg hover:border-cyan-500/30 transition-all group">
    <div className="flex justify-between items-start mb-3">
      <Icon
        size={18}
        className="text-slate-600 group-hover:text-cyan-400 transition-colors"
      />
      <span className="text-xl font-mono font-bold text-slate-200">
        {value}
      </span>
    </div>
    <div className="text-xs text-slate-500 uppercase tracking-wider">
      {title}
    </div>
    <div className="text-[10px] text-cyan-600 mt-1">{sub}</div>
  </div>
);

const DatasetInfo = () => {
  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <div className="mb-8 border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          <Database className="text-cyan-500" />
          FASHION_PRODUCT_DATASET
        </h2>

        {/* Updated Header with Link */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>Source:</span>
            <a
              href="https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-small"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-500 hover:text-cyan-300 transition-colors flex items-center gap-1 border-b border-cyan-500/30 hover:border-cyan-400 pb-0.5"
            >
              Kaggle (Param Aggarwal)
              <ExternalLink size={10} />
            </a>
          </div>
          <span className="hidden sm:block text-slate-700">|</span>
          <span>Type: Classification/Retrieval</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <InfoCard
          title="Total Images"
          value="44.4k"
          icon={FileImage}
          sub="JPG Format"
        />
        <InfoCard
          title="Categories"
          value="07"
          icon={Layers}
          sub="Master Labels"
        />
        <InfoCard
          title="Sub-Classes"
          value="45+"
          icon={FolderOpen}
          sub="Granular Labels"
        />
        <InfoCard
          title="Resolution"
          value="High"
          icon={Database}
          sub="Varied Dims"
        />
      </div>

      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
        <h3 className="text-cyan-400 font-mono text-sm mb-4 border-l-2 border-cyan-500 pl-3">
          DATA_DISTRIBUTION_MAP
        </h3>
        <div className="space-y-3">
          {[
            { l: "Apparel", v: 45 },
            { l: "Accessories", v: 25 },
            { l: "Footwear", v: 20 },
            { l: "Personal Care", v: 10 },
          ].map((item) => (
            <div
              key={item.l}
              className="flex items-center gap-4 text-xs font-mono"
            >
              <span className="w-24 text-slate-400">{item.l}</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.v}%` }}
                  className="h-full bg-cyan-900/80 border-r-2 border-cyan-400"
                ></div>
              </div>
              <span className="text-cyan-600">{item.v}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatasetInfo;
