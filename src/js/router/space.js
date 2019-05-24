import { Redirect, Route } from "react-router";
import React from "react";

const system = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/system').default)
    }, 'system')
}
const space_build_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_build_list/space_build_list').default)
    }, 'space_build_list')
}
const space_build_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_build_add/space_build_add').default)
    }, 'space_build_add')
}


const space_location_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_location_list/space_location_list').default)
    }, 'space_location_list')
}
const space_location_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_location_add/space_location_add').default)
    }, 'space_location_add')
}


const space_station_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_station_list/space_station_list').default)
    }, 'space_station_list')
}
const space_station_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_station_add/space_station_add').default)
    }, 'space_station_add')
}



const space_room_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_room_list/space_room_list').default)
    }, 'space_room_list')
}
const space_room_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_room_add/space_room_add').default)
    }, 'space_room_add')
}



const space_owner_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_owner_list/space_owner_list').default)
    }, 'space_owner_list')
}
const space_owner_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_owner_add/space_owner_add').default)
    }, 'space_owner_add')
}


const space_main_list = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_main_list/space_main_list').default)
    }, 'space_main_list')
}
const space_main_add = (location, callback) => {
    require.ensure([], require => {
        callback(null, require('../page/space/space_main_add/space_main_add').default)
    }, 'space_main_add')
}



export default (
    <React.Fragment>
        <Redirect from="space" to='space/build/list'></Redirect>
        <Redirect from="space/build" to='space/build/list'></Redirect>
        <Redirect from="space/location" to='space/location/list'></Redirect>
        <Redirect from="space/station" to='space/station/list'></Redirect>
        <Redirect from="space/room" to='space/room/list'></Redirect>
        <Redirect from="space/owner" to='space/owner/list'></Redirect>
        <Redirect from="space/main" to='space/main/list'></Redirect>
        {/*<Route title="场地管理" path="space" hiddenLink={true} getComponent={system} >*/}

        {/*    <Route title="场地管理" path="location/list" getComponent={space_location_list} ></Route>*/}
        {/*    <Route title="工位管理" path="/space/station/list" getComponent={space_station_list}></Route>*/}
        {/*    <Route title="房间管理" path="/space/room/list" getComponent={space_room_list}></Route>*/}
        {/*    <Route title="业主管理" path="/space/owner/list" getComponent={space_owner_list}></Route>*/}
        {/*    <Route title="主体管理" path="/space/main/list" getComponent={space_main_list}></Route>*/}
        {/*</Route>*/}

        <Route title="场地管理" hiddenLink={true} path="space" getComponent={system}>
            <Route title="楼盘管理" path="build" getComponent={system}>
                <Route path="list" getComponent={space_build_list} ></Route>
                <Route title={JSON.stringify({
                    type: {
                        new: '新建楼盘',
                        edit: '编辑楼盘',
                        look: '查看楼盘'
                    }
                })} path="add" getComponent={space_build_add}></Route>
            </Route>
            <Route title="场地管理" path="location" getComponent={system}>
                <Route path="list" getComponent={space_location_list} ></Route>
                <Route title={JSON.stringify({
                    type: {
                        new: '新建场地',
                        edit: '编辑场地',
                        look: '查看场地'
                    }
                })} path="add" getComponent={space_location_add}></Route>
            </Route>
            <Route title="工位管理" path="station" getComponent={system}>
                <Route path="list" getComponent={space_station_list} ></Route>
                <Route title={JSON.stringify({
                    type: {
                        new: '新建工位',
                        edit: '编辑工位',
                        look: '查看工位'
                    }
                })} path="add" getComponent={space_station_add}>
                </Route>
            </Route>
            <Route title="房间管理" path="room" getComponent={system}>
                <Route path="list" getComponent={space_room_list} ></Route>
                <Route title={JSON.stringify({
                    type: {
                        new: '新建房间',
                        edit: '编辑房间',
                        look: '查看房间'
                    }
                })} path="add" getComponent={space_room_add}>
                </Route>
            </Route>
            <Route title="业主管理" path="owner" getComponent={system}>
                <Route path="list" getComponent={space_owner_list} ></Route>
                <Route title={JSON.stringify({
                    type: {
                        new: '新建业主',
                        edit: '编辑业主',
                        look: '查看业主'
                    }
                })} path="add" getComponent={space_owner_add} >
                </Route>
            </Route>
            <Route title="主体管理" path="main" getComponent={system}>
                <Route path="list" getComponent={space_main_list} ></Route>
                <Route title={JSON.stringify({
                    type: {
                        new: '新建主体',
                        edit: '编辑主体',
                        look: '查看主体'
                    }
                })} path="add" getComponent={space_main_add}>
                </Route>
            </Route>
        </Route>
    </React.Fragment>
)
