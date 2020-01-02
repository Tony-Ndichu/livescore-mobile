<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-dialog
        ref="dialog"
        v-model="calendarState"
        :return-value.sync="date"
        width="290px"
      >
        <v-date-picker
          v-model="date"
          header-color="#00A54F"
          color="#00A54F"
          :min="minDate"
          :max="maxDate"
        >
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="toggleCalendar()"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Calendar',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
  }),
  computed: {
    calendarState: {
      get() {
        return this.$store.getters.getCalendarState;
      },
      set() {
        this.$store.dispatch('toggleCalendar');
      },
    },
    minDate() {
      const dateObj = new Date();
      const thirtyDaysAgo = new Date().setDate(dateObj.getDate() - 30);
      return new Date(thirtyDaysAgo).toISOString();
    },
    maxDate() {
      const dateObj = new Date();
      return dateObj.toISOString();
    },
  },
  watch: {
    date(val) {
      this.$store.dispatch('setCurrentDate', val);
    },
    calendarState(val) {
      console.log('the value of calendar state is changing====>', val);
    },
  },
  methods: {
    toggleCalendar() {
      this.$store.dispatch('toggleCalendar');
    },
  },
};
</script>
