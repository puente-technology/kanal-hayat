import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PropTypes from 'prop-types';


class Categories extends Component {
  listCategories = []

  listParentCategories = []

  state = {
    listSubCategories: [],
  }

  handleCategoryClick = (e) => {
    const kids = this.listCategories.filter(i => i.frontmatter.parentCategory === e.target.value)
    this.setState({
      listSubCategories: kids,
    })
    const { onClick } = this.props;
    if (kids && kids.length > 0) {
      const result = kids.map(r => r.frontmatter.category)
      onClick.onClick(result)
      return;
    }
    onClick.onClick([e.target.value])
  }

  render() {
    const { nodes, onClick } = this.props;
    const { listSubCategories } = this.state
    // const fnClick = Object.values(nodes)[]
    this.listCategories = Object.values(nodes).filter(x => x.frontmatter !== undefined)
    this.listParentCategories = this
      .listCategories.filter(c => c.frontmatter.parentCategory === null)
    // const listSubCategories = listCategories.filter(c => c.parentCategory !== null)
    return (
      <React.Fragment>
        {
          this.listParentCategories.map(category => (
            <button
              onClick={this.handleCategoryClick}
              value={category.frontmatter.category}
              className={`category ${onClick.selectedCategories.includes(category.frontmatter.category) ? 'active' : ''}`}
              type="button"
            >
              {category.frontmatter.category}
            </button>
          ))
        }
        <div className="subcateg">
          {
            listSubCategories.map(category => (
              <button onClick={onClick.onClick} value={category.frontmatter.category} className="category" type="button">{category.frontmatter.category}</button>
            ))
          }
        </div>
      </React.Fragment>
    )
  }
}

Categories.propTypes = {
  onClick: PropTypes.func,
  nodes: PropTypes.any,
}

export default (onClick) => {
  console.log({ onClick });
  return (
    <StaticQuery
      query={graphql`
    query CategoriesQ {
      allMarkdownRemark(filter: {fields: {contentType: {regex: "/categories/"}}}) {
        nodes {
          frontmatter {
            category
            parentCategory
          }
        }
      }
    }
    `}
      // eslint-disable-next-line react/jsx-no-bind
      render={(data) => {
        console.log({ onClick, data });
        return (
          <Categories
            nodes={data.allMarkdownRemark.nodes}
            onClick={onClick}
          />
        )
      }}
    />
  )
}
