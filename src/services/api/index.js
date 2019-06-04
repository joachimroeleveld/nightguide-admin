import venues from './venues';
import tags from './tags';
import events from './events';

const resources = {
  venues,
  tags,
  events,
};

export default (type, resource, params) => {
  return resources[resource](type, params);
};

