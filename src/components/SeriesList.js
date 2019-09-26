import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SeriesList.scss'
import SerieCard from './SerieCard';
import SerieInfo from './SerieInfo';
import Categories from './Categories';
import Dropdown from './Dropdown';

const rightArrow = require('../../static/images/right-arrow-black.svg');

class SeriesList extends Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
  }

  state = {
    expandedDiv: '',
    selectedCategories: [],
    listSeries: [],
    scrollLeftPosition: 0,
    scrollLeftMax: 1,
  }

  componentDidMount() {
    const { data } = this.props;
    this.sortByName()
    this.setState({ listSeries: this.dataIntoArray(data) })
  }

  dataIntoArray = data => (Object.values(data).filter(x => x !== 'Seriler'))

  handleLanguageChange = (value) => {
    const valueType = value === 'Turkce' ? '0' : '1'
    let { listSeries } = this.state;
    const { data } = this.props;
    listSeries = this.dataIntoArray(data)
    let res = listSeries;
    if (value !== 'Dil') {
      res = listSeries
        .filter(d => d.node.frontmatter.language === valueType)
    }
    this.setState({ listSeries: res })
  }

  handleTargetChange = (value) => {
    let { listSeries } = this.state;
    const { data } = this.props;
    listSeries = this.dataIntoArray(data)
    let res = listSeries;
    if (value !== 'Hedef Kitle') {
      res = listSeries
        .filter(d => d.node.frontmatter.targetGroup === value)
    }
    this.setState({ listSeries: res })
  }

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

  handleSortByDateClick = () => {
    this.sortByDate()
  }

  handleSortByClick = () => {
    this.sortByName()
  }

  sortByName = () => {
    const { data } = this.props;
    const res = Object.values(data).filter(x => x !== 'Seriler').sort((a, b) => {
      const atitle = a.node.frontmatter.title
      const btitle = b.node.frontmatter.title
      if (atitle > btitle) {
        return 1
      } if (atitle < btitle) {
        return -1
      }
      return 0
    })
    this.setState({ listSeries: res })
  }

  handleTextChange = (e) => {
    let { listSeries } = this.state;
    if (e.target.value === '') {
      const { data } = this.props;
      listSeries = this.dataIntoArray(data)
    }
    const res = listSeries
      .filter(d => d.node.frontmatter.title.toLowerCase().includes(e.target.value.toLowerCase()))

    this.setState({ listSeries: res, selectedCategories: [], expandedDiv: '' })
  }

  handleCategoryClick = (newSelectedCats) => {
    let { selectedCategories } = this.state
    const tempArr = [];
    if (newSelectedCats) {
      if (selectedCategories.length === 0) {
        tempArr.push(...newSelectedCats);
      } else {
        newSelectedCats.forEach((c) => {
          if (selectedCategories.includes(c)) {
            selectedCategories = selectedCategories.filter(x => x !== c)
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

  sortByDate = () => {
    const { data } = this.props;
    const res = Object.values(data).filter(x => x !== 'Seriler').sort((a, b) => {
      const episodesInfoA = a.node.frontmatter.episodes || []
      const episodesInfoB = b.node.frontmatter.episodes || []
      const aepisodes = episodesInfoA
        .map(x => x.youtubeURL.publishedAt).sort((x, y) => (y - x))
      const bepisodes = episodesInfoB
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

  handleScroll = (e) => {
    const elem = e.target;
    const scrollLeftMax = elem.scrollWidth - elem.clientWidth;
    this.setState(() => ({ scrollLeftMax, scrollLeftPosition: elem.scrollLeft }));
  }

  render() {
    const {
      expandedDiv,
      selectedCategories,
      listSeries,
      scrollLeftMax,
      scrollLeftPosition,
    } = this.state;
    const { hosts } = this.props
    const renderSeries = []
    for (let i = 0; i < listSeries.length; i += 1) {
      const { frontmatter, fields } = listSeries[i].node
      if (i.toString() === expandedDiv) {
        if (i % 2 === 0 && listSeries.length > 1 && !!listSeries[i + 1]) {
          const nextFields = listSeries[i + 1].node.fields
          const nextFronmatter = listSeries[i + 1].node.frontmatter
          renderSeries.push(
            <React.Fragment>
              <SerieCard
                handleClick={this.handleCardClick}
                key={i}
                frontmatter={frontmatter}
                slug={fields.slug}
                value={i}
              />
              <SerieCard
                handleClick={this.handleCardClick}
                key={i + 1}
                frontmatter={nextFronmatter}
                slug={nextFields.slug}
                value={i + 1}
              />
              <SerieInfo
                slug={fields.slug}
                handleCardCloseClick={this.handleCardCloseClick}
                frontmatter={frontmatter}
                hosts={hosts}
              />
            </React.Fragment>,
          )
          i += 1
        } else {
          renderSeries.push(
            <React.Fragment>
              <SerieCard
                handleClick={this.handleCardClick}
                key={i}
                frontmatter={frontmatter}
                slug={fields.slug}
                value={i}
              />
              <SerieInfo
                slug={fields.slug}
                handleCardCloseClick={this.handleCardCloseClick}
                frontmatter={frontmatter}
              />
            </React.Fragment>,
          )
        }
      } else {
        renderSeries.push(
          <React.Fragment>
            <SerieCard
              handleClick={this.handleCardClick}
              key={i}
              frontmatter={frontmatter}
              slug={fields.slug}
              value={i}
            />
          </React.Fragment>,
        )
      }
    }
    return (
      <div className="Series">
        <div className="SeriesListCategories" onScroll={this.handleScroll}>
          { scrollLeftPosition > 20 && scrollLeftPosition <= scrollLeftMax
          && (
          <div className="categoryArrowLeft">
            <button
              type="button"
              style={{
                background: `url(${rightArrow}) no-repeat`,
                backgroundSize: 'contain',
                border: 'none',
              }}
              className="left-arrow"
            />
          </div>
          )}
          <Categories onClick={this.handleCategoryClick} selectedCategories={selectedCategories} />
          { scrollLeftPosition < scrollLeftMax
          && (
          <div className="categoryArrowRight">
            <button
              type="button"
              style={{
                background: `url(${rightArrow}) no-repeat`,
                backgroundSize: 'contain',
                border: 'none',
              }}
              className="right-arrow"
            />
          </div>
          )}
        </div>

        <div className="SeriesListSortAndFilter">
          <button value="title" onClick={this.handleSortByClick} type="button" className="SortButton">İsim</button>
          <button value="date" onClick={this.handleSortByDateClick} type="button" className="SortButton">Tarih</button>
          <Dropdown handleLanguageChange={this.handleLanguageChange} list={['Dil', 'Turkce', 'English']} />
          <Dropdown handleTargetChange={this.handleTargetChange} list={['Hedef Kitle', 'Herkes', 'Çocuk', 'Genç', 'Yetişkin']} />
          <input onChange={this.handleTextChange} className="Nav--Search filter" type="text" />
        </div>
        <div className="SeriesContainer">
          {
            renderSeries.map(x => x)
          }
        </div>
      </div>
    )
  }
}

SeriesList.propTypes = {
  data: PropTypes.any,
  hosts: PropTypes.any,
}

export default connect(state => ({
  test: state,
}), null)(SeriesList)
