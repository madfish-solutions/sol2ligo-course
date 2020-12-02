import React, { useState, useEffect } from "react";
import clsx from "clsx";
import MonacoEditor from "react-monaco-editor";
import CodePreloader from "./CodePreloader";
import useTranspiler from "../../hooks/useTranspiler";

interface EditorProps {
  ligo: string;
  solidity: string;
}

enum TranspilationStatus {
  transpiling = "Transpiling...",
  success = "Successfully transpiled Solidity to Ligo",
  error = "Error occured during transpilation",
}

const Preloader: React.FC = () => (
  <div className="h-full">
    <CodePreloader
      foregroundOpacity={0.1}
      backgroundOpacity={0.5}
      className={"px-16 py-12"}
      width={100}
      style={{ width: "100%" }}
    />
  </div>
);

const Editor: React.FC<EditorProps> = ({ ligo, solidity }) => {
  const [solidityCode, setSolidityCode] = useState(solidity);
  const [ligoCode, setLigoCode] = useState(ligo);
  const [transpilerLoaded, transpilerLoadingError] = useTranspiler();
  const [
    transpilationStatus,
    setTranspilationStatus,
  ] = useState<TranspilationStatus>(TranspilationStatus.success);

  useEffect(() => {
    setSolidityCode(solidity);
    setLigoCode(ligo);
    setTranspilationStatus(TranspilationStatus.success);
  }, [ligo, solidity]);

  return transpilerLoaded ? (
    <>
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
            "bg-green-500": transpilationStatus === TranspilationStatus.success,
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
    </>
  ) : (
    <>
      <Preloader />
      <div
        className={clsx(
          "h-10 w-full px-6 font-bold text-white text-center text-sm",
          transpilerLoadingError ? "bg-red-500" : "bg-indigo-500"
        )}
      >
        {transpilerLoadingError || (
          <>
            Loading <span style={{ color: "#ffd800" }}>sol2ligo</span>{" "}
            transpiler...
          </>
        )}
      </div>
      <Preloader />
    </>
  );
};

export default Editor;
