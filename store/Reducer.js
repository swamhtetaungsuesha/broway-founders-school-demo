import ACTIONS from "./Action";

export const reducers =(state,action) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return { ...state, notify:action.payload };
    case ACTIONS.ADD_MENU_ITEMS:
      return { ...state, menuItems:action.payload };
    default:
      return state;
  }
};