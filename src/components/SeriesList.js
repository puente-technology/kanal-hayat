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
    console.log({ data });
    this.sortByName()
    // this.setState({ listSeries: this.dataIntoArray(data) })
  }

  dataIntoArray = data => (Object.values(data).filter(x => x !== 'Seriler'))

  handleLanguageChange = (e) => {
    console.log({ e: e.target.value });
    const { value } = e.target
    let { listSeries } = this.state;
    const { data } = this.props;
    listSeries = this.dataIntoArray(data)
    let res = listSeries;
    if (value !== '-99') {
      res = listSeries
        .filter(d => d.node.frontmatter.language === value)
    }
    this.setState({ listSeries: res })
  }

  handleTargetChange = (e) => {
    console.log({ e: e.target.value });
    const { value } = e.target
    let { listSeries } = this.state;
    const { data } = this.props;
    listSeries = this.dataIntoArray(data)
    let res = listSeries;
    if (value !== '-99') {
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
      console.log({ atitle, btitle });
      if (atitle > btitle) {
        return 1
      } if (atitle < btitle) {
        return -1
      }
      return 0
    })
    console.log({ res });
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
    const renderSeries = []
    for (let i = 0; i < listSeries.length; i += 1) {
      const { frontmatter, fields } = listSeries[i].node
      if (i.toString() === expandedDiv) {
        if (i % 2 === 0 && listSeries.length > 1) {
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

    // console.log({ listSeries });
    return (
      <div className="Series">
        <div className="SeriesListCategories">
          <Categories onClick={this.handleCategoryClick} selectedCategories={selectedCategories} />
        </div>
        <div className="SeriesListSortAndFilter">
          <button value="title" onClick={this.handleSortByClick} type="button" className="SortButton">İsim</button>
          <button value="date" onClick={this.handleSortByDateClick} type="button" className="SortButton">Tarih</button>
          <select onChange={this.handleLanguageChange} className="SortButton">
            <option value="-99">Dil</option>
            <option value="0">Türkçe</option>
            <option value="1">English</option>
          </select>
          <select onChange={this.handleTargetChange} className="SortButton">
            <option value="-99">Hedef Kitle</option>
            <option>Herkes</option>
            <option>Çocuk</option>
            <option>Genç</option>
            <option>Yetişkin</option>
          </select>
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
}

export default SeriesList
