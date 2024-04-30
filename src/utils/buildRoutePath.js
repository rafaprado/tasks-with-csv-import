/*
  /^\/tasks/
  /^\/tasks\/(?<id>[a-z0-9-_]+)/
  /^\/tasks
*/

export function buildRoutePath(path) {
  const pattern = /:([A-z]+)/g;
  const pathWithParams = path.replaceAll(pattern, '(?<$1>[a-z0-9\-_]+)');
  
  const pathRegex = new RegExp(`^${pathWithParams}$`);

  return pathRegex;
}