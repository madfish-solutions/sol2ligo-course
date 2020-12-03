import React from "react";
import cslx from "clsx";

const Logo: React.FC<{ className?: string }> = (props) => {
  return (
    <span
      className={cslx(
        "self-start w-full p-4 text-xl font-semibold leading-6 text-gray-800",
        props.className
      )}
    >
      🗄 sol2ligo handbook
    </span>
  );
};

export default Logo;
