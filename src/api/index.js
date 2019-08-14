// import 'whatwg-fetch';
// import users from './users';
// import * as dashboard from './dashboard';
// import * as analyze from './analyze';
// import * as editData from './editData';


const networkErrhandler = (error) => {

}

const initAuth = () => fetch('/api/users/auth', {
  headers: {
    authorization: localStorage.getItem('token') || ''
  },
  // credentials: 'same-origin',
}).then((res) => {
  if (res.status === 200) return res.json();
  return res.text();
}).catch(networkErrhandler);

const loginASVisitor = () => fetch('/api/users/loginasvisitor', {
  method: 'POST',
  // credentials: 'same-origin',
}).then((res) => {
  if (res.status === 200) return res.json();
  return res.text();
}).catch(networkErrhandler);

const fetchData = () => fetch('/api/data', {
  credentials: 'same-origin',
});

// console.log(index);
export default {
  initAuth,
  fetchData,
  loginASVisitor
  // ...users,
  // ...dashboard,
  // ...analyze,
  // ...editData,
};

// {
//   method: 'POST', // *GET, POST, PUT, DELETE, etc.
//   mode: 'cors', // no-cors, cors, *same-origin
//   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: 'same-origin', // include, *same-origin, omit
//   headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   redirect: 'follow', // manual, *follow, error
//   referrer: 'no-referrer', // no-referrer, *client
//   body: JSON.stringify(data), // body data type must match "Content-Type" header
// })
