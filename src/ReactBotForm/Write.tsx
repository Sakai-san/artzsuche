// @ts-nocheck
import React, { FunctionComponent, useContext } from "react";
import { Theme, makeStyles } from "@material-ui/core";
import useFocus from "./useFocus";
import { ReactBotFormChildContext, ReactBotFormContext } from "./Context";
import { WriteProps } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
  inputElementVisible: {
    visibility: "visible",
    opacity: 1,
    transition: "opacity 0.2s ease-in",
  },
  inputElementHidden: {
    visibility: "hidden",
    opacity: 0,
  },
}));

const Write: FunctionComponent<WriteProps> = ({ children, doValidation }) => {
  const { input, setResponse, index, setIsValid } = useContext(
    ReactBotFormChildContext
  );
  const { responseInEdition, setResponseInEdition, isBotTyping } = useContext(
    ReactBotFormContext
  );

  const classes = useStyles();
  const domRef = useFocus(responseInEdition, index);

  return (
    <div
      className={
        isBotTyping ? classes.inputElementHidden : classes.inputElementVisible
      }
    >
      {children?.({
        index,
        doValidation,
        input,
        setResponse,
        responseInEdition,
        setResponseInEdition,
        setIsValid,
        domRef,
      })}
    </div>
  );
};

export default Write;

/*
CloseIcon from \"@material-ui/icons/Close\"\nimport { makeStyles, createStyles } from \"@material-ui/core\"\n\nimport { monaco } from \"react-monaco-editor\"\n\nconst ANIMATION_DURATION = 3000\n\nconst useStyles = makeStyles((theme) =>\n\tcreateStyles({\n\t\t\"@keyframes lineshighlight\": {\n\t\t\tfrom: {\n\t\t\t\topacity: 1,\n\t\t\t},\n\t\t\tto: {\n\t\t\t\topacity: 0,\n\t\t\t},\n\t\t},\n\t\thighligh
tLines: {\n\t\t\tbackgroundColor: (props: definition.BaseProps) =>\n\t\t\t\tstyles.getColor({ intention: \"info\" }, theme, props.context) ||\n\t\t\t\t\"pink\",\n\t\t\tanimation: `$lineshighlight ${ANIMATION_DURATION}ms ease-in-out`,\n\t\t},\n\t})\n)\n\nconst CodeToolbar: FunctionComponent<definition.BaseProps> = (props) => {\n\tconst classes = useStyles(props)\n\tconst uesio = hooks.useUesio(props)\n\tconst yamlDoc = ue
sio.view.useYAML()\n\tconst currentYaml = yamlDoc?.toString() || \"\"\n\tconst lastModifiedNode = uesio.builder.useLastModifiedNode()\n\n\tconst currentAST = useRef<yaml.Document | undefined>(yamlDoc)\n\tcurrentA
ST.current = util.yaml.parse(currentYaml)\n\n\tconst editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(\n\t\tundefined\n\t)\n\tconst monacoRef = useRef<typeof monaco | undefined>(undefined)\n\tc
onst decorationsRef = useRef<string[] | undefined>(undefined)\n\n\tconst e = editorRef.current\n\tconst m = monacoRef.current\n\n\tuseEffect(() => {\n\t\tif (e && m && currentAST.current && lastModifiedNode) {\n\
t\t\tconst node = util.yaml.getNodeAtPath(\n\t\t\t\tlastModifiedNode,\n\t\t\t\tcurrentAST.current.contents\n\t\t\t)\n\t\t\tconst model = e.getModel()\n\t\t\tif (!node || !model) return\n\t\t\tconst range = node.r
ange\n\t\t\tif (!range || !range.length) return\n\n\t\t\tc


*/
