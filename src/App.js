import React from 'react';
import { Admin, Resource } from 'react-admin';

import dataProvider from './services/api';
import authProvider from './services/api/auth';

import VenueList from './components/VenueList';
import VenueEdit from './components/VenueEdit';
import TagList from './components/TagList';
import TagEdit from './components/TagEdit';
import TagCreate from './components/TagCreate';
import EventList from './components/EventList';
import EventEdit from './components/EventEdit';

function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="events" list={EventList} edit={EventEdit} />
      <Resource name="venues" list={VenueList} edit={VenueEdit} />
      <Resource name="tags" list={TagList} edit={TagEdit} create={TagCreate} />
    </Admin>
  );
}

export default App;
