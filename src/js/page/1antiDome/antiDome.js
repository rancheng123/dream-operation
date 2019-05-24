import React, {Component, PropTypes} from 'react';



//自定义组件（对于anti-design 的二次封装）  start
import PicturesWall from '../../widget/upload/upload'
import MxjCarousel from '../../widget/mxjCarousel/mxjCarousel'

import WrappedHorizontalLoginForm from './formDome'
//自定义组件（对于anti-design 的二次封装）  end



import moment from 'moment';
import {
    Button,
    Radio,
    Icon,
    Breadcrumb,
    Layout,
    Menu,
    Dropdown,
    Pagination,
    Steps,
    AutoComplete,
    Checkbox,
    Cascader,
    DatePicker,
    InputNumber,
    Input,
    Rate,
    Switch,
    Slider,
    Select,
    TimePicker,
    Avatar,
    Badge,
    Collapse,
    Empty,
    Popover,
    Tree,
    Tooltip,
    Timeline,
    Tag,
    Tabs,
    Modal,
    Progress,
    Popconfirm,
    Spin,
    BackTop,
    Divider,
} from 'antd';
import {connect} from "react-redux";
import {antiDome} from "./antiDome_reducer";




const Step = Steps.Step;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;




class AntiDesignDome extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    onRadioChange(e) {
        this.props.antiDome.radioOpts.value = e.target.value
        this.props.dispatch({
            type: 'antiDomeData',
            data: {
                radioOpts: this.props.antiDome.radioOpts
            }
        })
    }

    render() {
        var that = this;


        return (
            <div style={{padding: '100px'}}>


                <div className={'uiModule'}>
                    <div>form 表单提交（还有问题）</div>


                    <WrappedHorizontalLoginForm></WrappedHorizontalLoginForm>
                </div>



                <div className='uiModule'>
                    <div>Button</div>

                    <Button
                        type="primary"
                        loading={true}

                        //large default small
                        size="default"

                        //disabled
                        icon="cloud-download"
                        onClick={() => {
                            alert(1)
                        }}


                    >Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </div>


                <div className='uiModule'>
                    <div>Radio</div>


                    <Radio.Group value={that.props.antiDome.radioOpts.value} onChange={that.onRadioChange.bind(that)}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                </div>


                <div className={'uiModule'}>
                    <div>Icon</div>

                    <Icon type="home"/>
                    <Icon type="setting" theme="filled"/>
                    <Icon type="smile" theme="outlined"/>
                    <Icon type="sync" spin/>
                    <Icon type="smile" rotate={180}/>
                    <Icon type="loading"/>
                </div>


                <div className={'uiModule'}>
                    <div>Breadcrumb</div>


                    <Breadcrumb>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                        <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item>
                    </Breadcrumb>
                </div>


                <div className={'uiModule'}>
                    <div>Menu</div>

                    {(() => {
                        const menu = (
                            <Menu>
                                <Menu.Item>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st
                                        menu item</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd
                                        menu item</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd
                                        menu item</a>
                                </Menu.Item>
                            </Menu>
                        );

                        return (
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#">
                                    Hover me <Icon type="down"/>
                                </a>
                            </Dropdown>
                        )
                    })()}

                </div>

                <div className={'uiModule'}>
                    <div>Pagination</div>

                    <Pagination
                        defaultCurrent={6}
                        total={500}
                        pageSize={10}
                        onChange={(page, pageSize) => {
                            alert(page)
                        }}
                    />
                </div>


                <div className={'uiModule'}>
                    <div>Steps</div>

                    <Steps
                        current={1}
                        direction="vertical"
                    >
                        <Step title="Finished"
                              description="This is a description."
                        />
                        <Step title="In Progress"
                              description="This is a description."
                        />
                        <Step title="Waiting"
                              description="This is a description."
                        />
                    </Steps>
                </div>


                <div className={'uiModule'}>
                    <div>AutoComplete</div>

                    <AutoComplete
                        dataSource={that.props.antiDome.autoCompleteOpts.dataSource}
                        style={{width: 200}}
                        onSelect={(value) => {
                            console.log('onSelect', value);
                        }}
                        onSearch={(value) => {


                            that.props.antiDome.autoCompleteOpts.dataSource = !value ? [] : [
                                value,
                                value + value,
                                value + value + value,
                            ];
                            that.props.dispatch({
                                type: 'antiDomeData',
                                data: {
                                    autoCompleteOpts: that.props.antiDome.autoCompleteOpts
                                }
                            })


                        }}
                        placeholder="input here"
                    />
                </div>


                <div className={'uiModule'}>
                    <div>Checkbox</div>

                    <Checkbox
                        checked={true}
                        onChange={(e)=>{
                            console.log(`checked = ${e.target.checked}`)
                        }}
                    >
                        Checkbox</Checkbox>
                </div>


                <div className={'uiModule'}>
                    <div>Cascader</div>

                    {(()=>{
                        const options = [{
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [{
                                value: 'hangzhou',
                                label: 'Hangzhou',
                                children: [{
                                    value: 'xihu',
                                    label: 'West Lake',
                                }],
                            }],
                        }, {
                            value: 'jiangsu',
                            label: 'Jiangsu',
                            children: [{
                                value: 'nanjing',
                                label: 'Nanjing',
                                children: [{
                                    value: 'zhonghuamen',
                                    label: 'Zhong Hua Men',
                                }],
                            }],
                        }];
                        return (
                            <Cascader
                                style={{width: '300px'}}
                                options={options}
                                onChange={(value)=>{
                                    console.log(value);
                                }}
                            ></Cascader>
                        )
                    })()}

                </div>





                <div className={'uiModule'}>
                    <div>DatePicker</div>

                    <DatePicker onChange={(date, dateString)=>{
                        console.log(date, dateString)
                    }} />
                    <br />
                    <MonthPicker onChange={(date, dateString)=>{
                        console.log(date, dateString)
                    }} placeholder="Select month" />
                    <br />
                    <RangePicker onChange={(date, dateString)=>{
                        console.log(date, dateString)
                    }} />
                    <br />
                    <WeekPicker onChange={(date, dateString)=>{
                        console.log(date, dateString)
                    }} placeholder="Select week" />
                </div>








                <div className={'uiModule'}>
                    <div>InputNumber</div>

                    <InputNumber min={1} max={10} defaultValue={3} onChange={(value)=>{
                        console.log('changed', value);
                    }} />,

                </div>


                <div className={'uiModule'}>
                    <div>Input</div>

                    <Input placeholder="Basic usage"
                           onChange={(value)=>{

                           }}
                    />

                </div>


                <div className={'uiModule'}>
                    <div>Rate</div>

                    <Rate
                        onChange={(value)=>{
                            console.log(value)
                        }}
                        onHoverChange={(value)=> {
                            console.log(value)
                        }}
                    />

                </div>



                {(()=>{
                    const RadioGroup = Radio.Group;
                    return (
                        <div className={'uiModule'}>
                            <div>Radio</div>

                            <RadioGroup onChange={(e)=>{
                                console.log('radio checked', e.target.value);
                                this.setState({
                                    value: e.target.value,
                                });
                            }} value={3}>
                                <Radio value={1}>A</Radio>
                                <Radio value={2}>B</Radio>
                                <Radio value={3}>C</Radio>
                                <Radio value={4}>D</Radio>
                            </RadioGroup>

                        </div>
                    )
                })()}





                <div className={'uiModule'}>
                    <div>Switch</div>

                    <Switch checked={false} onChange={(checked)=>{
                        console.log(`switch to ${checked}`);
                    }} />

                </div>


                <div className={'uiModule'}>
                    <div>Slider</div>

                    <Slider defaultValue={30} disabled={false} />
                    <Slider range defaultValue={[20, 50]} disabled={false} />


                </div>


                <div className={'uiModule'}>
                    <div>Select</div>

                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={(value)=>{
                        console.log(`selected ${value}`);
                    }}>
                        <Select.Option value="jack">Jack</Select.Option>
                        <Select.Option value="lucy">Lucy</Select.Option>
                        <Select.Option value="disabled" disabled>Disabled</Select.Option>
                        <Select.Option value="Yiminghe">yiminghe</Select.Option>
                    </Select>

                </div>







                <div className={'uiModule'}>
                    <div>TimePicker</div>

                    <TimePicker onChange={(time, timeString)=>{
                        console.log(time, timeString);
                    }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />

                </div>






                <div className={'uiModule'}>
                    <div>Upload</div>

                    <PicturesWall></PicturesWall>

                </div>





                <div className={'uiModule'}>
                    <div>头像</div>

                    <Avatar size={64}
                            src={'https://bpic.588ku.com/element_banner/20/19/03/14de6d2572f6a0b09bcc036ca05359a4.jpg'}
                    />
                    <Avatar size="large" icon="user" />
                    <Avatar icon="user" />
                    <Avatar size="small" icon="user" />

                </div>


                <div className={'uiModule'}>
                    <div>徽标数</div>

                    <Badge count={1000} overflowCount={999}>
                        <a href="#" className="head-example"
                           style={{
                               width: '100px',
                               height: '25px',
                               display: 'inline-block',
                               background: 'greenyellow'
                           }}
                        />
                    </Badge>

                </div>





                <div className={'uiModule'}>
                    <div>折叠板</div>

                    <Collapse defaultActiveKey={['1']} onChange={(key)=>{
                        console.log(key);
                    }}>
                        <Collapse.Panel header="This is panel header 1" key="1">
                            <p>{'11111222222'}</p>
                        </Collapse.Panel>
                        <Collapse.Panel header="This is panel header 2" key="2">
                            <p>{'11111222222'}</p>
                        </Collapse.Panel>
                        <Collapse.Panel header="This is panel header 3" key="3" disabled>
                            <p>{'11111222222'}</p>
                        </Collapse.Panel>
                    </Collapse>


                </div>



                <div className={'uiModule'}>
                    <div>走马灯</div>


                    <MxjCarousel></MxjCarousel>
                </div>



                <div className={'uiModule'}>
                    <div>暂无数据</div>


                    <Empty
                        description={'暂无数据'}
                    />
                </div>





                {(()=>{
                    const content = (
                        <div>
                            <p>Content</p>
                            <p>Content</p>
                        </div>
                    );

                    return (
                        <div className={'uiModule'}>
                            <div>气泡提示</div>


                            <Popover content={content} title="Title">
                                <Button type="primary">Hover me</Button>
                            </Popover>
                        </div>
                    )
                })()}







                <div className={'uiModule'}>
                    <div>Tree</div>


                    <Tree
                        checkable
                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={(selectedKeys, info)=>{
                            console.log('selected', selectedKeys, info);
                        }}
                        onCheck={(checkedKeys, info)=>{
                            console.log('onCheck', checkedKeys, info);

                        }}
                    >
                        <Tree.TreeNode title="parent 1" key="0-0">
                            <Tree.TreeNode title="parent 1-0" key="0-0-0" >
                                <Tree.TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                                <Tree.TreeNode title="leaf" key="0-0-0-1" />
                            </Tree.TreeNode>
                            <Tree.TreeNode title="parent 1-1" key="0-0-1">
                                <Tree.TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                            </Tree.TreeNode>
                        </Tree.TreeNode>
                    </Tree>
                </div>



                <div className={'uiModule'}>
                    <div>Tooltip</div>


                    <Tooltip title="prompt text">
                        <span>hover  显示气泡提示</span>
                    </Tooltip>
                </div>


                <div className={'uiModule'}>
                    <div>Timeline</div>


                    <Timeline>
                        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                    </Timeline>
                </div>



                <div className={'uiModule'}>
                    <div>Tag</div>


                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="lime">lime</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>

                </div>



                <div className={'uiModule'}>
                    <div>Tabs</div>


                    <Tabs defaultActiveKey="1" onChange={(key)=>{
                        console.log(key);
                    }}>
                        <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
                        <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
                        <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
                    </Tabs>

                </div>







                <div className={'uiModule'}>
                    <div>Modal</div>


                    <Modal
                        title="Basic Modal"
                        visible={false}
                        onOk={(e)=>{
                            console.log(e);
                            this.setState({
                                visible: false,
                            });
                        }}
                        onCancel={(e)=>{
                            console.log(e);
                            this.setState({
                                visible: false,
                            });
                        }}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>


                    <div onClick={()=>{




                        Modal.confirm({
                            title: 'Confirm',
                            content: '确定这样做吗？',
                            okText: '确认',
                            cancelText: '取消',
                        });
                    }}>
                        confirm click
                    </div>

                    <div onClick={()=>{
                        Modal.info({
                            title: '提示',
                            content: (
                                <div>
                                    <p>some messages...some messages...</p>
                                    <p>some messages...some messages...</p>
                                </div>
                            ),
                            onOk() {},
                        });
                    }}>
                        info click
                    </div>

                </div>







                <div className={'uiModule'}>
                    <div>Progress</div>


                    <Progress percent={30} />
                    <Progress percent={50} status="active" />
                    <Progress percent={70} status="exception" />
                    <Progress percent={100} />
                    <Progress percent={50} showInfo={false} />

                </div>


                <div className={'uiModule'}>
                    <div>气泡提示确认框</div>


                    <Popconfirm title="Are you sure delete this task?"
                                onConfirm={(e)=>{
                                    console.log(e);
                                }} onCancel={(e)=>{
                        console.log(e);
                    }}
                                okText="Yes"
                                cancelText="No">
                        <a href="#">Delete</a>
                    </Popconfirm>
                </div>



                <div className={'uiModule'}>
                    <div>loading状态</div>


                    <Spin />
                </div>




                <div className={'uiModule'}>
                    <div>BackTop</div>


                    <BackTop />
                    <div>
                        backTop  在我们的屏幕右下角嗷
                    </div>
                </div>






                <div className={'uiModule'}>
                    <div>分割线</div>


                    <Divider />
                    <Divider>With Text</Divider>
                    <Divider dashed />

                </div>












            </div>
        )
    }

}

export default connect(function (state) {
    return {

        antiDome: state.antiDome
    };
})(AntiDesignDome);