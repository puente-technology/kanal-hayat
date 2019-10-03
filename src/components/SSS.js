import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SSSQuestion from './SSSQuestion';
import SSSAnswer from './SSSAnswer';
import './SSS.scss'

class SSS extends Component {
    static propTypes = {
      frontmatter: PropTypes.any.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        answerID: 0,
        showAnswer: true,
      };
    }

    handleQuestionClick = (index) => {
      this.setState(() => ({ answerID: index }));
      const { showAnswer } = this.state;
      this.setState(() => ({ showAnswer: !showAnswer }));
    }

    render() {
      const { answerID, showAnswer } = this.state;
      const { frontmatter } = this.props;
      const { questions } = frontmatter;
      console.log('asma questions', questions);
      return (
        <div className="s-s-s">
          {
            questions.map((items, index) => (
              <div className="question-container">
                <SSSQuestion handleClick={this.handleQuestionClick} index={index} question={items.question} />
                {answerID === index && showAnswer
                  && (
                  <SSSAnswer answer={questions[index].answer} videos={questions[index].videos} />
                  )
                }
              </div>
            ))
          }
        </div>

      )
    }
}


export default SSS;
