import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-final-form';
import { addField } from 'ra-core';
import { getPageSlug } from '../state/cities';

const PageSlugFilterUpdater = () => {
  const pageSlug = useSelector(getPageSlug);

  const form = useForm();

  useEffect(() => {
    form.change('pageSlug', pageSlug === 'none' ? null : pageSlug);
  }, [pageSlug]);

  return null;
};

export default addField(
  PageSlugFilterUpdater
);
