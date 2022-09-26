import { createContext,useEffect,useReducer} from "react";
import { getData } from "../utils/fetchData";
import ACTIONS from "./Action";


import { reducers } from "./Reducer";

export const DataContext = createContext()

const DataProvider = ({children}) => {
   


    const initialState = {
        notify: {} , menuItems : [] 
    }
    const [state, dispatch] = useReducer(reducers,initialState);
    useEffect(()=>{
        getData('globalData')
        .then(res=>{

            
            dispatch({type:ACTIONS.ADD_MENU_ITEMS,payload:[...res.LastItems]})
        })
    },[])
  return (
      <DataContext.Provider value={{state,dispatch}}>
          {children}
      </DataContext.Provider>
  );
};

export default DataProvider;