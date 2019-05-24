# CountTime（倒计时）

### 参数 

1. time (必写)	: 
    > 目前只支持 小时(h) 分钟(m) 秒(s); 且不区分大小写

2. callback (可选) : 回调函数

3. initTime (可选) : 

    > 记录初始化这个组件的当前时间戳 ，单位为毫秒（时间戳）

### 属性  
1. targetTime : 记录目标时间

2. initTime :  记录初始时间 (一般用于需要再次进入该组件对应的页面时)

### 示例

```
<CountTime $id="countTime" initTime="1490347748133" time="3M" callback={this.fn1} />
```
















































