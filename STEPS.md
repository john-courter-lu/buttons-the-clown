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

# 章5 拒绝预约 DELETE method
 1. 创建button "Deny", 保证button的id中包含request-id
 2. 为button创建a click event listener, 来删除这个Reservations

 3. 在dataAccess.js中用DELETE method, 注意一次删除一个,明确id

# 章6 完成预约 Completion 主题:dropdown 或a select element
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

         用chatGPT增加的obj中,数字没有加引号,但不影响用${}正确显示到HTML中.
   
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
   1. fetch data
      很简单, 只要用fetch().then().then()最后的括号中是callback function,把fetchedData写道applicationState这个瞬态的database中

      但还是要有getter functions从这个瞬态database中读取arrays
   2. generate HTML 给第二个section
   3. generate mainContainHTML 要加入fetch, 保证与最新database同步. 
      问题: 这里用了then()来和 mainContainer.innerHTML = generateHTML() 连接.
            是因为fetchRequests()即使是函数, 仍然保留了fetch的特质吗?
   4. debug
      fetchRequests() = undefined
      答案: 在fetch().then().then()之前要加return,也就是说这不是一个函数, 而是?
      问题: 要再看fetch() syntax 它究竟返回什么?
   5. CSS for ul 和 li
   6. debug 为了improvement
      1. 成功: fetchRequests 模式化到fetchResources. 加入一个parameter来输入所需数组名字的string即可. 同时用braket notation来给applicationState(瞬态database)增加新array
      2. 失败: 把fetchRequest当函数,而不用.then()来和下一句code连接
      3. 成功: 不管database.json里的数字是直接显示还是用""作为string显示,都不影响HTML生成.
         (估计是HTML本身就是Markup Language, 本身就全是strings)
         (要在js中引用时,可能就要注意数据格式了.)

4. 有删除按钮,同时点击删除时,执行DELETE method,从database.json中删除这个request
   1. 在HTML中,增加DELETE按钮
      1. 
      按钮加在<li></li>中. 但是<button> tag内要写什么?
      答案取决于我button 的 click events: delete 这个request. 所以我需要 id="delete-{request.id}"
      2. 
      CSS delete button
      把li中的三个元素用flex space-between来排列;
      对文字用<p></p>来包围住,同时指定格式来固定三个元素的绝对位置

   2. 为这个按钮增加click event listener, callback function是fetch: DELETE, 估计最后也要dispatch "stateChanged"
      1. event listener
      2. deleteRequest 注意: 1 有parameter 2. fetch的url中有requests/id

   3. debug 为了改进
      1. 成功. 
      2. 可选: 用dataset.id在click events中.测试出错. 看book4 self assessment
      3. 成功: 需要固定delete button和dropdown control两个的高度, 在放缩时, p显示为多行时, 保证样式统一.
      4. 成功: 需要加入一行说明 Description ; Completed By; 同时每一行之前用一个🤡emoji.
         解答: 增加一个<li></li> 里面两个<h3>, class要写一下, 为了格式. 
         格式做成justify-content:left; li :first-child{flex-basis:60%} 背景色也改一下.


5. 有dropdown control/element. 功能: 用户选择时,把这个request加入completions array.
   1. HTML中增加这个elements
   2. 考虑"change" events的event listener
      如何把这个增加进去? 需要在其中收集用户选择到一个空的obj中, 再用 postCompletion去post it.
      
      发现: select和option的配合中,在eventlistener里只能用id 和 value来读取数据.
      考虑: 第一步先不涉及读取clowns这个database的array,直接把它们的id hard coded
      
   3. 在database.json中检查是否post成功.
   4. debug
      1. 成功: 把postCompletion和postRequest合二为一,只需要增加一个parameter
      2. 成功: 去掉select,如果request已经完成了的话.(发现book6的self-assessment没有任何code的提示,所以还是要自己想办法)
         首先在render html前要fetch最新数据:
            fetchResources('requests')
            .then(() => {fetchResources('completions')}) 
            这里会出错. 因为arrow function 要么在大括号中写code,要么直接在arrow后面写function.
         正确写法:
            fetchResources('requests')
            .then(() => fetchResources('completions'))


      然后,要设置正确的conditional
         看看能不能找回符合条件的obj: 用some , 返回值是true or false
            const foundCompletion = completions.some(obj => Number(obj.requestId) === request.id)

            if (foundCompletion === true) 

         或者用.find() 但是在if里不能用==true或=== true:

            const foundCompletion = completions.find(obj => Number(obj.requestId) === request.id)

            if (foundCompletion) 

      3. 成功: 取消hard-coded clown.id : 读取clowns这个database的array,map它们的id到select-option中. 这里需要render前的fetchClowns, map前的getClowns, 和.map().join()
      4. 成功: 必做: requests要按照时间排序. 
         解答: 在生成HTML的函数中 requests.map()之前用requests.sort()
      5. 可选: Modify the getRequests() method in the data access module to return an array of service request objects that are sorted by their completion status.
         解答: function compareNumbers(a, b) {
                     return a - b;
                     }
               .sort(compareNumbers)
               可以完成array数字从小到大排列.

               const numbers = [3, 1, 4, 1, 5];
               // [...numbers] creates a shallow copy, so sort() does not mutate the original
               const sorted = [...numbers].sort((a, b) => a - b);

               .sort((a, b) => a - b) 和 .sort((a, b) => (a < b ? -1 : 0)) 都会把小的数排到前面

               the compareFunction needs to return -1,0, or 1,
               但用boolean对比时 用Number() 就会convert false into 0 and true into 1 ,
               用 .sort((a, b) => a - b) 结果一般时fasle在前面,true在后面.
         成功: 更新了getRequests(),在其中先根据date来sort,后根据是否能在completions数组里找到它,来给request加一个property: completed: true or false; 然后根据completed的大小来排序(false是0, true是1 ).
               同时修改了HTML map()中直接用completed property来对比.
         
         反思: 也可以在做ERD的时候,request就应该有一个property: completed: true or false.默认为false.
               在给database.json传递input时,就要把这个加上.
               在select change时,把相应的request的 completed改为true. 
               但问题: 这除了post to completions,还要修改database中的requests, 可以用POST实现吗? 待证实.
               也思考: 估计没有修改的method, 因为不希望有人修改database.json.中的某个property的某个值.
       6. completed taks的背景色改变.
         解答: 在completed list HTML 中加入class. 在css中设置这个class的background.
