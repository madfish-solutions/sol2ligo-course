const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const {
  override,
  addPostcssPlugins,
  addWebpackPlugin,
} = require("customize-cra");

module.exports = override(
  addPostcssPlugins([require("tailwindcss")]),
  addWebpackPlugin(
    new MonacoWebpackPlugin({
      features: [
        "accessibilityHelp",
        "anchorSelect",
        "bracketMatching",
        "caretOperations",
        "clipboard",
        "codeAction",
        "comment",
        "contextmenu",
        "coreCommands",
        "cursorUndo",
        "find",
        "folding",
        "fontZoom",
        "format",
        "gotoError",
        "gotoLine",
        "gotoSymbol",
        "hover",
        "iPadShowKeyboard",
        "inPlaceReplace",
        "indentation",
        "inspectTokens",
        "linesOperations",
        "links",
        "multicursor",
        "onTypeRename",
        "parameterHints",
        "referenceSearch",
        "rename",
        "snippets",
        "suggest",
        "transpose",
        "unusualLineTerminators",
        "wordHighlighter",
        "wordOperations",
        "wordPartOperations",
      ],
    })
  )
);
