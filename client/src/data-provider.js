import { stringify } from 'query-string';
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'react-admin';
import decodeJwt from 'jwt-decode';

/**
 * Maps react-admin queries to our REST API
 *
 * The REST dialect is Finale/Epilogue
 * @see https://github.com/tommybananas/finale
 * @example
 * GET_LIST     => GET /api/v1/applications?sort=keyname&page=0&count=100
 * GET_ONE      => GET /api/v1/applications_inc_all/123
 * GET_MANY     => GET /api/v1/applications?id=123&id=345&id=567
 * UPDATE       => PUT /api/v1/applications/123
 * CREATE       => POST /api/v1/applications
 * DELETE       => DELETE /api/v1/applications/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = '';
    // add auth header (see documentation for specifics https://marmelab.com/react-admin/Authentication.html)
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.jwt);
    const options = {
      headers: headers
    };
    // Simple, generic translator
    const symbolize = (str) => {
      let sym = '';
      switch (str) {
        case 'DESC':
          sym = '-';
          break;
      }
      return sym;
    };
    const auditName = (window.location.host === 'localhost:3000') ? '' : decodeJwt(localStorage.jwt).sub.substr(0,10);
    //console.log(`[DataProvider ${type} of ${resource}] with params...`);
    //console.log(params);
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...params.filter,
          sort: symbolize(order) + field,
          page: page - 1,
          count: perPage,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY: {
        const query = { id: params.ids };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...params.filter,
          [params.target]: params.id,
          sort: symbolize(order) + field,
          page: page - 1,
          count: perPage,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PUT';
        params.data.changeAudit = auditName;
        options.body = JSON.stringify(params.data);
        //console.log(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        params.data.createAudit = auditName;
        params.data.changeAudit = auditName;
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        params.data.changeAudit = auditName;
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
        //console.log(resource + ' !!');
      case GET_MANY_REFERENCE:
        //console.log(resource + ' !!!!');
        //console.log(json);
        const headerName = 'Content-Range';
        if (!headers.has(headerName)) {
          throw new Error(
            'The ${headerName} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
          );
        }
        return {
          data: json,
          total: parseInt(headers.get(headerName).split('/').pop(), 10),
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    if (type === GET_MANY) {
      if (isNaN(params.ids[0])) {
        var idsArray = params.ids.map(el => el.id);
        params.ids = idsArray;
      }

      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + localStorage.jwt);
      const options = {
        headers: headers
      };

      return httpClient(`${apiUrl}/${resource}?${stringify({id:idsArray})}`, options)
        .then((response) => convertHTTPResponse(response, type, resource, params)
      );
    }
    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    return httpClient(url, options).then(response =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};
