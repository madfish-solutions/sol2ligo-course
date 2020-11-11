import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { Link } from "woozie";

import Layout from "./Layout";
import { sections } from "../resources/sections";
import clsx from "clsx";

interface CoursePageProps {
  selectedSection: number;
}

enum TranspilationStatus {
  transpiling = "Transpiling...",
  success = "Successfully transpiled Solidity to Ligo",
  error = "Error occured during transpilation",
}

const CoursePage: React.FC<CoursePageProps> = ({ selectedSection }) => {
  const section = sections[selectedSection];
  const [solidityCode, setSolidityCode] = useState(section.solidity);
  const [ligoCode, setLigoCode] = useState(section.ligo);
  const [transpilationStatus, setTranspilationStatus] = useState<
    TranspilationStatus
  >(TranspilationStatus.success);

  useEffect(() => {
    setSolidityCode(section.solidity);
    setLigoCode(section.ligo);
    setTranspilationStatus(TranspilationStatus.success);
  }, [section]);

  return (
    <Layout selectedSection={selectedSection}>
      {/* <div className="flex flex-row max-w-full w-full h-full no-wrap"> */}
      <div className="flex flex-col w-1/2 h-full">
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
          <Link
            to={`/section/${selectedSection ? selectedSection - 1 : 0}`}
            className="h-full w-full truncate py-1 px-4 hover:bg-gray-200 text-center leading-10 font-medium text-indigo-600"
          >
            Previous
          </Link>
          <Link
            to={`/section/${
              selectedSection < sections.length - 1
                ? selectedSection + 1
                : selectedSection
            }`}
            className="h-full w-full truncate py-1 px-4 hover:bg-gray-200 text-center leading-10 font-medium text-indigo-600 border-l-2 border-gray-200"
          >
            Next
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-full border-l-2 border-gray-100">
        <MonacoEditor
          language="sol"
          theme="vs-dark"
          value={solidityCode}
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
          }}
          onChange={async (code) => {
            setSolidityCode(code);
            setTranspilationStatus(TranspilationStatus.transpiling);
            if (window && (window as any).compile) {
              try {
                const result = await (window as any).compile(code);
                setLigoCode(result.result);
                setTranspilationStatus(TranspilationStatus.success);
              } catch (e) {
                setTranspilationStatus(TranspilationStatus.error);
              }
            }
          }}
          editorDidMount={(_, editor) => console.log(editor)}
        />
        <div
          className={clsx(
            "h-10 w-full px-6 font-bold text-white text-center text-sm",
            {
              "bg-green-500":
                transpilationStatus === TranspilationStatus.success,
              "bg-indigo-500":
                transpilationStatus === TranspilationStatus.transpiling,
              "bg-red-500": transpilationStatus === TranspilationStatus.error,
            }
          )}
        >
          ↓ {transpilationStatus}
        </div>
        <MonacoEditor
          language="pascaligo"
          theme="vs-dark"
          value={ligoCode}
          options={{
            ariaLabel: "Solidity",
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
