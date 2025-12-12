import { Star, ShoppingCart } from "lucide-react";

interface ProductProps {
  title: string;
  price: number;
  image: string;
  similarity: number; // 0 to 1
  rating: number;
}

export const ProductCard = ({
  title,
  price,
  image,
  similarity,
  rating,
}: ProductProps) => {
  return (
    <div className="group bg-amazon-card border border-white/5 rounded-lg overflow-hidden hover:border-amazon-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
      {/* Image Area */}
      <div className="relative h-64 w-full bg-white p-4 overflow-hidden">
        <div className="absolute top-2 right-2 z-10 bg-amazon-nav/80 backdrop-blur text-amazon-accent text-xs font-bold px-2 py-1 rounded">
          {(similarity * 100).toFixed(1)}% Match
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-2">
        <h3 className="text-gray-100 font-medium line-clamp-2 min-h-[3rem] group-hover:text-amazon-accent transition-colors">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < rating
                  ? "fill-amazon-accent text-amazon-accent"
                  : "text-gray-600"
              }
            />
          ))}
          <span className="text-xs text-blue-400 ml-1">1,204</span>
        </div>

        {/* Price & Action */}
        <div className="pt-2 flex items-end justify-between">
          <div>
            <span className="text-xs text-gray-400 align-top">$</span>
            <span className="text-2xl font-bold text-white">
              {Math.floor(price)}
            </span>
            <span className="text-xs text-gray-400 align-top">
              .{price.toFixed(2).split(".")[1]}
            </span>
          </div>

          <button className="bg-amazon-accent hover:bg-amazon-accentHover text-amazon-nav p-2 rounded-md transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
