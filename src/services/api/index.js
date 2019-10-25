import venues from './venues';
import tags from './tags';
import events from './events';
import artists from './artists';
import content from './content';
import configs from './configs';
import orders from './orders';

const resources = {
  venues,
  tags,
  events,
  artists,
  configs,
  orders,
  'venues-articles': content('venues-article'),
  blogs: content('blog'),
  pages: content('page'),
};

export default (type, resource, params) => {
  return resources[resource](type, params, resource);
};
