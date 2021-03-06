import { replace } from 'react-router-redux';
import {
  DELETE_ARTICLE,
  INCREMENT,
  RESET,
  SELECT_ARTICLE,
  SELECT_DATES,
  ADD_COMMENT,
  LOAD_ARTICLE_COMMENTS,
  LOAD_PAGE_COMMENTS,
  LOAD_ALL_ARTICLES,
  LOAD_ARTICLE,
  START,
  SUCCESS,
  FAIL,
} from '../constants';


export const deleteArticle = id =>
  ({
    type: DELETE_ARTICLE,
    payload: { id },
  });

export const selectArticle = selected =>
  ({
    type: SELECT_ARTICLE,
    payload: selected,
  });

export const pickDates = range =>
  ({
    type: SELECT_DATES,
    payload: range,
  });

export const addComment = (comment, articleId) =>
  ({
    type: ADD_COMMENT,
    payload: { comment, articleId },
    generateId: true,
  });

export const loadArticleComments = articleId =>
  ({
    type: LOAD_ARTICLE_COMMENTS,
    payload: { articleId },
    callAPI: `/api/comment?article=${articleId}`,
  });

export const checkAndLoadPageComments = page =>
  (dispatch, getState) => {
    const { comments: { pagination } } = getState();
    if (pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return;

    dispatch({
      type: LOAD_PAGE_COMMENTS,
      payload: { page },
      callAPI: `/api/comment?limit=5&offset=${(page - 1) * 5}`,
    });
  };

export const loadAllArticles = () =>
  ({
    type: LOAD_ALL_ARTICLES,
    callAPI: '/api/article',
  });

export const loadArticle = id =>
  (dispatch) => {
    dispatch({
      type: LOAD_ARTICLE + START,
      payload: { id },
    });

    setTimeout(() => {
      fetch(`/api/article/${id}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error(res.statusText);
          }
          return res.json();
        })

        .then(response => dispatch({
          type: LOAD_ARTICLE + SUCCESS,
          payload: { id, response },
        }))

        .catch((error) => {
          dispatch({
            type: LOAD_ARTICLE + FAIL,
            payload: { id, error },
          });
          dispatch(replace('/error'));
        });
    }, 1000);
  };
