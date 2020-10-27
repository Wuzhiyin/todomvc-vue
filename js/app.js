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
		}
	}).$mount('#app')
})();
