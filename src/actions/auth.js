import {baseUrl} from './urlhelper'

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

export const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const thirtyMinutes = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem("token");
  }
};

export const signupUser = (credentials) => {
    return async (dispatch) => {
      return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: {...credentials, team_id: 1} })
      }).then((res) => {
        if (res.ok) {
          setToken(res.headers.get("Authorization"));
          return res
            .json()
            .then((userJson) =>
              dispatch({ type: 'AUTHENTICATED', payload: userJson })
            );
        } else {
          return res.json().then((errors) => {
            dispatch({ type: 'NOT_AUTHENTICATED' });
            return Promise.reject(errors.status.message);
          });
        }
      });
    };
};

export const loginUser = (credentials) => {
    return async (dispatch) => {
        return fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ user: credentials }),
        })
        .then((res) => {
          if (res.ok) {
            setToken(res.headers.get("Authorization"));
            return res.json()
            .then((userJson) => {
              dispatch({ type: 'AUTHENTICATED', payload: userJson.data })
              return userJson
            })
          } else {
            return res.json()
            .then((errors) => {
              dispatch({ type: 'NOT_AUTHENTICATED' });
              return Promise.reject(errors.error);
            });
          }
        });
    };
};
  
export const logoutUser = () => {
    return async (dispatch) => {
        return fetch(`${baseUrl}/logout`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getToken()
        },
        }).then((res) => {
        if (res.ok) {
            return dispatch({ type: 'NOT_AUTHENTICATED' });

        } else {
            return res.json().then((errors) => {
            dispatch({ type: 'NOT_AUTHENTICATED' });
            return Promise.reject(errors);
            });
        }
        });
    };
};

export const checkAuth = () => {
    return async (dispatch) => {
      return fetch(`${baseUrl}/current_user`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: getToken()
        }
      }).then((res) => {
        if (res.ok) {
          return res.json().then(user => {
            dispatch({type: 'AUTHENTICATED', payload: user})
          })
        } else {
          return Promise.reject(dispatch({type: 'NOT_AUTHENTICATED'}))
        }
      });
    };
  };