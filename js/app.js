;(function () {

	const todos = [
		{
			id: 1,
			title: '吃饭',
			completed: true
		},
		{
			id: 2,
			title: '睡觉',
			completed: true
		},
		{
			id: 3,
			title: '敲代码',
			completed: false
		},
	]

	new Vue({
		data:{
			todos,
			currentEditing: null
		},

		// 计算属性是 Vue 提供的一大特色
	    // 顾名思义：一种带有行为的属性，本质是方法，但是不能当作方法来调用，必须当作属性来使用
	    // 它相比方法的优势就在于会缓存计算的结果，效率很高
	    // 计算属性只能当作属性来使用，不能用于事件处理函数
		computed: {
		  // 该成员就是一个方法，但是在使用的时候必须当作属性来用，不能调用
	      // 简写方式，一个函数，作为 get 方法
	      // remaningCount () {
	      //   console.log('remaningCount 属性方法被调用了')
	      //   return this.todos.filter(t => !t.completed).length
	      // }
	      remaningCount: {
	        // 当你访问 remaningCount 会自动调用 get 方法
	        get () {
	          return this.todos.filter(t => !t.completed).length
	        },
	        // 当你 实例.remaningCount = xxx 的时候会自动调用 set 方法
	        // 注意：这里只是为了演示语法
	        set () {
	          console.log('remaningCount 的 set 方法被调用了')
	        }
	      },

	      toggleAllStat: {
	        get () {
	          // 计算属性知道它依赖了 todos
	          // 当 todos 发生变化，计算属性会重新计算
	          return this.todos.every(t => t.completed)
	        },
	        set () {
	          // 表单控件 checkbox 双向绑定了 toggleAllStat
	          // 所以 checkbox 的变化会调用 set 方法
	          // 在 set 方法中我们要做的就是
	          //    1. 得到当前 checkbox 的选中状态
	          //    2. 把所有任务项的选项状态都设置为 toggle-all 的选中状态

	          // 在自己的 set 方法中访问自己就是调用自己 get 方法
	          // console.log(this.toggleAllStat)
	          const checked = !this.toggleAllStat
	          this.todos.forEach(item => {
	            item.completed = checked
	          })
	        }
	      },

		},

		methods: {
			handleNewTodoKeyDown(e) {
		        // 0. 注册按下的回车事件
		        // 1. 获取文本框的内容
		        // 2. 数据校验
		        // 3. 添加到 todos 列表
		        // 4. 清空文本框
		        // console.log(this.todoText)
		        const target = e.target
		        const value = target.value.trim()
		        if (!value.length) {
		          return
		        }
		        const todos = this.todos
		        todos.push({
 				  // 如果数组是空的就给 1 ，否则就是最后一个元素的 id + 1
          		  id: todos.length ? todos[todos.length - 1].id + 1 : 1,
		          title: value,
		          completed: false
		        })
		        target.value = ''
	      	},

	      	handleToggleAllChange(e) {
		        // 0. 绑定 checkbox 的 change 事件
		        // 1. 获取 checkbox 的选中的状态
		        // 2. 直接循环所有的子任务项的选中状态设置为 toggleAll 的状态
		        const checked = e.target.checked
		        this.todos.forEach(item => {
		          item.completed = checked
		        })
		    },

		    handleRemoveTodoClick(index, e) {
		        this.todos.splice(index, 1)
		    },

		    handleGetEditingDblclick(todo) {
		        // 把这个变量等于当前双击的 todo
		        this.currentEditing = todo
	      	},

	      	// 编辑任务，敲回车保存编辑
	      	handleSaveEditKeydown(todo, index, e) {
		        // 0. 注册绑定事件处理函数
		        // 1. 获取编辑文本框的数据
		        // 2. 数据校验
		        //    如果数据是空的，则直接删除该元素
		        //    否则保存编辑
		        const target = e.target
		        const value = target.value.trim()

		        // 数据被编辑为空的了，直接删除
		        if (!value.length) {
		          this.todos.splice(index, 1)
		        } else {
		          todo.title = value
		          this.currentEditing = null
		        }
	      	},

	      	handleCancelEditEsc() {
		        // 1. 把样式给去除
		        this.currentEditing = null
	      	},

	      	handleClearAllDoneClick() {
		        // 错误的写法
		        // this.todos.forEach((item, index) => {
		        //   if (item.completed) {
		        //     this.todos.splice(index, 1)
		        //   }
		        // })

		        // 手动控制遍历索引的方式
		        // for (let i = 0; i < this.todos.length; i++) {
		        //   if (this.todos[i].completed) {
		        //     this.todos.splice(i, 1)
		        //     // 删除元素之后，让我们遍历的这个 小索引 往后倒退一次，
		        //     // 因为你删除之后，后面的所有元素的索引都会倒退一次
		        //     // 纠正索引的遍历
		        //     i--
		        //   }
		        // }

		        // 过滤结果的方式
		        // 我们这里还有一种办法也很简单
		        // 我们把需要的结果给过滤出来重新赋值到 todos 中
		        this.todos = this.todos.filter(t => !t.completed)
		    },

		    // 获取剩余的任务数量
		    // 后来把这个方法改为了计算属性
		    getRemaningCount() {
		        console.log(111)
		        return this.todos.filter(t => !t.completed).length
	      	}	
		}
	}).$mount('#app')
})();
