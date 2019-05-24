
//react 12345
import React from 'react'
import { render } from 'react-dom'

//组件管理器
import {} from './config';





import { Provider } from 'react-redux';
import ReduxStore from './redux/redux'


import renderRouter from './router/index-result'

// import CreateDevTools from './redux/devTools/devTools'


//引入蚂蚁金服配置
import Anti from './anti'
import '../style/common.scss'


// 111
render((
  <Provider store={ReduxStore}>
    <div>
      <Anti>
        {renderRouter()}
      </Anti>
      {/* <CreateDevTools /> */}
    </div>
  </Provider>
), document.getElementById('app'));


