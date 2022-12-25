import { ref } from 'vue';
export const todoSubRoutines=()=>{
    const editId= ref(-1);
    const todoListRef = ref<any[]>([]);
    const localTODOList = localStorage.todoList;
    todoListRef.value = localTODOList ? JSON.parse(localTODOList) : [];
    
    const findById = (target: any[], id: number) => {
        const obj = target.find((x) => x.id === id);
        const idx = target.findIndex((x) => x.id === id);
        return { obj, idx };
    };
    const add = (task:string) => {
        const id = new Date().getTime();
        todoListRef.value.push({ id: id, task: task });
        // save value web storage
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const show=(id:number)=>{
        const answer = findById(todoListRef.value, id);
        editId.value = id;
        return answer.obj.task;
    }
    const edit= (task:string) => {
        const answer = findById(todoListRef.value, editId.value);
        answer.obj.task = task;
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };
    const del= (id: number) => {
        const answer = findById(todoListRef.value, id);
        const delMsg = `「${answer.idx}.${answer.obj.task}」を削除しますか?`;
        if (!confirm(delMsg)) return;
        todoListRef.value.splice(answer.idx, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };
    const check= (id: number) => {
    };

    return {todoListRef, add, show, edit, del, check}
}