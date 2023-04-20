import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    isLoading: true,
    index: 0,
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
      isLoading: false,
    });
  };

  render() {
    const { questions, isLoading, index } = this.state;
    const NUM_FIVE = 5;

    if (index >= NUM_FIVE) {
      this.setState({ isLoading: true, index: 0 });
    }

    const questionIndex = questions[index];
    let AnswerIndex = 0;

    if (isLoading) {
      return;
    }

    const answers = [{
      text: questionIndex.correct_answer,
      isCorrect: true,
    }, ...questionIndex.incorrect_answers.map((answer) => ({
      text: answer,
      isCorrect: false,
    })),
    ];
    const shuffledArray = _.shuffle(answers);

    return (
      <div>
        <Header />
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
                  onClick={ () => { this.setState({ index: index + 1 }); } }
                  key={ text }
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
