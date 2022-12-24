<script lang="ts" setup>
import { ref } from 'vue';
const todoRef = ref('');
const addTodo = () => {
  console.log(todoRef.value);
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
    <button class="btn" @click="addTodo">追加</button>
    <!-- マスタッシュ構文  -->
    <!-- {{ todoRef }}  -->
  </div>
</template>

<style scoped>
.box_input {
  margin-top: 20px;
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
