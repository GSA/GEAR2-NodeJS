import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR } from 'react-admin';
import decodeJwt from 'jwt-decode';

const authEntry = '/beginAuth';

const isValidJwt = () => {
  const decodedToken = decodeJwt(localStorage.jwt);
  if (!decodedToken.hasOwnProperty('scopes')
      || !decodedToken.hasOwnProperty('exp')
      || !decodedToken.hasOwnProperty('sub')) {
    return false;
  }
  if (decodedToken.hasOwnProperty('exp')) {
    if (decodedToken.exp <= Math.floor(Date.now() / 1000)) {
      return false;
    }
  }
  if (decodedToken.hasOwnProperty('scopes') && decodedToken.scopes.length == 0) {
    return false;
  }
  return true;
}

const extractScopes = () => {
  // only called if valid token
  const decodedToken = decodeJwt(localStorage.jwt);
  localStorage.setItem('scopes', decodedToken.scopes);
  return decodedToken.scopes;
}

export default (type, params) => {
  // console.log('AUTH PROVIDING:  ' + type);
  if (type === AUTH_LOGIN) {
    window.location = '/beginAuth';
    // should no longer be triggered (see LoginPage.js)
  }
  if (type === AUTH_LOGOUT) {
    // console.log('AUTH logout');
    // TODO: remove jwt? or set exp to expire now?
    //TODO clara re-add localStorage.removeItem('jwt');
    return Promise.resolve();
    // return Promise.reject({ redirectTo: authEntry });
  }
  if (type === AUTH_ERROR) {
    // console.log('AUTH error');
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject({ redirectTo: authEntry });
    }
    return Promise.resolve();
  }
  // AUTH_CHECK is intended to only validate the jwt
  if (type === AUTH_CHECK) {
    if (window.location.host === 'localhost:3000' || isValidJwt()) {
      return Promise.resolve();
    } else {
      Promise.reject({ redirectTo: authEntry });
    }
  }
  if (type === AUTH_GET_PERMISSIONS) {
      if (window.location.host === 'localhost:3000') {
          return Promise.resolve('appHostingProvider:DELETE,appHostingProvider:GET,appHostingProvider:POST,appHostingProvider:PUT,application:DELETE,application:GET,application:POST,application:PUT,applicationCost:DELETE,applicationCost:GET,applicationCost:POST,applicationCost:PUT,applicationInterface:DELETE,applicationInterface:GET,applicationInterface:POST,applicationInterface:PUT,applicationRationalization:DELETE,applicationRationalization:GET,applicationRationalization:POST,applicationRationalization:PUT,applicationreplacedby:GET,applicationStatus:DELETE,applicationStatus:GET,applicationStatus:POST,applicationStatus:PUT,appPlatform:DELETE,appPlatform:GET,appPlatform:POST,appPlatform:PUT,app_capabilities:DELETE,app_capabilities:GET,app_capabilities:POST,atoType:DELETE,atoType:GET,atoType:POST,atoType:PUT,capability:DELETE,capability:GET,capability:POST,capability:PUT,cuiCategory:DELETE,cuiCategory:GET,cuiCategory:POST,cuiCategory:PUT,deploymentType:DELETE,deploymentType:GET,deploymentType:POST,deploymentType:PUT,fisma:DELETE,fisma:GET,fisma:POST,fisma:PUT,fismaArtifact:DELETE,fismaArtifact:GET,fismaArtifact:POST,fismaArtifact:PUT,fismareplacedby:GET,fsCloudSp:DELETE,fsCloudSp:GET,fsCloudSp:POST,fsCloudSp:PUT,fsCloudSt:DELETE,fsCloudSt:GET,fsCloudSt:POST,fsCloudSt:PUT,fy:DELETE,fy:GET,fy:POST,fy:PUT,investment:DELETE,investment:GET,investment:POST,investment:PUT,investmentCost:DELETE,investmentCost:GET,investmentCost:POST,investmentCost:PUT,investmentType:DELETE,investmentType:GET,investmentType:POST,investmentType:PUT,organization:DELETE,organization:GET,organization:POST,organization:PUT,parentSystem:DELETE,parentSystem:GET,parentSystem:POST,parentSystem:PUT,parentSystemCost:DELETE,parentSystemCost:GET,parentSystemCost:POST,parentSystemCost:PUT,piiCategory:DELETE,piiCategory:GET,piiCategory:POST,piiCategory:PUT,poc:DELETE,poc:GET,poc:POST,poc:PUT,portfolio:DELETE,portfolio:GET,portfolio:POST,portfolio:PUT,referenceDocument:DELETE,referenceDocument:GET,referenceDocument:POST,referenceDocument:PUT,scimpactlevel:DELETE,scimpactlevel:GET,scimpactlevel:POST,scimpactlevel:PUT,standardCategory:DELETE,standardCategory:GET,standardCategory:POST,standardCategory:PUT,standardType:DELETE,standardType:GET,standardType:POST,standardType:PUT,technology:DELETE,technology:GET,technology:POST,technology:PUT,technologyreplacedby:GET,technologyStatus:DELETE,technologyStatus:GET,technologyStatus:POST,technologyStatus:PUT,timeQuadrant:DELETE,timeQuadrant:GET,timeQuadrant:POST,timeQuadrant:PUT,userLocation:DELETE,userLocation:GET,userLocation:POST,userLocation:PUT,year:DELETE,year:GET,year:POST,year:PUT');
      } else {
        return Promise.resolve(extractScopes());
      }
  }
  return Promise.reject('UNKNOWN METHOD');
}
