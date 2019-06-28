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

import { setCityConfig, setCity } from '../state/cities';
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
  const { classes, cityConfig, city, setCity, setCityConfig } = props;

  useEffect(() => {
    async function fetchConfig() {
      const res = await apiRequest('/misc/city-config');
      setCityConfig(res.data);
    }
    fetchConfig();
  }, []);

  function handleChange(event) {
    setCity(event.target.value);
  }

  const cities = _(cityConfig)
    .values()
    .map(country => _.keys(country))
    .flatten()
    .value();

  return (
    <form className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="city">City</InputLabel>
        <Select
          value={city || 'none'}
          onChange={handleChange}
          inputProps={{
            name: 'city',
            id: 'city',
          }}
        >
          <MenuItem value={'none'}>{'None'}</MenuItem>
          {cities.map(city => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
});

const AppBar = ({
  classes,
  city,
  setCity,
  setCityConfig,
  cityConfig,
  ...props
}) => (
  <RaAppBar {...props}>
    <CitySwitcher
      cityConfig={cityConfig}
      city={city}
      setCity={setCity}
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
      cityConfig: state.cities.cityConfig,
      city: state.cities.city,
    }),
    { setCity, setCityConfig }
  ),
  withStyles(styles)
);

export default enhance(AppBar);
