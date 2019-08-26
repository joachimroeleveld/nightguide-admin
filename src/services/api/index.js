import venues from './venues';
import tags from './tags';
import events from './events';
import artists from './artists';
import content from './content';

const resources = {
  venues,
  tags,
  events,
  artists,
  'venues-articles': content,
};

export default (type, resource, params) => {
  return resources[resource](type, params, resource);
};
