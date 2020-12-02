import React, { useState } from "react";
import { Link } from "woozie";
import Sidebar from "./Sidebar";

interface LayoutProps {
  selectedSection: number;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedSection }) => {
  const [sidebarState, alterSidebarState] = useState(false);

  return (
    <div className="flex h-screen bg-white-200">
      <Sidebar
        selectedSection={selectedSection}
        isOpen={sidebarState}
        toggle={() => alterSidebarState(!sidebarState)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-end px-6 py-4 bg-gray-100 border-b-4 border-gray-200">
          <div className="flex text-md">
            <Link
              to="/section/0"
              className="mx-5 font-medium text-gray-500 hover:text-gray-900"
            >
              Get Started
            </Link>
            <a
              href="https://github.com/madfish-solutions/sol2ligo"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-5 font-medium text-gray-500 hover:text-gray-900"
            >
              Github
            </a>
            <a
              href="https://madfish-solutions.github.io/sol2ligo/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-5 font-medium text-indigo-600 hover:text-gray-900"
            >
              Try sol2ligo
            </a>
          </div>
        </header>
        <main className="flex flex-1 overflow-hidden bg-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
