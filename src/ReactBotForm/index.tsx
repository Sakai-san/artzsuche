// @ts-nocheck
import React, {
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";

import { Input, ReactBotFormProps, Responses } from "./types";

import typingIndicator from "../giphy.gif";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: "90%",
    margin: "20px auto",
    "&>section:not(:first-child)": {
      padding: "5px",
      marginTop: "30px",
      borderRadius: "6px 6px",
    },
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

type SetReponses = Dispatch<SetStateAction<Responses>>;

const hasError = (responses: Responses) =>
  Object.values(responses).some((response) => !response.isValid);

const setIsValidFactory = (setReponses: SetReponses) => (index: number) => (
  isValid: boolean
) => {
  setReponses((prevResponses) => ({
    ...prevResponses,
    [index]: { ...prevResponses[index], isValid },
  }));
};

const setResponseFactory = (setReponses: SetReponses) => (index: number) => (
  input: Input,
  isValid: boolean = true
) => {
  setReponses((prevResponses) => ({
    ...prevResponses,
    [index]: { input, isValid },
  }));
};

// none of the inputs are undefined, means the discussion is over
const isDiscussionOver = (
  responses: Responses,
  children: ReactBotFormProps["children"]
) =>
  Object.values(responses).filter((response) => response.input !== undefined)
    .length === children.length;

const isDiscussionOver2 = (
  responses: Responses,
  children: ReactBotFormProps["children"],
  isBotTyping: boolean
) => {
  return (
    (Object.values(responses).filter((response) => response.input !== undefined)
      .length === children.length ||
      Object.values(responses).filter((response) => response.isValid).length ===
        children.length) &&
    !isBotTyping
  );
};

const ReactBotForm: FunctionComponent<ReactBotFormProps> = ({
  submitHandler,
  children,
}) => {
  const classes = useStyles({});

  const [responseInEdition, setResponseInEdition] = useState<null | number>(
    null
  );
  const [responses, setResponses] = useState<Responses>({});
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const contextInChildren = children.map((child, index) => (
    <ReactBotFormChildContext.Provider
      key={index}
      value={{
        index,
        input: responses?.[index]?.input,
        setResponse: setResponseFactory(setResponses)(index),
        setIsValid: setIsValidFactory(setResponses)(index),
      }}
    >
      {child}
    </ReactBotFormChildContext.Provider>
  ));

  const next = () => {
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
    if (!isDiscussionOver(responses, children)) {
      setIsBotTyping(true);
    } else {
      setIsBotTyping(false);
    }
  };

  console.log("responses", JSON.stringify(responses));

  return (
    <div className={classes.content}>
      <section className={classes.lanes}>
        <div>
          <img
            style={{ visibility: isBotTyping ? "visible" : "hidden" }}
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
          isBotTyping,
          setIsBotTyping,
          currentQuestionIndex,
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

      {isDiscussionOver2(responses, children, isBotTyping) &&
        !hasError(responses) && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}
            onClick={(e) =>
              submitHandler(
                Object.entries(responses).reduce(
                  (acc, [key, value]) => ({ ...acc, [key]: value.input }),
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
