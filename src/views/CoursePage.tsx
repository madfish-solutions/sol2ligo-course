import React from "react";

import Layout from "./Layout";
import Article from "./CoursePage/Article";
import Navigation from "./CoursePage/Navigation";
import Editor from "./CoursePage/Editor";

import sections from "../content";

interface CoursePageProps {
  selectedSection: number;
}

const CoursePage: React.FC<CoursePageProps> = ({ selectedSection }) => {
  const section = sections[selectedSection];

  return (
    <Layout selectedSection={selectedSection}>
      <div className="flex flex-col w-1/2 h-full">
        <Article
          sectionIndex={selectedSection}
          title={section.title}
          description={section.description}
        />
        <Navigation current={selectedSection} total={sections.length} />
      </div>
      <div className="flex flex-col w-1/2 h-full bg-gray-900 border-l-2 code-pane">
        <Editor ligo={section.ligo!} solidity={section.solidity!} />
      </div>
    </Layout>
  );
};

export default CoursePage;
