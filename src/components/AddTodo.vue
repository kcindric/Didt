<template>
  <form v-on:submit="addTodo">
    <div class="flex-wrapper">
        <!-- <b-form-group
          id="fieldset-1"
          description
          label="Name"
          label-size="sm"
          label-cols="1"
          label-for="input-1"
          :invalid-feedback="invalidFeedbackName"
          :valid-feedback="validFeedback"
          :state="!$v.name.$invalid"
        >
          <b-form-input id="input-1" v-model="name" :state="!$v.name.$invalid" trim></b-form-input>
        </b-form-group> -->
        <div v-for="(task, index) in tasks" v-bind:key="task.pseudoId">
          <b-form-group
            id="fieldset-2"
            description="Let us know what task you did."
            label="Enter task"
            label-size="sm"
            label-cols-xl="1"
            label-for="input-2"
            :invalid-feedback="invalidFeedbackTask"
            :valid-feedback="validFeedback"
            :state="!$v.tasks.$invalid"
          >
          <b-input-group>
            <b-form-input id="input-2" v-model="task.taskDone" :state="!$v.tasks.$invalid" trim></b-form-input>
            <b-button
              @click="removeTask(index)"
              variant="outline-warning"
              type="submit"
              value="removeTask"
              class="task-button"
              v-if="tasks.length > 1 && index!=0"
            ><i class="far fa-trash-alt"></i></b-button>
            <b-button
          @click="addTask"
          variant="outline-success"
          type="submit"
          value="addTask"
          class="task-button"
          v-if="index == 0"
        ><i class="fas fa-plus"></i></b-button>
          </b-input-group>
          </b-form-group>
        </div>
        <b-form-group
          id="fieldset-3"
          description="Let us know how long did it take."
          label="Enter duration"
          label-size="sm"
          label-cols-xl="1"
          label-for="input-3"
          :invalid-feedback="invalidFeedbackDuration"
          :valid-feedback="validFeedback"
          :state="!$v.duration.$invalid"
        >
          <b-form-input
            id="input-3"
            v-mask="'##:##'"
            placeholder="hh:mm"
            v-model="duration"
            :state="!$v.duration.$invalid"
            trim
          ></b-form-input>
        </b-form-group>
        <div class="add-task-button-wrapper">
          <b-button variant="outline-dark" type="submit" value="submit" id="submit" class="submit-task">Submit</b-button>
          <b-button variant="outline-dark" type="submit" value="submit" id="submit" class="cancel-task" @click="cancel">Cancel</b-button>
        </div>
        
    </div>

    
    <!-- <pre>{{$data}}</pre> -->
  </form>
</template>

<script>
// eslint-disable-next-line no-console
const re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;
import uuid from "uuid";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "AddTodo",
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      tasks: [{
        id: uuid.v4(),
        taskDone: ""
      }],
      duration: "",
      timeCompleted: ""
    };
  },
  //https://bootstrap-vue.js.org/docs/reference/validation/
  validations: {
    // name: {
    //   required,
    //   minLength: minLength(2)
    // },
    tasks: {
      required,
      minLength: minLength(1),
      $each: {
        taskDone: {
          required
        }
      }
    },
    duration: {
      required,
      durationFormat(duration){
        return(
          re.test(duration)
        );
      }
    }
  },
  computed: {
    invalidFeedbackDuration() {
      if (this.duration != "" && this.duration.match(re)) {
        return "";
      } else if (!this.duration.match(re)) {
        return "Please enter valid time format hh:mm";
      } else {
        return "Please enter something";
      }
    },
    invalidFeedbackTask() {
      if (!this.$v.tasks) {
        return "";
      } 
      else {
        return "Please enter something";
      }
    },
    validFeedback() {
      return this.state === true ? "Thank you" : "";
    }
  },
  methods: {
    addTask: function(e) {
      e.preventDefault();
      const id = uuid.v4();
      this.tasks.push({ id, taskDone: "" });
    },
    removeTask: function(index) {
      
      this.tasks.splice(index, 1);
    },
    addTodo(e) {
      e.preventDefault();
      if (!this.$v.$invalid) {
        const newTodo = {
          id: uuid.v4(),
          username: this.$store.state.auth.user.username,
          firstName: this.$store.state.auth.user.firstName,
          lastName: this.$store.state.auth.user.lastName,
          tasks: this.tasks,
          duration: this.duration,
          timeCompleted: new Date()
        };
        console.log(newTodo.timeCompleted)
        // send to parent
        this.$emit("add-todo", newTodo);
        this.tasks = [
        {
          id: uuid.v4(),
          taskDone: ""
        }
        ];
        this.duration = "";
      }
    },
    cancel(){
      this.tasks = [
        {
          id: uuid.v4(),
          taskDone: ""
        }
        ];
        this.duration = "";
    }
  }
};
</script>

<style scoped>
form {
  padding: 1.5rem;
}
.flex-wrapper {
  display: flex;
  flex-direction: column;
  padding:30px;
}
.left {
  flex-basis: 50%;
  padding: 1.5rem;
}
.right {
  flex-basis: 50%;
  padding: 1.5rem;
}
.task-button{
  margin-left: 5px;
  margin-right: 5px;
}
.add-task-button-wrapper{
  display:flex;
  justify-content: center;
}
.submit-task{
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  flex: 1;
}
.cancel-task{
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  flex: 1;
}

.input-group > .form-control:not(:last-child), .input-group > .custom-select:not(:last-child){
  border-top-right-radius: 0.25rem !important;
border-bottom-right-radius: 0.25rem !important;
}

</style>