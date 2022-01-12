import { TablePageState, ReducerAction } from "./types";

export const initialState: TablePageState = {
  loading: false,
  dataSource: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  error: null,
};

export function reducer(
  state: TablePageState,
  action: ReducerAction
): TablePageState {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "reslove":
      return {
        ...state,
        dataSource: action.payload.dataSource,
        pagination: action.payload.pagination,
      };
    case "reject":
      return {
        ...state,
        ...initialState,
      };
    case "finish":
      return {
        ...state,
        loading: false,
      };
    default:
      return initialState;
  }
}
