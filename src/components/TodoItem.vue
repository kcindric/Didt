<template>
  <div class="todo-item">
    <div>
      <div class="heading">
          <h3>{{todo.firstName}}</h3>
          <p>{{todo.timeCompleted | formatDate}}</p>
      </div>
      
      <div class="subtitle"><p>{{todo.duration}} h</p></div>
    </div>
    <div class="task-list">
      <ul class="fa-ul">
      <li v-for="task in todo.tasks" v-bind:key="task.id"><span class="fa-li"><i class="fas fa-check"></i></span>{{task.taskDone}}</li>
      </ul>
      <b-button
              v-if="this.todo.username == this.$store.state.auth.user.username"
              v-on:click="$emit('del-todo', todo.id)"
              variant="outline-danger"
              type="submit"
              value="removeTask"
              class="del"
            ><i class="far fa-trash-alt"></i></b-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "TodoItem",
  props: ["todo"],
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY HH:mm");
      }
    }
  }
};
</script>

<style scoped>
.todo-item {
  /* background: #f4f4f4; */
  padding: 30px 30px 30px;
  border-bottom: 1px #ccc dotted;
}

.task-list {
  margin-left: -13px;
  display:flex;
  justify-content: space-between;
  align-items: baseline;
}

.del {
  /* background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%; */
  cursor: pointer;
}
.heading{
  display: flex;
  justify-content: space-between;
}
.heading p{
  align-self: flex-end;
  color:#b3b9bf;
  font-size: 0.9rem;
  
}

.subtitle{
  font-weight: 700;
  color: #696969;
}
</style>