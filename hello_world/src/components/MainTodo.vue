<script lang="ts" setup>
import { ref } from 'vue';

const isEditRef = ref<boolean>(false);
const todoRef = ref('');
const todoListRef = ref<any[]>([]);
const localTODOList = localStorage.todoList;
todoListRef.value = localTODOList ? JSON.parse(localTODOList) : [];

let editId = -1;

const addTodo = () => {
  const id = new Date().getTime();
  // save value web storage
  todoListRef.value.push({ id: id, task: todoRef.value });
  localStorage.todoList = JSON.stringify(todoListRef.value);
  console.log(todoRef.value);
  todoRef.value = '';
};

const showTodo = (id: number) => {
  isEditRef.value = true;
  const answer = todoListRef.value.find((x) => x.id === id);
  todoRef.value = answer.task;
  editId = id;
};
const editTodo = () => {
  isEditRef.value = false;
  const answer = todoListRef.value.find((x) => x.id === editId);
  answer.task = todoRef.value;
  localStorage.todoList = JSON.stringify(todoListRef.value);
  editId = -1;
  todoRef.value = '';
};
const deleteTodo = (id: number) => {
  const answer = todoListRef.value.find((x) => x.id === id);
  todoRef.value = answer.task;
  const delMsg = `「${answer.task}」を削除しますか?`;
  if (!confirm(delMsg)) return;
  const idx = todoListRef.value.findIndex((x) => x.id === id);
  todoListRef.value.splice(idx, 1);
  localStorage.todoList = JSON.stringify(todoListRef.value);
};
</script>
<template>
  <div class="box_input">
    <input
      type="text"
      v-model="todoRef"
      class="todo_input"
      placeholder="+ TODOを入力"
    />
    <button class="btn green" @click="editTodo" v-if="isEditRef">変更</button>
    <button class="btn" @click="addTodo" v-else>追加</button>
    <!-- マスタッシュ構文  -->
    <!-- {{ todoRef }}  -->
    <div class="box_list">
      <div class="todo_list" v-for="obj in todoListRef" :key="obj.id">
        <div class="todo">
          <input type="checkbox" class="check" /><label>{{ obj.task }}</label>
        </div>
        <div class="btns">
          <button class="btn green" @click="showTodo(obj.id)">編</button>
          <button class="btn pink" @click="deleteTodo(obj.id)">削</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box_list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.todo_list {
  display: flex;
  align-items: center;
  gap: 8px;
}
.todo {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  width: 300px;
}

.check {
  border: 1px solid red;
  /* transform: sca le(1, 6); */
  margin: 0 16px 2px 6px;
}

.btns {
  display: flex;
  gap: 4px;
}
.box_input {
  margin-top: 20px;
}

.green {
  background-color: #00c853;
}
.pink {
  background-color: #ff4081;
}
.todo_input {
  width: 300px;
  margin-right: 8px;
  padding: 8px;
  font-size: 18px;
  border: 1px solid #aaa;
  border-radius: 6px;
}
.bin {
  padding: 8px;
  background-color: #03a9f4;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
</style>
