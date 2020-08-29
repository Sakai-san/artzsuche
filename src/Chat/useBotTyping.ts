import { useEffect } from "react";

const useBotIsTyping = (
  isTyping: boolean,
  setIsBotTyping: (arg: boolean) => void,
  dependencyArray?: any[]
) => {
  useEffect(() => {
    if (isTyping) {
      setIsBotTyping(true);
    } else {
      setIsBotTyping(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencyArray]);
};
export default useBotIsTyping;
