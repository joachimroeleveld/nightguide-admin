import venues from './venues';
import tags from './tags';
import events from './events';
import artists from './artists';

const resources = {
  venues,
  tags,
  events,
  artists,
};

export default (type, resource, params) => {
  return resources[resource](type, params);
};
