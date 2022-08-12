enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE ='DELETE'
};

type Options = {
  method: METHODS;
  headers?: {};
  data?: any;
  timeout?: number;
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  return Object.entries(data).reduce((res, [key, value], i) => {
    if (i === 0) return '?' + key + '=' + value
    else return res + '&' + key + '=' + value
  }, '')
}

class HTTPTransport {
  get = (url, options: Options = { method: METHODS.GET }) => {
    const { data } = options;
    if (Object.keys(data).length > 0) url += queryStringify(data);
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  
  put = (url, options: Options = { method: METHODS.GET }) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  
  post = (url, options: Options = { method: METHODS.POST }) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  
  delete = (url, options: Options = { method: METHODS.DELETE }) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: Options = { method: METHODS.GET }, timeout = 5000) => {
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
      
      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}