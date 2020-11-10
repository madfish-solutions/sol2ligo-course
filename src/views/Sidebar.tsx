import React from "react";
import clsx from "clsx";

import { sections } from "../resources/sections";

interface SidebarItemProps {
  link: string;
  title: string;
  numeration: string | number;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  link = "#",
  numeration = "1",
  title,
  isActive,
}) => (
  <a
    href={link}
    className={
      "group flex flex-row no-wrap w-full truncate max-w-xs py-1 px-4 hover:bg-gray-200"
    }
  >
    <div
      className={clsx(
        "text-lg text-gray-500 group-hover:text-indigo-400 leading-6 w-8 flex-shrink-0",
        {
          "text-indigo-400": isActive,
        }
      )}
    >
      {numeration}.
    </div>
    <div
      className={clsx(
        "text-sm text-gray-700 group-hover:text-indigo-600 font-medium leading-6 truncate",
        {
          "text-indigo-600 font-bold": isActive,
        }
      )}
    >
      {title}
    </div>
  </a>
);

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  selectedSection: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  isOpen,
  toggle,
  selectedSection,
}) => {
  return (
    <>
      <div
        className={clsx(
          "fixed z-20 inset-0 bg-yellow transition-opacity lg:hidden",
          isOpen ? "block" : "hidden"
        )}
      />
      <div
        className={clsx(
          "fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-100 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0",
          isOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        )}
      >
        <div className="flex items-center justify-center flex-col">
          <span className="text-gray-800 text-xl font-semibold self-start p-4 leading-6 border-b-4 border-gray-200 w-full">
            🗄 sol2ligo handbook
          </span>
          <div className="flex items-center flex-col py-4 max-w-full">
            <div className="text-lg text-gray-700 font-bold leading-6 flex-shrink-0 self-start my-2 pl-4">
              Contents
            </div>
            {sections.map((section, idx) => (
              <SidebarItem
                key={section.title}
                title={section.title}
                numeration={`${idx + 1}`}
                isActive={idx === selectedSection}
                link={`/section/${idx}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
