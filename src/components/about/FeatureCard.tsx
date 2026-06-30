import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
    <div className="text-center max-w-xs mx-auto">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
        <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>

      <h3 className="font-semibold text-lg uppercase mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;