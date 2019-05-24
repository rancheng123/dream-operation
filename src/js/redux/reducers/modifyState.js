const modifyState = (state,action)=>{
  var modifyData = {},newState;

  if(!action.data){
      console.error('dispatch时,  请将数据 传入 data 字段 ')
  }


  if(action.reset){
    newState = action.data;
  }else{
    for(var key in action.data){
      modifyData[key] = action.data[key];
    }
    newState =  Object.assign({}, state, modifyData);
  }



  var timer = setTimeout(()=>{
    action.callback && action.callback()
    timer = null;
    clearTimeout(timer)
  },300)

  return newState;
}
export default modifyState;