import routeIndex from "routes";
import routeAPI from "routes/api";
import routeRegister from "routes/register";
import routeStore from "routes/store/store";


const index = {
  pathId: '',
  method: routeIndex,
};

const api = {
  pathId: 'api',
  method: routeAPI,
};

const store = {
  pathId: 'store',
  method: routeStore,
};

const register = {
  pathId: 'register',
  method: routeRegister,
};

export const operation = {
  index,
  api,
  store,
  register,
};
