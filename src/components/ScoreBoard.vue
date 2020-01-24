<template>
  <div>
      <h2 class="score text-center mt-3">Week score board <i class="fas fa-trophy fa-xs"></i></h2>
      <div class="score-board-inner">
        <b-table striped hover :items="this.todos_scoreboard"></b-table>
        <div class="notification-scoreboard" v-if="this.todos_scoreboard.length == 0">
          <p>Oops, there seems to be no data in this week</p>
        </div>
      </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
    name: "Scoreboard",
    props: {
        'todos_scoreboard':{
            type: Array
        },
        'week':{
            type: Number
        }
    },
    data(){
      return{
        attr:[{
            bar: true,
            dates:[
              {start: null, end: null}
            ]
          }
        ]
      }
    },
    filters: {
      formatDate: function(value) {
        if (value) {
          return moment(String(value)).format("DD/MM/YYYY");
        }
      }
    },
    created(){
      this.attr[0].dates[0].start = this.getMonday(new Date('2019-12-24'))
      this.attr[0].dates[0].end = this.getSunday(new Date('2019-12-24'))
      
    },
    watch:{
        week: function(){
            this.attr[0].dates[0].start = this.getMonday(new Date('2019-12-24'))
            this.attr[0].dates[0].end = this.getSunday(new Date('2019-12-24'))

        }
    },
    methods:{
      getMonday: function(d){
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff + this.week * 7));
      },
      getSunday(d){
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 6 ? 7:1); // adjust when day is sunday
        return new Date(d.setDate(diff + this.week * 7));
      }
    }
}
</script>

<style scoped>
.score-board-inner{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.score{
  color: goldenrod;
}

.notification-scoreboard p{
  color:#b3b9bf;
}

</style>