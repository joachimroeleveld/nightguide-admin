import { useEffect } from 'react';
import { connect } from 'react-redux';
import { change } from 'redux-form';

const PageSlugFilterUpdater = props => {
  const { pageSlug, formDispatch } = props;

  useEffect(() => {
    formDispatch(
      change(
        'filterForm',
        'pageSlug',
        pageSlug === 'none' ? null : pageSlug
      )
    );
  }, [pageSlug]);

  return null;
};

export default connect(state => ({
  pageSlug: state.cities.pageSlug,
}))(PageSlugFilterUpdater);
