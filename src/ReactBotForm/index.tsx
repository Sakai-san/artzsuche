// @ts-nocheck
import React, {
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { ReactBotFormContext, ReactBotFormChildContext } from "./Context";

import { Input, ReactBotFormProps, Response, Responses } from "./types";

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
  contentVisible: {
    opacity: 1,
  },
  contentHidden: {
    opacity: 0,
    transition: "opacity 2s ease-out",
    "&:after": {
      opacity: 1,
      content: `Messi vielmals`,
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

const setResponseFactory = (setReponses: SetReponses) => (index: number) => (
  input: Input,
  isValid: boolean
) => {
  setReponses((prevResponses) => ({
    ...prevResponses,
    [index]: { input, isValid },
  }));
};

const submit = (responses: Responses, url: string) => (
  e: SyntheticEvent
): void => {
  e.preventDefault();
  console.log("click on submit", responses);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(
      Object.entries(responses).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value.input }),
        {}
      )
    ),
  })
    .then((response) => console.log("done", response))
    .catch((e) => console.error("something went wrong", e));
};

// none of the inputs are undefined, means the discussion is over
const isDiscussionOver = (
  responses: Responses,
  children: ReactBotFormProps["children"]
) =>
  Object.values(responses).filter((response) => response.input !== undefined)
    .length === children.length;

const ReactBotForm: FunctionComponent<ReactBotFormProps> = ({ children }) => {
  const classes = useStyles({});

  const [responseInEdition, setResponseInEdition] = useState<null | number>(
    null
  );
  const [responses, setResponses] = useState<Responses>({});
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [isSumitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const contextInChildren = children.map((child, index) => (
    <ReactBotFormChildContext.Provider
      key={index}
      value={{
        index,
        input: responses?.[index]?.input,
        setResponse: setResponseFactory(setResponses)(index),
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

  console.log("inputs", JSON.stringify(responses));

  return (
    <div
      className={`${classes.content} ${
        isSumitted ? classes.contentHidden : classes.contentVisible
      }`}
    >
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
              visibility:
                !isBotTyping && !isDiscussionOver(responses, children)
                  ? "visible"
                  : "hidden",
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
      {isDiscussionOver(responses, children) && !hasError(responses) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          onClick={
            //(e) => {setIsSubmitted(true);
            submit(responses, "/exmaple.com/artzsuche")
          }
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default ReactBotForm;
