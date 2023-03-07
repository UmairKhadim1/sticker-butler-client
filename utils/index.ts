export const gqlResponseResolver = () => { };
export const parseQueryStringToDictionary = (queryString: string): any => {
  var dictionary: any = {};

  // remove the '?' from the beginning of the
  // if it exists
  if (queryString.indexOf('?') === 0) {
    queryString = queryString.substr(1);
  }

  // Step 1: separate out each key/value pair
  var parts = queryString.split('&');

  for (var i = 0; i < parts.length; i++) {
    var p = parts[i];
    // Step 2: Split Key/Value pair
    var keyValuePair = p.split('=');

    // Step 3: Add Key/Value pair to Dictionary object
    var key = keyValuePair[0];
    var value = keyValuePair[1];

    // decode URI encoded string
    value = decodeURIComponent(value);
    value = value.replace(/\+/g, ' ');

    dictionary[key] = value;
  }

  // Step 4: Return Dictionary Object
  return dictionary;
};
export const dictoneryToQueryString = (params: any): any => {
  let queryString = '';
  const paramKeys = Object.keys(params);
  paramKeys &&
    paramKeys.map((key, index) => {
      if (params[key] && params[key] != 'null') {
        queryString += `${key}=${params[key]}${index + 1 < paramKeys.length ? '&' : ''
          }`;
      }
    });
  return queryString;
};
export const getSortFunction = (params: any): any => {
  let sortBy = '';
  let orderBy = '';
  switch (params) {
    case 'no':
      orderBy = 'createdAt';
      sortBy = 'desc';
      break;
    case 'on':
      orderBy = 'createdAt';
      sortBy = 'asc';
      break;
    case 'az':
      orderBy = 'name';
      sortBy = 'asc';
      break;
    case 'za':
      orderBy = 'name';
      sortBy = 'desc';
      break;
    default:
  }
  return { sortBy, orderBy };
};
