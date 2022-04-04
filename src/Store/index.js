import { combineReducers} from 'redux';

import { tarefasReducer } from './tarefasReducer';

const mainReducer = combineReducers({
  tarefas: tarefasReducer

});

export default mainReducer;