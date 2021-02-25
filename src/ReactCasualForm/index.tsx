import React, {
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Suggestion from "./Suggestion";

import { Answer, IReactCasualFormProps, AnswerObject } from "./types";

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

const doTriggerNextQuestion = (
  currentIndex: number,
  setCurrentQuestionIndex: Function,
  setAnswers: Function
) => null;

const isUserEditing = (answers: Array<AnswerObject>) =>
  answers.some((answer) => answer.isEditing);

const setAnswer = (setAnswers: Function) => (index: number) => (
  content: Answer,
  isEditing: boolean = false
) => {
  setAnswers((prevAnswers: Array<AnswerObject>) =>
    Object.assign([], prevAnswers, {
      [index]: { content, isEditing },
    })
  );
};

// all answers are not null, means the discussion is over
const isDiscussionOver = (
  answers: Array<AnswerObject>,
  children: IReactCasualFormProps["children"]
) => answers.filter((answer) => answer.content !== undefined).length ===
  children.length;

const ReactCasualForm: FunctionComponent<IReactCasualFormProps> = ({
  children,
}) => {
  const classes = useStyles({});

  const [hasError, setHasError] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Array<AnswerObject>>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [isSumitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  console.log("answers", JSON.stringify(answers));

  const extendedReactQuestions: Array<ReactNode> = children.map(
    (child, index) =>
      child({
        setHasError,
        setAnswer: setAnswer(setAnswers)(index),
        answer: answers?.[index]?.content,
        isEditing: answers?.[index]?.isEditing,
        isBotTyping,
        setIsBotTyping,
      })
  );

  /*useEffect(() => {
    // current index is the last no not null related index in the array
    const index = answers.reduce(
      (acc, answer) => (answer.content ? acc + 1 : acc),
      0
    );

    setCurrentQuestionIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);*/

  /*
  useEffect(() => {
    // bot is typing after switching to new question
    if (!isDiscussionOver(answers, children) && !isUserEditing(answers)) {
      setIsBotTyping(true);
    } else {
      setIsBotTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);
*/
  const next = () => {
    setCurrentQuestionIndex( (currentIndex) => currentIndex + 1 );
    if( !isDiscussionOver(answers, children )
    // && !isUserEditing(answers)
    ){
      setIsBotTyping(true);
    }
    else{
      setIsBotTyping(false);
    }
  }

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
      {extendedReactQuestions.slice(0, currentQuestionIndex + 1)}
      {children.length - currentQuestionIndex !== 1 && <button onClick={next}>next -></button>}
      {isDiscussionOver(answers, children) && !hasError && (
        <Suggestion
          answer={undefined}
          setAnswer={() => null}
          isBotTyping={isBotTyping}
        >
          {({ domRef }) => (
            <Button
              ref={domRef}
              variant="contained"
              color="primary"
              size="large"
              endIcon={<SendIcon />}
              onClick={(e) => setIsSubmitted(true)}
            >
              Send
            </Button>
          )}
        </Suggestion>
      )}
    </div>
  );
};

export default ReactCasualForm;
