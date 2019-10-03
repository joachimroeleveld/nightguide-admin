import React from 'react';
import { Admin, Resource } from 'react-admin';

import dataProvider from './services/api';
import authProvider from './services/api/auth';

import VenueList from './components/venues/VenueList';
import VenueEdit from './components/venues/VenueEdit';
import VenueShow from './components/venues/VenueShow';
import VenueCreate from './components/venues/VenueCreate';
import TagList from './components/tags/TagList';
import TagEdit from './components/tags/TagEdit';
import TagCreate from './components/tags/TagCreate';
import ArtistList from './components/artists/ArtistList';
import ArtistEdit from './components/artists/ArtistEdit';
import ArtistCreate from './components/artists/ArtistCreate';
import ConfigList from './components/configs/ConfigList';
import ConfigEdit from './components/configs/ConfigEdit';
import ConfigCreate from './components/configs/ConfigCreate';
import EventList from './components/events/EventList';
import EventShow from './components/events/EventShow';
import EventCreate from './components/events/EventCreate';
import EventEdit from './components/events/EventEdit';
import VenuesArticleEdit from './components/venuesarticles/VenuesArticleEdit';
import VenuesArticleCreate from './components/venuesarticles/VenuesArticleCreate';
import VenuesArticleList from './components/venuesarticles/VenuesArticleList';
import AppLayout from './components/AppLayout';
import PageList from './components/pages/PageList';
import PageEdit from './components/pages/PageEdit';
import PageCreate from './components/pages/PageCreate';
import BlogList from './components/blogs/BlogList';
import BlogEdit from './components/blogs/BlogEdit';
import BlogCreate from './components/blogs/BlogCreate';

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
        create={VenueCreate}
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
        name="configs"
        list={ConfigList}
        edit={ConfigEdit}
        create={ConfigCreate}
      />
      <Resource
        name="pages"
        list={PageList}
        edit={PageEdit}
        create={PageCreate}
      />
      <Resource
        name="blogs"
        list={BlogList}
        edit={BlogEdit}
        create={BlogCreate}
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
