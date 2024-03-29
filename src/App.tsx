import React, {createContext, useReducer} from 'react';
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home";
import { CreatePost } from './CreatePost';
import { Details } from './Details';
import { UserDetails } from './UserDetails';
import { NotFound } from './NotFound';
import { Provider } from 'react-redux';
import { store } from './Store';
import { ReduxElement } from './ReduxElement';
export interface DetailsState extends Record<string, any>{
        "name": string,
        "age": number,
        "office": string,
        "id":  number,
        
}

export interface TableState{
    data: DetailsState[],
    error:{error:boolean, msg: string|null},
    loading:boolean
};

export type DispatcherType=React.Dispatch<{
        type: string; 
        payload: TableState;
    }>


export type ContextType={
    tableState:TableState,
    dispatcher:DispatcherType
}




const reducer = (state:TableState, actions:{type:string, payload:TableState}) : TableState =>{
        switch (actions.type){
            case "UPDATE":{return actions.payload;};
            default:{
                return {
                    data:[],
                    error:{error:false, msg: null},
                    loading:true
            };
        }
    }
}

export const contextProvider = createContext<ContextType>(null as unknown as ContextType);



function App() {
    const [tableState,dispatcher] = useReducer(reducer,
        {
            data:[],
            error:{error:false, msg: null},
            loading:true
        });
    
    
      
    return(
        <Provider store={store}>
        <contextProvider.Provider value={{tableState, dispatcher}}>
            <Nav/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/details' element={<Details/>}/>
                    <Route path='/details/:id' element={<UserDetails/>}/>
                    <Route path='/create' element={<CreatePost/>}/>
                    <Route path='/redux' element={<ReduxElement/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            <Footer/>
        </contextProvider.Provider>
        </Provider>
    )
}

export default App;
