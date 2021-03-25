import React, {
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  cloneElement,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";
import { BOT_WRITER } from "./constants";

import { Response, ReactBotFormProps, Responses, Writer } from "./types";

import typingIndicator from "../giphy.gif";

const useStyles = makeStyles((theme) => ({
  child: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    width: "90%",
    margin: "20px auto",
  },
  lanes: {
    display: "flex",
    "&>div:last-child": {
      marginLeft: "auto",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  bot: {
    fontSize: "35px",
  },
  typing: {
    display: "block",
    height: "50px",
    position: "relative",
    left: "10px",
    top: "-5px",
  },
  submit: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "row-reverse",
  },
}));

/*
const makeRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, i) => start + i);


   classes :

   {
     0: ['italic', 'bold'],
     1: ['italic', 'bold'],
     2: [],

   }


   formatting :
   [
     {
        type: 'i',
        start: 0,
        end: 2,
     },
     {
        type: 'i',
        start: 0,
        end: 2,
     },
     {
        type: 'b',
        start: 3,
        end: 5,
     },
   ]


const italic = (next) => (config, classes) => {
  if (config) {
  }
};
*/

type SetReponses = Dispatch<SetStateAction<Responses>>;

const setIsValidFactory = (setReponses: SetReponses) => (index: number) => (
  isValid: boolean
) => {
  setReponses((prevResponses) => ({
    ...prevResponses,
    [index]: { ...prevResponses[index], isValid },
  }));
};

const setResponseFactory = (setReponses: SetReponses) => (index: number) => (
  inputedValue: Response["inputedValue"],
  isValid: boolean = true
) => {
  setReponses((prevResponses) => ({
    ...prevResponses,
    [index]: { inputedValue, isValid },
  }));
};

// none of the inputs are undefined, means the discussion is over
const isDiscussionOver = (
  responses: Responses,
  children: ReactBotFormProps["children"]
) =>
  Object.values(responses).filter(
    (response) => response.inputedValue !== undefined
  ).length === children.length;

const hasError = (
  responses: Responses,
  children: ReactBotFormProps["children"],
  currentWriter: Writer
) =>
  Object.values(responses).filter((response) => response.isValid !== false)
    .length === children.length && currentWriter !== BOT_WRITER;

const ReactBotForm: FunctionComponent<ReactBotFormProps> = ({
  submitHandler,
  children,
}) => {
  const classes = useStyles({});

  const [responseInEdition, setResponseInEdition] = useState<null | number>(
    null
  );
  const [responses, setResponses] = useState<Responses>({});
  const [currentWriter, setCurrentWriter] = useState<Writer>(BOT_WRITER);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const contextInChildren = children.map((child, index) => (
    <ReactBotFormChildContext.Provider
      key={index}
      value={{
        index,
        inputedValue: responses?.[index]?.inputedValue,
        isValid: responses?.[index]?.isValid,
        setResponse: setResponseFactory(setResponses)(index),
        setIsValid: setIsValidFactory(setResponses)(index),
      }}
    >
      {cloneElement(child, {
        className: classes.child,
      })}
    </ReactBotFormChildContext.Provider>
  ));

  const next = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
    if (!isDiscussionOver(responses, children)) {
      setCurrentWriter(BOT_WRITER);
    } else {
      setCurrentWriter(null);
    }
  };

  console.log("responses", responses);

  return (
    <div className={classes.content}>
      <section className={classes.lanes}>
        <div>
          <img
            style={{
              visibility: currentWriter === BOT_WRITER ? "visible" : "hidden",
            }}
            className={classes.typing}
            src={typingIndicator}
            alt="Typing indicator"
          />
          <Avatar alt="bot" className={classes.bot}>
            <span>&#129302;</span>
          </Avatar>
        </div>
        <div>
          <img
            style={{
              visibility: responseInEdition !== null ? "visible" : "hidden",
            }}
            className={classes.typing}
            src={typingIndicator}
            alt="Typing indicator"
          />
          <Avatar alt="you" className={classes.orange}>
            You
          </Avatar>
        </div>
      </section>

      <ReactBotFormContext.Provider
        value={{
          responseInEdition,
          setResponseInEdition,
          currentWriter,
          setCurrentWriter,
        }}
      >
        {contextInChildren.slice(0, currentQuestionIndex + 1)}
      </ReactBotFormContext.Provider>

      {children.length - currentQuestionIndex !== 1 && (
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          endIcon="->"
          onClick={next}
        >
          Next question
        </Button>
      )}

      {hasError(responses, children, currentWriter) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          onClick={(e) =>
            submitHandler(
              Object.entries(responses).reduce(
                (acc, [key, value]) => ({ ...acc, [key]: value.inputedValue }),
                {}
              )
            )
          }
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default ReactBotForm;
