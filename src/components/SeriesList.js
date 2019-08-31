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
    // sortBy: 'title',
    listSeries: [],
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ listSeries: this.dataIntoArray(data) })
  }

  dataIntoArray = data => (Object.values(data).filter(x => x !== 'Seriler'))


  handleCardClick = (e) => {
    this.setState({
      expandedDiv: e,
    })
  }

  handleCardCloseClick = () => {
    this.setState({
      expandedDiv: '',
    })
  }

  handleSortByClick = () => {
    this.sortX()
  }

  handleTextChange = (e) => {
    let { listSeries } = this.state;
    if (e.target.value === '') {
      const { data } = this.props;
      listSeries = this.dataIntoArray(data)
    }
    const res = listSeries
      .filter(d => d.node.frontmatter.title.toLowerCase().includes(e.target.value.toLowerCase()))

    this.setState({ listSeries: res, selectedCategories: [] })
  }

  handleCategoryClick = (newSelectedCats) => {
    const { selectedCategories } = this.state
    const tempArr = [];
    if (newSelectedCats) {
      if (selectedCategories.length === 0) {
        tempArr.push(...newSelectedCats);
      } else {
        newSelectedCats.forEach((c) => {
          if (selectedCategories.includes(c)) {
            selectedCategories.pop(c);
            tempArr.pop(c);
          } else {
            tempArr.push(c);
          }
        })
      }
    }
    const { data } = this.props;
    let listSeries = this.dataIntoArray(data)
    const temp = [...selectedCategories, ...tempArr]
    if (temp.length > 0) {
      listSeries = listSeries.filter(d => d.node.frontmatter.selectedCategories
        .some(s => temp.includes(s)))
    }

    this.setState({
      selectedCategories: temp,
      listSeries,
    });
  }

  sortX = () => {
    const { data } = this.props;
    const res = Object.values(data).filter(x => x !== 'Seriler').sort((a, b) => {
      const aepisodes = a.node.frontmatter.episodes
        .map(x => x.youtubeURL.publishedAt).sort((x, y) => (y - x))
      const bepisodes = b.node.frontmatter.episodes
        .map(x => x.youtubeURL.publishedAt).sort((x, y) => (y - x))

      if (aepisodes[0] > bepisodes[0]) {
        return -1;
      }
      if (aepisodes[0] < bepisodes[0]) {
        return 1;
      }
      return 0;
    })
    this.setState({ listSeries: res })
  }

  render() {
    const { expandedDiv, selectedCategories, listSeries } = this.state;
    let previous = null;
    return (
      <div className="Series">
        <div className="SeriesListCategories">
          <Categories onClick={this.handleCategoryClick} selectedCategories={selectedCategories} />
        </div>
        <div className="SeriesListSortAndFilter">
          <button value="title" onClick={this.handleSortByClick} type="button" className="SortButton">İsim</button>
          <button value="date" type="button" className="SortButton">Tarih</button>
          <input onChange={this.handleTextChange} className="Nav--Search filter" type="text" />
        </div>
        <div className="SeriesContainer">
          {
            listSeries.map(({ node }, i) => {
              const { frontmatter, fields } = node
              if ((expandedDiv === frontmatter.title && (i % 2) === 1) || previous) {
                return (
                  <React.Fragment>
                    <SerieCard
                      key={i}
                      frontmatter={frontmatter}
                      handleClick={this.handleCardClick}
                    />
                    <SerieInfo
                      slug={fields.slug}
                      handleCardCloseClick={this.handleCardCloseClick}
                      frontmatter={previous || frontmatter}
                    />
                  </React.Fragment>
                )
              }
              if (expandedDiv === frontmatter.title && (i % 2) === 0) {
                previous = frontmatter;
              }
              return (
                <SerieCard
                  handleClick={this.handleCardClick}
                  key={i}
                  frontmatter={frontmatter}
                  slug={fields.slug}
                />
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
