// @ts-nocheck
import React, { FunctionComponent, useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { Theme, makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

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

interface ReactCasualFormProps {
  children: any;
}

interface Responses {
  [key: string]: {
    response?: string | null;
  };
}

const ReactCasualForm: FunctionComponent<ReactCasualFormProps> = ({
  children,
}) => {
  const classes = useStyles({});

  const [responses, setResponses] = useState<Responses>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [isSumitted, setIsSubmitted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const setResponse = (index: string) => (response: string | null) =>
    setResponses((prevResponses) => ({
      ...prevResponses,
      [index]: {
        response,
      },
    }));

  useEffect(() => {
    // bot is typing after switching to new question
    setIsBotTyping(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion]);

  const jsxQuestions = children({
    responses,
    setResponse,
    isEditing,
    setIsEditing,
    isBotTyping,
    setIsBotTyping,
    currentQuestion,
    setCurrentQuestion,
  });

  const isDiscussionOver =
    Object.values(responses).filter((item) => item.response).length ===
    React.Children.count(jsxQuestions);

  const currentQuestionIndex = Object.values(responses).reduce(
    (acc, response) => (response?.response ? acc + 1 : acc),
    0
  );

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
                !isBotTyping && !isDiscussionOver ? "visible" : "hidden",
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
      {jsxQuestions.slice(0, currentQuestionIndex + 1)}
      {isDiscussionOver && (
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
