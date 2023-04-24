export const startTimer = () => {
  const oneSec = 1000;
  const timer = setInterval(() => {
    const { timerAnswers } = this.state;
    if (timerAnswers > 0) {
      this.setState({ timerAnswers: timerAnswers - 1 });
    } else {
      clearInterval(timer);
      this.setState({ timerAnswers: 0, buttonVisible: true });
    }
    this.setState({ timer });
  }, oneSec);
};

export const clearTimer = () => {
  clearInterval(timer);
};
