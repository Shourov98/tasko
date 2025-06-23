"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import api from "@/lib/api";

const TaskCtx = createContext();
export const useTasks = () => useContext(TaskCtx);

const initial = { list: [], loading: true, error: null, filter: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOADED":
      return { ...state, list: action.payload, loading: false };
    case "ADD":
      return { ...state, list: [action.payload, ...state.list] };
    case "UPDATE":
      return {
        ...state,
        list: state.list.map((t) => (t.id === action.payload.id ? action.payload : t)),
      };
    case "DELETE":
      return { ...state, list: state.list.filter((t) => t.id !== action.payload) };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // load once
  useEffect(() => {
    api.get("/api/tasks").then(({ data }) => dispatch({ type: "LOADED", payload: data }));
  }, []);

  /* --------- helpers used by pages/components --------- */
  const createTask = async (body) => {
    const { data } = await api.post("/api/tasks", body);
    dispatch({ type: "ADD", payload: data });
    return data;
  };

  const updateTask = async (id, body) => {
    const { data } = await api.patch(`/api/tasks/${id}`, body);
    dispatch({ type: "UPDATE", payload: data });
    return data;
  };

  const deleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    dispatch({ type: "DELETE", payload: id });
  };

  const getTask = (id) => state.list.find((t) => t.id === id);

  const setFilter = (payload) => dispatch({ type: "SET_FILTER", payload }); 

  return (
    <TaskCtx.Provider value={{ ...state, createTask, updateTask, deleteTask, getTask, setFilter }}>
      {children}
    </TaskCtx.Provider>
  );
}
