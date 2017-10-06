import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Article from './Article/';
import accordionDecorator from '../decorators/accordion';
import { filteredArticlesSelector } from '../selectors';
import { mapToArr } from '../helpers';
import { loadAllArticles } from '../AC';

class ArticleList extends Component {
  static propTypes = {
    // from connect
    articles: PropTypes.array.isRequired,
    // from accordion
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadAllArticles();
  }

  render() {
    const { articles, openItemId, toggleOpenItem } = this.props;

    const articleElements = mapToArr(articles).map(article =>
      (
        <li key={article.id}>
          <Article
            article={article}
            isOpen={article.id === openItemId}
            toggleOpen={toggleOpenItem(article.id)}
          />
        </li>
      ));
    return (
      <ul>
        {articleElements}
      </ul>
    );
  }
}

export default connect(state => (
  {
    articles: filteredArticlesSelector(state),
  }
), { loadAllArticles })(accordionDecorator(ArticleList));
