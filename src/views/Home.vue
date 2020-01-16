<template>
  <div id="app">
    <div class="wrapper">
      <div class="week-buttons">
        <b-button
          variant="outline-dark"
          type="submit"
          value="submit"
          id="submit"
          size="sm"
          @click="weekDown"
        ><i class="fas fa-chevron-left"></i></b-button>
        <p>{{this.attr[0].dates[0].start | formatDate}} - {{this.attr[0].dates[0].end | formatDate}}</p>
        <b-button
          variant="outline-dark"
          type="submit"
          value="submit"
          id="submit"
          size="sm"
          @click="weekUp"
          v-bind:disabled="week>=0"
        ><i class="fas fa-angle-right"></i></b-button>
      </div>
      <ScoreBoard v-bind:todos_scoreboard="totalTime" v-bind:week="week" class="score-board" /> 
      <AddTodo v-on:add-todo="addTodo" class="add-todo" />
      <Todos v-bind:todos_todos="todos" v-on:del-todo="deleteTodo" class="todos" v-if="todos.length > 0" />
    </div>
  </div>
</template>

<script>
import Todos from "../components/Todos.vue";
import AddTodo from "../components/AddTodo.vue";
import ScoreBoard from "../components/ScoreBoard.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "home",
  components: {
    Todos,
    AddTodo,
    ScoreBoard
  },
  data() {
    return {
      todos: [],
      week: 0,
      attr: [
        {
          bar: true,
          dates: [{ start: null, end: null }]
        }
      ]
    };
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
    formatApiDate: function(value) {
      if (value) {
        return moment(String(value)).format("YYYY-MM-DD");
      }
    }
  },
  created() {
    //fetching
    axios
      .get(
        `https://my-json-server.typicode.com/kcindric/fakeJson/events?timeCompleted_gte=${this.startDate.toString()}&timeCompleted_lte=${this.endDate.toString()}`
      )
      .then(res => (this.todos = res.data));

    //setting current week
    this.attr[0].dates[0].start = this.getMonday();
    this.attr[0].dates[0].end = this.getSunday();
  },
  watch: {
    week: function() {
      this.attr[0].dates[0].start = this.getMonday();
      this.attr[0].dates[0].end = this.getSunday();
      axios
        .get(
          `https://my-json-server.typicode.com/kcindric/fakeJson/events?timeCompleted_gte=${this.startDate.toString()}&timeCompleted_lte=${this.endDate.toString()}`
        )
        .then(res => (this.todos = res.data));
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  computed: {
    //for score board
    //total time a user did his tasks
    totalTime: function() {
      const durationScore = [];
      for (const element of this.todos) {
        if (durationScore.some(e => e.name === element.name)) {
          var std_count = durationScore
            .filter(e => {
              return e.name === element.name;
            })[0]
            .duration.toString();

          //https://stackoverflow.com/questions/39088565/adding-two-durations-together-with-datejs-or-momentjs-and-formating-them-like
          var std_create = element.duration.toString();
          var final_years = moment
            .duration(std_count, "HH:mm")
            .add(std_create, "HH:mm")
            .years();
          var final_months = moment
            .duration(std_count, "HH:mm")
            .add(std_create, "HH:mm")
            .months();
          var final_weeks = moment
            .duration(std_count, "HH:mm")
            .add(std_create, "HH:mm")
            .weeks();
          var final_days = moment
            .duration(std_count, "HH:mm")
            .add(std_create, "HH:mm")
            .days();
          var final_hours = moment
            .duration(std_count, "HH:mm")
            .add(std_create, "HH:mm")
            .hours();
          var final_minutes = moment
            .duration(std_count, "HH:mm")
            .add(std_create, "HH:mm")
            .minutes();

          var final_calc =
            final_years * 31556952 +
            final_months * 2592000 +
            final_weeks * 604800 +
            final_days * 86400 +
            final_hours * 3600 +
            final_minutes * 60;

          var displayTime = moment.duration(final_calc, "seconds");
          let reHours = /\D\D(\d\d)/;
          let reMinutes = /(\d\d)\D$/;

          // console.log("final: " + reHours.exec(displayTime.toString())[0].substring(2) + "h" + reMinutes.exec(displayTime.toString())[0].substring(0,2) + "m")
          var newDuration =
            reHours.exec(displayTime.toString())[0].substring(2) +
            ":" +
            reMinutes.exec(displayTime.toString())[0].substring(0, 2);

          durationScore.filter(e => {
            return e.name === element.name;
          })[0].duration = newDuration;
        } else {
          durationScore.push({
            name: element.name,
            duration: element.duration
          });
        }
      }
      return durationScore;
    },
    startDate: function() {
      var value = this.getMonday();
      return moment(String(value)).format("YYYY-MM-DD");
    },
    endDate: function() {
      var value = this.getSunday();
      return moment(String(value)).format("YYYY-MM-DD");
    },
    currentUser: function() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    deleteTodo(id) {
      if (confirm("Are you sure you want to delete this?")) {
        // this.todos = this.todos.filter(todo => todo.id !== id);
        axios
          .delete(
            `https://my-json-server.typicode.com/kcindric/fakeJson/events/${id}`
          )
          //trebao bi ici res => res.nešto no ovdje to ne radim jer ekšli ne dobijem nikakav response od fake API-a
          //pa samo radim filter za prikazivanje
          .then((this.todos = this.todos.filter(todo => todo.id !== id)))
          // eslint-disable-next-line no-console
          .catch(err => console.log(err));
      } else {
        return;
      }
    },
    addTodo(newTodo) {
      const { id, name, duration, done, timeCompleted } = newTodo;
      axios
        .post("https://my-json-server.typicode.com/kcindric/fakeJson/events", {
          id,
          name,
          duration,
          done,
          timeCompleted
        })
        .then(res => (this.todos = [...this.todos, res.data]));
    },
    getMonday: function() {
      //In this demo the present day is 2019-12-24 because there is no data "in the future"
      var monday = new Date(
        moment("2019-12-28")
          .startOf("isoweek")
          .toDate()
      );
      return new Date(monday.setDate(monday.getDate() + this.week * 7));
    },
    getSunday() {
      var sunday = new Date(
        moment("2019-12-28")
          .endOf("isoweek")
          .toDate()
      );
      return new Date(sunday.setDate(sunday.getDate() + this.week * 7));
    },
    weekUp() {
      this.week += 1;
    },
    weekDown() {
      this.week -= 1;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
html {
  line-height: 1.6 !important;
}

h1,
h2,
h3,
h4,
h5 {
  line-height: 1 !important;
}

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
.wrapper{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.week-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin: 0 auto;
  /* border: 1px solid blue; */
  border-radius: 0.25rem;
  margin-bottom: 30px;
}
.week-buttons button {
  margin: 30px;
  margin-bottom:0px;
}
.score-board{
  width: 50%;
  flex: 1;
  border: 1px #efefef solid;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  margin-bottom:30px;
  padding: 30px; 
}


.add-todo{
  border: 1px solid #efefef;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  width: 50%;
  border-radius: 0.25rem;
  margin-bottom: 30px;
}
.todos{
  border: 1px solid #efefef;
  box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  width: 50%;
  border-radius: 0.25rem;
  margin-bottom: 30px;
}

@media only screen and (max-width: 768px) {

   .score-board{
     width:100%;
   }

   .add-todo{
     width:100%;
   }

   .todos{
     width:100%;
     margin-bottom: 0px;
   }

}

@media only screen and (max-width: 768px){
  .week-buttons p{
    font-size: 0.9rem;
  }

  .week-buttons button{
    size: sm !important;
  }
}
</style>
