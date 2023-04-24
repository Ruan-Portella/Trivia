import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { AiFillCloseCircle, AiFillClockCircle } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import Header from '../components/Header';
import { addScore } from '../redux/actions';
import '../styles/Game.css';
import { fetchApi } from '../services/fetchApi';
import { setColor } from '../services/SetColor';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    questionChosed: '',
    timerAnswers: 30,
    shuffledArray: [],
    questionIndex: '',
    answers: [],
    timer: null,
    buttonVisible: false,
    amount: null,
  };

  componentDidMount() {
    this.fetchApiQuestion();
  }

  fetchApiQuestion = async () => {
    const { amount, category, difficulty, type } = this.props;
    const RESPONSE_ERROR_CODE = 3;
    this.setState({ index: 0 });
    const data = await fetchApi(amount, category, difficulty, type);

    if (data.response_code >= RESPONSE_ERROR_CODE) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    this.setState({
      questions: data.results,
      amount,
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
    return setColor(timerAnswers, questionChosed, answers, text);
  };

  question = () => {
    const { questions, index, amount } = this.state;
    const { history } = this.props;
    if (index >= amount) {
      history.push('/feedback');
    } else {
      const questionIndex = questions[index];
      const answers = [{
        text: questionIndex.correct_answer,
        isCorrect: true,
        letter: '',
        showAnswer: <BsCheckCircleFill size={ 40 } fill="green" />,
      }, ...questionIndex.incorrect_answers.map((answer) => ({
        text: answer,
        isCorrect: false,
        letter: '',
        showAnswer: <AiFillCloseCircle size={ 50 } fill="red" />,
      }))];
      const shuffledArray = _.shuffle(answers);
      const letter = shuffledArray.map((answer, indexLetter) => {
        if (answer.letter === '') {
          answer.letter = this.configureLetter(indexLetter);
        }
        return answer.letter;
      });
      console.log(letter);
      this.setState({ shuffledArray, questionIndex, answers, index: index + 1 });
    }
  };

  configureLetter = (index) => {
    const Index3 = 3;
    switch (index) {
    case 0:
      return 'D';
    case 1:
      return 'C';
    case 2:
      return 'B';
    case Index3:
      return 'A';
    default:
      break;
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
    const { timerAnswers, shuffledArray,
      questionIndex, answers, buttonVisible } = this.state;
    let AnswerIndex = 0;
    return (
      <div className="mainGame">
        <Header />
        <div className="Game-Content">
          <div className="Game-Question">
            <div className="Game-Category">
              <p data-testid="question-category">{questionIndex.category}</p>
            </div>
            <div className="Game-QuestionContent">
              <span
                className="question"
                data-testid="question-text"
              >
                {questionIndex.question}
              </span>
              <p className="questiontimer">
                <span className="TimeIcon">
                  <AiFillClockCircle fill="red" />
                </span>
                {`Tempo: ${timerAnswers}`}
              </p>
            </div>
          </div>
          <div data-testid="answer-options" className="Game-Answers">
            {
              shuffledArray.map(({ text, isCorrect, letter, showAnswer }) => {
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
                    {
                      buttonVisible ? (
                        <span
                          className="color"
                        >
                          { showAnswer }
                        </span>) : <span>{ letter }</span>
                    }
                    <span>{text}</span>
                  </button>
                );
              })
            }
          </div>
        </div>
        <div className="ButtonNext">
          {
            buttonVisible && (
              <button
                onClick={ () => this.buttonNext() }
                data-testid="btn-next"
                className="btn-next"
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

const mapStateToProps = (state) => ({
  amount: state.player.amount,
  category: state.player.category,
  difficulty: state.player.difficulty,
  type: state.player.type,
});

Game.propTypes = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
