import {Component} from "react";
import React from "react";
import {Icon, Popconfirm, Popover, Switch} from 'antd';
import utils from "../../../asset";

/**
 * 标签处理
 */
class ActionList extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                  <span style={{marginRight:'15px'}}>
                      <Icon
                          type="eye"
                          style={{color: '#0179FF' }}
                          onClick={()=>{
                              utils.Router.switchRoute('/space/station/detail?id='+ buildItem.id)
                          }}
                      />
                  </span>
                  <span style={{marginRight:'15px'}}>
                        <Icon
                            type="edit"
                            style={{color: '#44D7B6'}}
                            onClick={()=>{
                                utils.Router.switchRoute('/space/station/add?id='+ buildItem.id)
                            }}
                        />
                  </span>
                  <span style={{marginRight:'15px'}}>
                      <Popconfirm
                          title="您确定删除吗?"
                          onConfirm={()=>{
                              this.delete([buildItem.id])
                          }}
                          //onCancel={cancel}
                          okText="是"
                          cancelText="不"
                      >

                          <Icon
                              type="delete"
                              style={{color: '#FF7E7E'}}
                          />
                      </Popconfirm>
                  </span>

                  <span style={{marginRight: '15px'}}>
                      <Popover
                          content={(
                              <React.Fragment>
                                  {/*0启用  1停用*/}
                                  <Switch
                                      defaultChecked={buildItem.station_disabled_id == 0 ? true : false}
                                      onChange={(status) => {
                                          this.updateLocation({
                                              id: buildItem.id,
                                              disabled_id: status
                                          })
                                      }}
                                  />
                              </React.Fragment>
                          )}
                      >
                          更多
                      </Popover>
                  </span>

            </div>

        )
    }
}
export default ActionList