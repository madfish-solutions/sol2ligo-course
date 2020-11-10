import React from "react";
import MonacoEditor from "react-monaco-editor";
import Markdown from "react-markdown";
import gfm from "remark-gfm";

import Layout from "./Layout";
import { sections } from "../resources/sections";

interface CoursePageProps {
  selectedSection: number;
}

const CoursePage: React.FC<CoursePageProps> = ({ selectedSection }) => {
  const section = sections[selectedSection];
  return (
    <Layout selectedSection={selectedSection}>
      {/* <div className="flex flex-row max-w-full w-full h-full no-wrap"> */}
      <div className="flex flex-col w-full max-w-50 h-full">
        <article className="flex-1 w-full py-4 px-6 bg-white prose lg:prose-md max-w-full overflow-y-auto break-normal">
          <h1>
            {selectedSection + 1}. {section.title}
          </h1>
          <Markdown
            skipHtml
            source={section.description!}
            plugins={[[gfm, { singleTilde: false }]]}
          />
          {/* {section.description} */}
        </article>
        <div className="flex justify-center h-12 w-full bg-gray-100">
          <a href="#" className="h-full w-full truncate py-1 px-4 hover:bg-gray-200 text-center leading-10 font-medium text-indigo-600">Previous</a>
          <a href="#" className="h-full w-full truncate py-1 px-4 hover:bg-gray-200 text-center leading-10 font-medium text-indigo-600 border-l-2 border-gray-200">Next</a>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-50 h-full border-l-2 border-gray-100">
        <MonacoEditor
          language="sol"
          theme="vs-dark"
          value={section.solidity}
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
          }}
          onChange={(...args) => console.log(args)}
          editorDidMount={(...args) => console.log(args)}
        />
        <hr />
        <MonacoEditor
          language="pascaligo"
          theme="vs-dark"
          value={section.ligo}
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
          }}
          onChange={(...args) => console.log(args)}
          editorDidMount={(...args) => console.log(args)}
        />
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default CoursePage;
