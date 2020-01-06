<template>
  <div>
    <div class="day-list">
      <v-card
        v-for="day in days"
        v-if="day.name !== 'calendar'"
        :id="day.isToday ? 'today' : ''"
        :key="day.uniqueKey"
        :class="currentDate == day.dateObj.toISOString().substring(0, 10)? 'single-day active' : 'single-day'"
        @click="setCurrentDate(day.dateObj.toISOString().substring(0, 10))"
      >
        <div class="date-title">
          <span v-if="day.isToday">TODAY</span>
          <span v-else>{{ day.dayTitle }}</span>
        </div>
        <div class="date-numeric">
          <span>{{ day.dayNumeric }} {{ day.month }}</span>
        </div>
      </v-card>

      <div
        v-else
        id="date-picker"
        v-focusOnToday
        class="single-day"
        @click="toggleCalendar"
      >
        <div class="date-title">
          DATES
        </div>

        <div class="date-numeric">
          <font-awesome-icon :icon="['fas', 'calendar-alt']" />
        </div>
      </div>
    </div>
    <!-- <Calendar /> -->
  </div>
</template>

<script>
import { FocusOnToday } from '../directives';
import { addLeadingZero } from '../utils';

export default {
  name: 'Days',
  directives: {
    FocusOnToday,
  },
  data: () => ({
    days: [],
  }),
  computed: {
    currentDate() {
      return this.$store.getters.getCurrentDate;
    },
  },
  created() {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON'];
    let today = new Date();
    const numberOfDaysToAdd = 2;
    today.setDate(today.getDate() + numberOfDaysToAdd);
    const daysSorted = [];
    let counter = 0;


    do {
      const dateObj = today;
      daysSorted.push({
        dateObj,
        dayTitle: days[today.getDay()],
        dayNumeric: addLeadingZero(today.getDate()),
        isToday: counter === 2,
        month: dateObj.toString().substring(4, 7),
      });
      counter++;
      today = new Date(today - 86400000);
    } while (counter < 33);

    const reverseList = daysSorted.reverse();
    reverseList.push({ name: 'calendar' });
    this.days = reverseList;
  },
  mounted() {
  },
  methods: {
    setCurrentDate(date) {
      this.$store.dispatch('setCurrentDate', date);
    },
    toggleCalendar() {
      this.$store.dispatch('toggleCalendar');
    },
  },
  watch: {
        // prevents bug where the calendar shows automatically when coming from single game view
    $route(to, from) {
      console.log('to====>', to);
      console.log('from=====>', from);
    },
  }
};
</script>

<style scoped>
.day-list {
white-space: nowrap;
overflow-x: auto;
-ms-overflow-style: none;  /* Internet Explorer 10+ */
scrollbar-width: none;
}

.active {
  border-bottom: 2px solid #FFF102 !important;
}
.active .title {
    color: #FFF102;
}

.active .numeric {
    color: #FFF102;
    /* background-color: #FFF102; */
}

::-webkit-scrollbar {
    display: none;
}

.single-day {
    display: inline-block;
    width: 80px;
    cursor: pointer;
    border-bottom: 2px solid #2D2F92;
    font-weight: bold;
    color: #FFF102 !important;
}

.single-day.v-sheet {
  border-radius: 0 !important;
}

.single-day.theme--light.v-sheet {
  border-color: #2D2F92;
}

.single-dat.v-card {
  border-radius: 0 !important;
}
.calendar {
    align-items: center;
    text-align: center;
}

.date-numeric {
    text-align: center;
    color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #2D2F92;
    font-size: 15px;
    text-transform: uppercase;
    font-size: 10px;
}

.date-numeric > span {
  opacity: .6;
}

 .active .date-numeric > span {
  opacity: 1;
}

.date-title {
    display: flex;
    text-align: center;
    background-color: #2D2F92;
    color: white;
    padding-top: 5px;
    align-items: flex-end;
    font-size: 10px;
    justify-content: center;
}

.date-title > span {
  opacity: .6;
}

.active .date-title > span {
  opacity: 1;
}
</style>
