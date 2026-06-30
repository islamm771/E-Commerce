import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  title: string;
}

const StatCard = ({
  icon,
  value,
  title,
}: StatCardProps) => {
  return (
    <div className="group border border-gray-200 rounded-md p-8 text-center hover:bg-red-500 hover:text-white transition-all duration-300">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center text-2xl group-hover:bg-white group-hover:text-black">
        {icon}
      </div>

      <h3 className="text-3xl font-bold mb-2">
        {value}
      </h3>

      <p className="text-sm">
        {title}
      </p>
    </div>
  );
};

export default StatCard;