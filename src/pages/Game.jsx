import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../components/Header';
import '../Game.css';

class Game extends Component {
  state = {
    questions: [],
    isLoading: true,
    index: 0,
    questionChosed: '',
    timerAnswers: 30,
    shuffledArray: [],
    questionIndex: '',
    answers: [],
  };

  componentDidMount() {
    this.fetchApiQuestion();
  }

  fetchApiQuestion = async () => {
    this.setState({ index: 0 });
    const RESPONSE_ERROR_CODE = 3;
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();

    if (data.response_code === RESPONSE_ERROR_CODE) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    this.setState({
      questions: data.results,
    });
    this.startTimer();
    setTimeout(() => {
      this.question();
    }, 1);
  };

  startTimer = () => {
    const oneSec = 1000;
    const timer = setInterval(() => {
      const { timerAnswers } = this.state;
      if (timerAnswers > 0) {
        this.setState({ timerAnswers: timerAnswers - 1 });
      } else {
        clearInterval(timer);
        this.setState({ timerAnswers: null });
      }
    }, oneSec);
  };

  setQuestionChosed = (text) => {
    this.setState({
      questionChosed: text,
    });
  };

  ColorChange = (answers, text) => {
    const { questionChosed, timerAnswers } = this.state;
    if (!timerAnswers) {
      return 'incorrect';
    }
    if (!questionChosed) {
      return 'Questions';
    }
    if (text === answers) {
      return 'correct';
    }
    return 'incorrect';
  };

  question = () => {
    const { questions, index } = this.state;

    const NUM_FIVE = 5;
    if (index >= NUM_FIVE) {
      this.setState({ isLoading: true, index: 0 });
    }

    const questionIndex = questions[0];
    const answers = [{
      text: questionIndex.correct_answer,
      isCorrect: true,
    }, ...questionIndex.incorrect_answers.map((answer) => ({
      text: answer,
      isCorrect: false,
    })),
    ];
    console.log(questionIndex);
    const shuffledArray = _.shuffle(answers);
    this.setState({
      shuffledArray,
      questionIndex,
      isLoading: false,
      answers,
    });
  };

  render() {
    const { isLoading, timerAnswers, shuffledArray, questionIndex, answers } = this.state;

    let AnswerIndex = 0;

    if (isLoading) {
      return;
    }

    return (
      <div>
        <Header />
        <p>{timerAnswers}</p>
        {
          !isLoading ? (
            <>
              <p data-testid="question-category">{questionIndex.category}</p>
              <p data-testid="question-text">{questionIndex.question}</p>
            </>
          ) : (<p>...Loading</p>)
        }
        <div data-testid="answer-options">
          {
            shuffledArray.map(({ text, isCorrect }) => {
              if (!isCorrect) {
                AnswerIndex += 1;
              }
              return (
                <button
                  className={
                    this.ColorChange(answers[0].text, text)
                  }
                  onClick={ () => this.setQuestionChosed(text) }
                  key={ text }
                  type="button"
                  disabled={ !timerAnswers }
                  data-testid={
                    isCorrect ? 'correct-answer' : `wrong-answer-${AnswerIndex}`
                  }
                >
                  {text}
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Game;
