import React, {
  FunctionComponent,
  useState,
  useEffect,
  ReactElement,
  Children,
} from "react";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

import { Response } from "./ReactCasualFormTypes";

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

const isUserEditing = (responses: Array<Response>) =>
  responses.some((response) => response === null);

const setResponse = (setResponses: Function) => (index: number) => (
  response: Response
) => {
  setResponses((prevResponses: Array<Response>) =>
    Object.assign([], prevResponses, {
      [index]: response,
    })
  );
};

// all responses are not null
const isDiscussionOver = (
  responses: Array<Response>,
  reactQuestions: Array<ReactElement>
) =>
  responses.filter((response) => response !== null).length ===
  Children.count(reactQuestions);

interface ReactCasualFormProps {
  children: (args: any) => Array<ReactElement>;
}

const ReactCasualForm: FunctionComponent<ReactCasualFormProps> = ({
  children,
}) => {
  const classes = useStyles({});

  const [responses, setResponses] = useState<Array<Response>>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [isSumitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const reactQuestions: Array<ReactElement> =
    children({ setIsBotTyping }) || [];

  const extendedReactQuestions: Array<ReactElement> = Children.map(
    reactQuestions,
    (child, index) =>
      React.cloneElement(child, {
        response: responses?.[index],
        setResponse: setResponse(setResponses)(index),
        isBotTyping,
      })
  );

  useEffect(() => {
    // current index is the last no not null related index in the array
    const index = responses.reduce(
      (acc, response) => (response ? acc + 1 : acc),
      0
    );

    setCurrentQuestionIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses]);

  useEffect(() => {
    // bot is typing after switching to new question
    if (
      !isDiscussionOver(responses, reactQuestions) &&
      !isUserEditing(responses)
    ) {
      setIsBotTyping(true);
    } else {
      setIsBotTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

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
                !isBotTyping && !isDiscussionOver(responses, reactQuestions)
                  ? "visible"
                  : "hidden",
            }}
            className={classes.typing}
            src={typingIndicator}
            alt="Typing indicator"
          />
          <Avatar alt="you" className={classes.orange}>
            Du
          </Avatar>
        </div>
      </section>
      {extendedReactQuestions.slice(0, currentQuestionIndex + 1)}
      {isDiscussionOver(responses, reactQuestions) && (
        <div className={classes.submit}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}
            onClick={(e) => setIsSubmitted(true)}
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReactCasualForm;
