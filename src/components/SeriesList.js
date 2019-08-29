import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SeriesList.scss'
import SerieCard from './SerieCard';
import SerieInfo from './SerieInfo';

class SeriesList extends Component {
  state = {
    expandedDiv: '',
  }

  handleCardClick = (e) => {
    this.setState({
      expandedDiv: e,
    })
  }
  // console.log({ data });
  // const tempArray = Object.values(data);
  // const resArr;
  // for (let index = 0; index < tempArray.length; index += 2) {
  //   if
  //   const element = tempArray[index];
  //   const element2 = tempArray[index + 1];
  //   const template = (
  //     <div className="row">
  //       <SerieCard key={i} frontmatter={frontmatter} />
  //       {element2 && <SerieCard key={i} frontmatter={frontmatter} />}
  //     </div>
  //   )
  //   resArr.push(template)
  // }

  render() {
    const { expandedDiv } = this.state;
    const { data } = this.props;
    let previous = null;
    return (
      <div className="Series">
        <div className="SeriesListCategories">
          Categories
        </div>
        <div className="SeriesContainer">
          {
            Object.values(data).map(({ node: { frontmatter } }, i) => {
              if ((expandedDiv === frontmatter.title && (i % 2) === 1) || previous) {
                return (
                  <React.Fragment>
                    <SerieCard
                      key={i}
                      frontmatter={frontmatter}
                      handleClick={this.handleCardClick}
                    />
                    <SerieInfo frontmatter={previous || frontmatter} />
                  </React.Fragment>
                )
              }
              if (expandedDiv === frontmatter.title && (i % 2) === 0) {
                previous = frontmatter;
              }
              return (
                <SerieCard handleClick={this.handleCardClick} key={i} frontmatter={frontmatter} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

SeriesList.propTypes = {
  data: PropTypes.any,
}

export default SeriesList
