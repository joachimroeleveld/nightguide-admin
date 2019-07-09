import _ from 'lodash';
import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { AppBar as RaAppBar } from 'react-admin';

import { setCityConfig, setPageSlug, getPageSlugs } from '../state/cities';
import apiRequest from '../services/api/request';

const styles = theme =>
  createStyles({
    root: {
      margin: '0 1em',
    },
    title: {
      flexGrow: 1,
    },
  });

const CitySwitcher = withStyles(styles)(props => {
  const { classes, pageSlugs, pageSlug, setPageSlug, setCityConfig } = props;

  useEffect(() => {
    async function fetchConfig() {
      const res = await apiRequest('/misc/city-config');
      setCityConfig(res.data);
    }
    fetchConfig();
  }, []);

  function handleChange(event) {
    setPageSlug(event.target.value);
  }

  return (
    <form className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="page-slug">City page</InputLabel>
        <Select
          value={pageSlug || 'none'}
          onChange={handleChange}
          inputProps={{
            name: 'page-slug',
            id: 'page-slug',
          }}
        >
          <MenuItem value={'none'}>{'None'}</MenuItem>
          {pageSlugs.map(pageSlug => (
            <MenuItem key={pageSlug} value={pageSlug}>
              {pageSlug}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
});

const AppBar = ({
  classes,
  pageSlug,
  setPageSlug,
  setCityConfig,
  pageSlugs,
  ...props
}) => (
  <RaAppBar {...props}>
    <CitySwitcher
      pageSlugs={pageSlugs}
      pageSlug={pageSlug}
      setPageSlug={setPageSlug}
      setCityConfig={setCityConfig}
    />
    <Typography
      variant="title"
      color="inherit"
      className={classes.title}
      id="react-admin-title"
    />
  </RaAppBar>
);

const enhance = compose(
  connect(
    state => ({
      pageSlug: state.cities.pageSlug,
      pageSlugs: getPageSlugs(state),
    }),
    { setPageSlug, setCityConfig }
  ),
  withStyles(styles)
);

export default enhance(AppBar);
