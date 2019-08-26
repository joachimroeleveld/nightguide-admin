import React from 'react';
import { Admin, Resource } from 'react-admin';

import dataProvider from './services/api';
import authProvider from './services/api/auth';

import VenueList from './components/venues/VenueList';
import VenueEdit from './components/venues/VenueEdit';
import VenueShow from './components/venues/VenueShow';
import TagList from './components/tags/TagList';
import TagEdit from './components/tags/TagEdit';
import TagCreate from './components/tags/TagCreate';
import ArtistList from './components/artists/ArtistList';
import ArtistEdit from './components/artists/ArtistEdit';
import ArtistCreate from './components/artists/ArtistCreate';
import EventList from './components/events/EventList';
import EventShow from './components/events/EventShow';
import EventCreate from './components/events/EventCreate';
import EventEdit from './components/events/EventEdit';
import VenuesArticleEdit from './components/venuesarticles/VenuesArticleEdit';
import VenuesArticleCreate from './components/venuesarticles/VenuesArticleCreate';
import VenuesArticleList from './components/venuesarticles/VenuesArticleList';
import AppLayout from './components/AppLayout';

import citiesReducer from './state/cities';

function App() {
  const customReducers = {
    cities: citiesReducer,
  };

  return (
    <Admin
      appLayout={AppLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      customReducers={customReducers}
    >
      <Resource
        name="events"
        show={EventShow}
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
      />
      <Resource
        name="venues"
        list={VenueList}
        edit={VenueEdit}
        show={VenueShow}
      />
      <Resource name="tags" list={TagList} edit={TagEdit} create={TagCreate} />
      <Resource
        name="artists"
        list={ArtistList}
        edit={ArtistEdit}
        create={ArtistCreate}
      />
      <Resource
        name="venues-articles"
        list={VenuesArticleList}
        edit={VenuesArticleEdit}
        create={VenuesArticleCreate}
      />
    </Admin>
  );
}

export default App;
