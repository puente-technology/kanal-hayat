import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SeriesList.scss'
import SerieCard from './SerieCard';
import SerieInfo from './SerieInfo';
import Categories from './Categories';

class SeriesList extends Component {
  state = {
    expandedDiv: '',
    selectedCategories: [],
  }

  handleCardClick = (e) => {
    this.setState({
      expandedDiv: e,
    })
  }

  handleCategoryClick = (newSelectedCats) => {
    const { selectedCategories } = this.state
    const tempArr = [];
    console.log({ newSelectedCats, selectedCategories });
    if (selectedCategories.length === 0) {
      tempArr.push(...newSelectedCats);
    } else {
      newSelectedCats.forEach((c) => {
        if (selectedCategories.includes(c)) {
          tempArr.pop(c);
        } else {
          tempArr.push(c);
        }
      })
    }
    this.setState({
      selectedCategories: [...selectedCategories, ...tempArr],
    });
  }

  render() {
    const { expandedDiv, selectedCategories } = this.state;
    let { data } = this.props;
    let previous = null;
    console.log({ yyy: data });
    data = Object.values(data).filter(x => x !== 'Seriler')
    if (selectedCategories.length > 0) {
      data = data.filter(d => selectedCategories.includes(d.node.frontmatter.category))
    }
    return (
      <div className="Series">
        <div className="SeriesListCategories">
          <Categories onClick={this.handleCategoryClick} />
        </div>
        <div className="SeriesListSortAndFilter">
          <button type="button" className="SortButton">İsim</button>
          <button type="button" className="SortButton">Tarih</button>
          <input className="Nav--Search filter" type="text" />
        </div>
        <div className="SeriesContainer">
          {
            data && Object.values(data).map(({ node: { frontmatter } }, i) => {
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
