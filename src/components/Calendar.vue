<template>
  <div>
        <vc-calendar locale="hr" :attributes="date_attributes" :firstDayOfWeek="2" class="calendar mt-3 center" v-if="renderComponent"/>
  </div>
</template>

<script>
export default {
    name: "Calendar",
    props: {
        'date_attributes':{
            type: Array
        },
        'week':{
            type: Number
        }
    },
    watch:{
        date_attributes:{
            deep:true,
            handler: function(){
                console.log("force")
            }
            
        }
    },
    data(){
        return{
            renderComponent: true
        }
    }
}
</script>

<style scoped>

</style>