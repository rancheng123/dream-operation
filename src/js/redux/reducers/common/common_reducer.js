import modifyState from '../modifyState';
const initState = {
  userInfo: {
    name: 'undefined',
    nation: ''
  },
  // 城市楼盘场地 原始数据
  cityPropertySite: null,
  // 城市楼盘场地 及联菜单数据 数组
  cityPropertySiteData: null,
  token : '',
  loadingStatus: false,
};

export const common = (state=initState ,action) => {
  switch(action.type){
    case 'modifyCommonData':
      return modifyState(state,action);
    default:
      return state;
  }
};








