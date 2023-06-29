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
1. 显示正确的HTML: 有input field,有reservation submit button,有reservation list 的标题
 
 工作内容:
    Service Form这个section HTML 完成
      -- input field HTML
      -- submit button HTML
    reservation/request list HTML
 
 工作steps:
   查看/编写 index.html
   查看/编写 renderMainContainerHTML()
   查看/编写 generateMainContainerHTML()
   查看/编写 generateServiceFormSectionHTML()

   暂时去掉invoke generateRequestListSectionHTML(),并debug直到HTML正常显示

   查看/补充 相关CSS, 确认大致格式正确

2. 保证在点击reservation/request submit button时, API中的request array被填充.(同步 章6)

 工作内容:
   为submit button 增加click event listener, 其中的callback function是 
   1. invoke函数:把transient state转为permanent state; 

      1. 如何保存transient state? -- const userInput={}
      前一书是在database中新建userChoice这个空的obj, 在eventlistener监控用户change后,用set*()函数把value传入userChoice

      这一书是不保存transient state到database,不用setter funtions,
      直接在callback function中, 新建userChoice/userInput这个obj, 把用户输入当作values,
      最后用postRequest(userChoice)来完成这个callback function.
      
      *发现:
         这里把用户输入当作values,但是其实都是string, 从database.json也可以看出来: 除了自动添加的id是int之外,其他都是string. 这就需要在后来引用的时候parseIn()或者new Date()
   
      2. 如何把transient state转为permanent state? -- invoke postRequest()
      前一书是用newOrder这个obj,把newOrder写进database.order
      并dispatch CustomEvent('stateChanged')来宣告这个过程的结束

      这一书是用fetch中的POST method,把newOrder这个obj(这一书是userRequest/userInput/DatafromInput)直接发到 `${API}/requests` 中, id会由JSON或fetch request自动生成, 而时间/日期是用户输入的一部分. 注意:全部input都是string.
      还是用了dispatch CustomEvent('stateChanged'),只是在最后的.then()中.

   2. re-renderHTML:这是最后CustomEvent要引发的, 这里要做的是: 为其增加一个eventlistener. 
      这是过渡步骤: 是为下一步做准备.

     (上一书教材中是在把transient state转为permanent state的函数中增加了stateChanged这个CustomEvent,并用一个独立的event listener来执行1.console.log 2.re-renderHTML)

     (我觉得可以合二为一; 但是可能是为了方便理解React, 我就练习这个吧)

     这一书: 一样的.

 工作steps:
   定义fetchRequests(): fetch database.json 到 applicationState, 第一步特指database.json中的requests; 
      在这之前先定义applicationState为空的obj(a transient database); API为http url;
   定义getRequests(): 仍然需要用它来把requests这个array传递到其他modules中.

3. 保证在点击reservation/request submit button时, request list显示正确.
 工作内容: 查看1. 如何fectch data 2. 如何generate HTML 给第二个section