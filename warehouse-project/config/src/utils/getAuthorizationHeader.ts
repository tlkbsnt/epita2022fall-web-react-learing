import Cookies from 'js-cookie';

export function getAuthorizationHeader() {
  let currentUser = null;
  if (Cookies.get('currentUser') != null) {
    currentUser = Cookies.get('currentUser');
    return {
      Authorization: `Bearer ${
        JSON.parse(currentUser || '')?.accessToken || ''
      }`,
    };
  } else {
  }
}
