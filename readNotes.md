# 章1 客户要求
问题: 要按照date的closest排序怎么实现?

# 章2 ERD

# 章3 预定小丑
## set up 
 1. 创建a directory structure
 2. 添加resource arrays 到 database.json; 全部用空的数组
 3. 在terminal中启用json-server 
    问题: json-server问题仍然存在,期待重启terminal

## user input
 1. 为input fields创建html generating function
 2. 在dataAccess.js中创建函数
    来POST用户选择(a reservation/transient state object)到API(permanent state)
 3. 创建 event listener,
    来保证提交reservation时,完成从transient到permanent的全过程

# 章4 显示Reservations 主题:Fetch Before Display
 1. 建立一个函数, 来从API中fetch 永久state of reservations
 2. 在HTML生成和rendered之前, 需要invoke这个函数

 3. 建立一个函数,getter function,从applicationState提取request
 4. 在HTML生成module中,用getter function加上.map()功能来生成HTML

# 章5 拒绝预约
 1. 创建button "Deny", 保证button的id中包含request-id
 2. 为button创建a click event listener, 来删除这个Reservations

 3. 在dataAccess.js中用DELETE method, 注意一次删除一个,明确id

# 章6 Completion 主题:dropdown 或a select element
 1. html中增加这个element. 注意option后面的value中既有job的id又有people的id
 2. 为其建立a change event listener.其中的callback function是create a new state object, and then send that state to a function in your data access module which will POST it to the API.

# 结束 
## 我要补充: 完成的Reservations不再显示the select element
## 如何按照日期排序;如何把完成的自动排到最后;

# 工作stages
1. 显示正确的HTML: 有input,有reservation submit button,有reservation list 的标题
    1. input HTML
    