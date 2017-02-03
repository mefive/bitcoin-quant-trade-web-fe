import queryString from 'query-string';

function handleResponse(promise, url, method) {
  return promise
    .then(res => res.json())
    .then(({ code, data, message }) => {
      if (code === 0) {
        return data
      }
      else {
        throw({ code, message, url, method });
      }
    });
}

export default {
  get(api, params) {
    const url = params
      ? `${api}?${queryString.stringify(params)}`
      : api;

    return handleResponse(
      fetch(url, {
       credentials: 'include'
      }),
      url,
      'get'
    );
  }
}