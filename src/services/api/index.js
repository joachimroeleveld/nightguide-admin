import venues from './venues';
import tags from './tags';
import events from './events';
import artists from './artists';
import content from './content';
import configs from './configs';

const resources = {
  venues,
  tags,
  events,
  artists,
  configs,
  'venues-articles': content,
  pages: content,
};

export default (type, resource, params) => {
  return resources[resource](type, params, resource);
};
