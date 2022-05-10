import { userService } from "../_services";
import { router } from "../_helpers";
import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? {
      status: { loggedIn: true },
      user,
      taskDatas: [],
      delTasks: [],
      willEditData: []
    }
  : { status: {}, user: null, taskDatas: [], delTasks: [], willEditData: [] };

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });
    localStorage.setItem("ATHENTICATE_USER", email);

    userService.login(email, password).then(
      user => {
        commit("loginSuccess", user);
        router.push("/");
      },
      error => {
        commit("loginFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
  logout({ commit }) {
    userService.logout();
    localStorage.removeItem("ATHENTICATE_USER");
    commit("logout");
  },
  register({ dispatch, commit }, user) {
    commit("registerRequest", user);

    userService.register(user).then(
      user => {
        commit("registerSuccess", user);
        router.push("/login");
        setTimeout(() => {
          // display success message after route change completes
          dispatch("alert/success", "Registration successful", { root: true });
        });
      },
      error => {
        commit("registerFailure", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },
  temp({ dispatch, commit }) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authOwner: localStorage.getItem("ATHENTICATE_USER")
      })
    };
    axios
      .post("http://localhost:8080/api/task/getAllTaskDatas", requestOptions)
      .then(function(response) {
        console.log(response.data);
        commit("temp", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  setTaskDatas({ commit }, tasks) {
    commit("setTaskDatas", tasks);
  },
  setDeleteTask({ commit }, { delTasks, isDelFlag }) {
    commit("setDeleteTask", { delTasks, isDelFlag });
  },
  delSelectedTasks({ commit }) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selected: state.delTasks })
    };
    axios
      .post("http://localhost:8080/api/task/deleteTaskDatas", requestOptions)
      .then(function(response) {
        commit("initialDeleteList");
        console.log("Deleted result", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  setInputSearch({ commit }, inputkey) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputkey: inputkey,
        authOwner: localStorage.getItem("ATHENTICATE_USER")
      })
    };
    axios
      .post("http://localhost:8080/api/task/inputSearch", requestOptions)
      .then(function(response) {
        console.log("setInputSearch", response);
        commit("temp", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  setWillEditData({ commit, dispatch }, willEditDataId) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ willEditDataId: willEditDataId })
    };
    axios
      .post("http://localhost:8080/api/task/setWillEditData", requestOptions)
      .then(function(response) {
        console.log(response);
        commit("setWillEditData", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

const mutations = {
  setWillEditData(state, willEditData) {
    state.willEditData = willEditData;
  },
  initialDeleteList(state) {
    state.delTasks = [];
  },
  delSelectedTasks(state) {},
  setDeleteTask(state, { delTasks, isDelFlag }) {
    // state.delTasks.push(delTasks);
    // if(isDelFlag) {
    //     if(!state.delTasks.includes(delTasks))
    //     {

    //         state.delTasks.push(delTasks);
    //     }
    // }  else {
    //     if(state.delTasks.includes(delTasks))
    //     {
    //         state.delTasks.splice(state.delTasks.indexOf(delTasks), 1);
    //     }
    // }

    if (!state.delTasks.includes(delTasks)) {
      state.delTasks.push(delTasks);
    } else {
      state.delTasks.splice(state.delTasks.indexOf(delTasks), 1);
    }
  },
  temp(state, tasks) {
    state.taskDatas = tasks;
  },
  setTaskDatas(state, tasks) {
    state.taskDatas = tasks;
  },
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  },
  registerRequest(state, user) {
    state.status = { registering: true };
  },
  registerSuccess(state, user) {
    state.status = {};
  },
  registerFailure(state, error) {
    state.status = {};
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
