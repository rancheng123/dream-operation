import { combineReducers } from 'redux';
import { common }  from './common/common_reducer';
import { home_a }  from '../../page/home_a/home_a_reducer';
import { antiDome }  from '../../page/1antiDome/antiDome_reducer';

import space from './space'

import goods from './goods'

import checks from './checks'

import organize from './organize'

import order from './order'

import financial from './financial'

import contract from './contract'

//合并reducers
const reducers = combineReducers({
  common,
  home_a,
  antiDome,
  ...space,
  ...goods,
  ...order,
  ...financial,
  ...checks,
  ...organize,
  ...order,
  ...contract
});
export default reducers;








