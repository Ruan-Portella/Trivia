import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addScore } from '../redux/actions';
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
    timer: null,
    buttonVisible: false,
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
        this.setState({ timerAnswers: 0, buttonVisible: true });
      }
      this.setState({ timer });
    }, oneSec);
  };

  setQuestionChosed = (answers, text) => {
    const { timer, timerAnswers } = this.state;
    const { dispatch } = this.props;
    this.setState({
      questionChosed: text,
      buttonVisible: true,
      // timerAnswers: null,
    });
    const CORRECT_SCORE = 10;
    const hardNumber = 3;
    clearInterval(timer);
    const setScore = (() => {
      if (answers.difficulty === 'hard') {
        return hardNumber;
      } if (answers.difficulty === 'medium') {
        return 2;
      } if (answers.difficulty === 'easy') {
        return 1;
      }
    })();

    if (answers.correct_answer === text) {
      const score = CORRECT_SCORE + (timerAnswers * setScore);
      dispatch(addScore(score));
    }
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
    const { history } = this.props;

    const NUM_FIVE = 5;
    if (index >= NUM_FIVE) {
      history.push('/feedback');
    } else {
      const questionIndex = questions[index];
      const answers = [{
        text: questionIndex.correct_answer,
        isCorrect: true,
      }, ...questionIndex.incorrect_answers.map((answer) => ({
        text: answer,
        isCorrect: false,
      })),
      ];
      const shuffledArray = _.shuffle(answers);
      this.setState({
        shuffledArray,
        questionIndex,
        isLoading: false,
        answers,
        index: index + 1,
      });
    }
  };

  buttonNext = () => {
    this.setState({
      questionChosed: '',
      buttonVisible: false,
      timerAnswers: 30 });
    this.question();
    setTimeout(() => {
      this.startTimer();
    }, 1);
  };

  render() {
    const { isLoading, timerAnswers, shuffledArray,
      questionIndex, answers, buttonVisible } = this.state;

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
                  onClick={ () => this.setQuestionChosed(questionIndex, text) }
                  key={ text }
                  type="button"
                  disabled={ !timerAnswers || buttonVisible }
                  data-testid={
                    isCorrect ? 'correct-answer' : `wrong-answer-${AnswerIndex}`
                  }
                >
                  {text}
                </button>
              );
            })
          }
          {
            buttonVisible && (
              <button
                onClick={ () => this.buttonNext() }
                data-testid="btn-next"
              >
                Next

              </button>
            )
          }
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect()(Game);
