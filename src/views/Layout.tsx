import React, { useState } from "react";
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
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-end items-center py-4 px-6 bg-white border-b-4 border-gray-200 bg-gray-100">
          <div className="flex text-md">
            <a
              href="/"
              className="font-medium text-gray-500 hover:text-gray-900 mx-5"
            >
              Get Started
            </a>
            <a
              href="/"
              className="font-medium text-gray-500 hover:text-gray-900 mx-5"
            >
              Github
            </a>
            <a
              href="/"
              className="font-medium text-indigo-600 hover:text-gray-900 mx-5"
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
