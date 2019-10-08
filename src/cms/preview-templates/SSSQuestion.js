import React from 'react'

const QABox = data => (
  <div>
    {
        data.questions.map(items => (
          <div>{items.question}</div>
        ))
    }
  </div>
)

export default QABox;
