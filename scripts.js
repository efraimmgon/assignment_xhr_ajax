var $ = (() => {

  var params = (obj) => {
    var acc = "";
    for (var k in obj) {
      acc += k + "=" + encodeURI(obj[k]) + "&";
    }
    return acc.slice(0, acc.length - 1);
  };

  // Build a method ajax which takes a single argument which is an options
  // object. Allow the following options:
  //    complete (function) What arguments should this take? [ok]
  //    data (object) [ok]
  //    error (function) What arguments should this take? [ok]
  //    headers (object) [ok]
  //     method (string) Note: type is an alias for this [ok]
  //     success (function) What arguments should this take? [ok]
  //    url (string)
  //    async (boolean)
  var ajax = (options) => {
    if (!options.async) { options.async = true; }

    var xhr = new XMLHttpRequest();

    xhr.onload = (e) => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 || xhr.status < 300) {
          options.success(xhr.responseText, xhr.statusText, xhr);
        } else if (options.error) {
          options.error(xhr, xhr.statusText, xhr.responseText);
        }
      }
      if (options.complete) {
        options.complete(xhr, xhr.statusText);
      }
    };

    xhr.open(options.method, options.url, options.async);

    if (options.headers) {
      xhr.setRequestHeader.apply(null, options.headers);
    }

    if (options.data) {
      xhr.send(params(options.data));
    } else {
      xhr.send();
    }

  };

  var get = (url, data, success) => {
    ajax({
      method: "GET",
      url: url,
      data: data,
      success: success
    });
  };

  var post = (url, data, success) => {
    ajax({
      method: "POST",
      url: url,
      data: data,
      success: success
    });
  };

  return {
    ajax: ajax,
    get: get,
    post: post,
    params: params
  };

})();
