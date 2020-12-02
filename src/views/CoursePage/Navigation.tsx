import React from "react";
import { Link } from "woozie";

interface NavigationProps {
  current: number;
  total: number;
}

const Navigation: React.FC<NavigationProps> = ({ current, total }) => {
  return (
    <div className="flex justify-center w-full h-12 bg-gray-100">
      <Link
        to={`/section/${current ? current - 1 : 0}`}
        className="w-full h-full px-4 py-1 font-medium leading-10 text-center text-indigo-600 truncate hover:bg-gray-200"
      >
        Previous
      </Link>
      <Link
        to={`/section/${current < total - 1 ? current + 1 : current}`}
        className="w-full h-full px-4 py-1 font-medium leading-10 text-center text-indigo-600 truncate border-l-2 border-gray-200 hover:bg-gray-200"
      >
        Next
      </Link>
    </div>
  );
};

export default Navigation;
