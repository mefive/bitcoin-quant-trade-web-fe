import queryString from 'query-string';

function handleResponse(promise) {
  return promise
    .then(res => res.json())
    .then(({ code, data, message }) => {
      if (code === 0) {
        return data
      }
      else {
        throw({ code, message });
      }
    });
}

export default {
  get(api, params) {
    const url = params
      ? `${api}?${queryString.stringify(params)}`
      : api;

    return handleResponse(fetch(url, {
      credentials: 'include'
    }));
  }
}