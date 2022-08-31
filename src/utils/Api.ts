type METHODS = 'GET' | 'PUT' | 'POST' | 'DELETE';

type Options = {
  method: METHODS;
  headers?: { [key: string]: string };
  data?: Record<string, undefined>;
  timeout?: number;
};

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return Object.entries(data).reduce((res, [key, value], i) => {
    if (i === 0) return '?' + key + '=' + value
    else return res + '&' + key + '=' + value
  }, '')
}

export class HTTPTransport {
  get = (url: string, options: Options = { method: 'GET' }) => {
    const { data } = options;
    if (data && Object.keys(data).length > 0) url += queryStringify(data);
    return this.request(url, {...options, method: 'GET'}, options.timeout);
  };

  put = (url: string, options: Options = { method: 'GET' }) => {
    return this.request(url, {...options, method: 'PUT'}, options.timeout);
  };

  post = (url: string, options: Options = { method: 'POST' }) => {
    return this.request(url, {...options, method: 'POST'}, options.timeout);
  };

  delete = (url: string, options: Options = { method: 'DELETE' }) => {
    return this.request(url, {...options, method: 'DELETE'}, options.timeout);
  };

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: Options = { method: 'GET' }, timeout = 5000) => {
    const {method, data, headers = {}} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === 'GET') {
        xhr.send();
      } else if (data) {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}