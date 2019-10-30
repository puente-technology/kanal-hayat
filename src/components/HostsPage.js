/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SeriesList.scss'
import HostCard from './HostCard';
import SerieInfo from './SerieInfo';
import Categories from './Categories';
import Dropdown from './Dropdown';

const rightArrow = require('../../static/images/right-arrow-black.svg');

class HostsList extends Component {
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
    sortByNameBool: false,
    sortByDateBool: false,
  }

  componentDidMount() {
    const { hosts } = this.props;
    this.setState({ listSeries: this.dataIntoArray(hosts) })
    // this.sortSeriesByPopularity()
  }

  dataIntoArray = data => (Object.values(data).filter(x => x !== 'Sunucular'))

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

  handleHostChange = (value) => {
    let { listSeries } = this.state;
    const { data } = this.props;
    listSeries = this.dataIntoArray(data)
    let res = listSeries;
    if (value !== 'Sunucu Ismi') {
      res = listSeries
        .filter(d => d.node.frontmatter.host === value)
    }
    this.setState({ listSeries: res })
  }

  sortSeriesByPopularity = () => {
    const { data } = this.props;
    const res = Object.values(data).filter(x => x !== 'Seriler').sort((a, b) => {
      const aRand = Math.floor(Math.random() * 101)
      const bRand = Math.floor(Math.random() * 101)
      const atitle = String(Number(a.node.frontmatter.popularity) * aRand)
      const btitle = String(Number(b.node.frontmatter.popularity) * bRand)
      if (atitle < btitle) {
        return 1
      } if (atitle > btitle) {
        return -1
      }
      return 0
    })
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
    const { sortByNameBool, sortByDateBool, listSeries } = this.state
    const { data } = this.props;
    let dataToSort = data
    if (sortByDateBool) {
      dataToSort = listSeries
    }
    const res = Object.values(dataToSort).filter(x => x !== 'Sunucular').sort((a, b) => {
      const atitle = a.node.frontmatter.title
      const btitle = b.node.frontmatter.title
      if (atitle > btitle) {
        return 1
      } if (atitle < btitle) {
        return -1
      }
      return 0
    })
    this.setState({ listSeries: res, sortByNameBool: !sortByNameBool })
  }

  handleTextChange = (e) => {
    let { listSeries } = this.state;
    const { hosts } = this.props;
    if (e.target.value && listSeries.length === 0) {
      listSeries = this.dataIntoArray(hosts)
    }
    if (e.target.value === '') {
      listSeries = this.dataIntoArray(hosts)
    }
    const res = listSeries
      .filter(d => (
        d.node.frontmatter.host.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(e.target.value.toLowerCase())
      ))
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
    const { sortByDateBool, sortByNameBool, listSeries } = this.state
    let dataToSort = data
    if (sortByNameBool) {
      dataToSort = listSeries
    }
    const res = Object.values(dataToSort).filter(x => x !== 'Sunucular').sort((a, b) => {
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
    this.setState({ listSeries: res, sortByDateBool: !sortByDateBool })
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
      sortByNameBool,
      sortByDateBool,
    } = this.state;
    const { hosts, hostList, data } = this.props
    const renderHosts = []
    for (let i = 0; i < listSeries.length; i += 1) {
      const { frontmatter, fields } = listSeries[i].node
      if (i.toString() === expandedDiv) {
        if (i % 2 === 0 && listSeries.length > 1 && !!hosts[i + 1]) {
          const nextFields = listSeries[i + 1].node.fields
          const nextFronmatter = listSeries[i + 1].node.frontmatter
          renderHosts.push(
            <React.Fragment>
              <HostCard
                handleClick={this.handleCardClick}
                key={i}
                frontmatter={frontmatter}
                slug={fields.slug}
                value={i}
                hosts={hosts}
              />
              <HostCard
                handleClick={this.handleCardClick}
                key={i + 1}
                frontmatter={nextFronmatter}
                slug={nextFields.slug}
                value={i + 1}
                hosts={hosts}
              />
            </React.Fragment>,
          )
          i += 1
        } else {
          renderHosts.push(
            <React.Fragment>
              <HostCard
                handleClick={this.handleCardClick}
                key={i}
                frontmatter={frontmatter}
                slug={fields.slug}
                value={i}
                hosts={hosts}
              />
            </React.Fragment>,
          )
        }
      } else {
        renderHosts.push(
          <React.Fragment>
            <HostCard
              handleClick={this.handleCardClick}
              key={i}
              frontmatter={frontmatter}
              slug={fields.slug}
              value={i}
              hosts={hosts}
            />
          </React.Fragment>,
        )
      }
    }
    return (
      <div className="Series">
        <div className="SeriesListSortAndFilter">
          <button
            value="title"
            onClick={this.handleSortByClick}
            type="button"
            className={sortByNameBool ? 'SortButton active' : 'SortButton'}
          >
            Sunucu İsmi
          </button>
          {/* <button
            value="date"
            onClick={this.handleSortByDateClick}
            type="button"
            className={sortByDateBool ? 'SortButton active' : 'SortButton'}
          >
            Tarih
          </button> */}
          {/* <Dropdown handleLanguageChange=
            {this.handleLanguageChange} list={['Dil', 'Turkce', 'English']} /> */}
          <Dropdown handleTargetChange={this.handleTargetChange} list={['Hedef Kitle', 'Herkes', 'Çocuk', 'Genç', 'Yetişkin']} />
          {/* <Dropdown handleHostChange={this.handleHostChange} list={hostList} /> */}
          <input onChange={this.handleTextChange} className="Nav--Search filter" type="text" />
        </div>
        <div className="SeriesContainer">
          {
            renderHosts.map(x => x)
          }
        </div>
      </div>
    )
  }
}

HostsList.propTypes = {
  data: PropTypes.any,
  hosts: PropTypes.any,
  hostList: PropTypes.any,
}

export default connect(state => ({
  test: state,
}), null)(HostsList)
