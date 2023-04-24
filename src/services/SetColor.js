export const setColor = (timerAnswers, questionChosed, answers, text) => {
  if (!timerAnswers) {
    return 'Questions incorrect';
  }
  if (!questionChosed) {
    return 'Questions';
  }
  if (text === answers) {
    return 'Questions correct';
  }
  return 'Questions incorrect';
};
