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

import { Answer, ReactBotFormProps, AnswerObject } from "./types";

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

type SetAnswers = Dispatch<SetStateAction<Array<AnswerObject>>>;

const resetEditing = (setAnswers: SetAnswers) => {
  setAnswers((prevAnswers) =>
    prevAnswers.map((prevAnswer) => ({
      ...prevAnswer,
      isEditing: false,
    }))
  );
};

const hasError = (answers: Array<AnswerObject>) =>
  answers.some((answer) => !answer.isValid);

const isUserEditing = (answers: Array<AnswerObject>) =>
  answers.some((answer) => answer.isEditing);

const setAnswerFactory = (setAnswers: SetAnswers) => (index: number) => (
  content: Answer,
  isValid: boolean = true,
  isEditing: boolean = false
) => {
  setAnswers((prevAnswers) =>
    // update element in array without side-effect in array
    Object.assign([], prevAnswers, {
      [index]: { content, isValid, isEditing },
    })
  );
};

const submit = (answsers: Array<AnswerObject>, url: string) => (
  e: SyntheticEvent
): void => {
  e.preventDefault();
  fetch(url, {
    method: "POST",
    body: JSON.stringify(
      Object.values(answsers).reduce(
        (acc, answer, index) => ({ ...acc, [index]: answer.content }),
        {}
      )
    ),
  })
    .then((response) => console.log("done", response))
    .catch((e) => console.error("something went wrong", e));
};

// all answers are not undefined, means the discussion is over
const isDiscussionOver = (
  answers: Array<AnswerObject>,
  children: ReactBotFormProps["children"]
) =>
  answers.filter((answer) => answer.content !== undefined).length ===
  children.length;

const ReactBotForm: FunctionComponent<ReactBotFormProps> = ({ children }) => {
  const classes = useStyles({});

  const [answers, setAnswers] = useState<Array<AnswerObject>>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [isSumitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  console.log("answers", JSON.stringify(answers));

  const contextInChildren = children.map((child, index) => (
    <ReactBotFormChildContext.Provider
      key={index}
      value={{
        answer: answers?.[index]?.content,
        setAnswer: setAnswerFactory(setAnswers)(index),
        isEditing: answers?.[index]?.isEditing,
      }}
    >
      {child}
    </ReactBotFormChildContext.Provider>
  ));

  const next = () => {
    resetEditing(setAnswers);
    setCurrentQuestionIndex((currentIndex) => currentIndex + 1);
    if (!isDiscussionOver(answers, children)) {
      setIsBotTyping(true);
    } else {
      setIsBotTyping(false);
    }
  };

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
                !isBotTyping && !isDiscussionOver(answers, children)
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
          isBotTyping,
          setIsBotTyping,
        }}
      >
        {contextInChildren.slice(0, currentQuestionIndex + 1)}
      </ReactBotFormContext.Provider>
      {children.length - currentQuestionIndex !== 1 && (
        <button onClick={next}>{"next ->"}</button>
      )}
      {isDiscussionOver(answers, children) && !hasError(answers) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          onClick={
            //(e) => {setIsSubmitted(true);
            submit(answers, "/exmaple.com/artzsuche")
          }
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default ReactBotForm;