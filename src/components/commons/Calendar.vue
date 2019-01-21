<template>
  <div>
    <div class="my-calendar" ref="calendar"></div>
    <div id="createEventModal" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h3 id="myModalLabel1">Create Appointment</h3>
      </div>
      <div class="modal-body">
      <form id="createAppointmentForm" class="form-horizontal">
          <div class="control-group">
              <label class="control-label" for="inputPatient">Patient:</label>
              <div class="controls">
                  <input type="text" name="patientName" id="patientName" tyle="margin: 0 auto;" data-provide="typeahead" data-items="4" data-source="[&quot;Value 1&quot;,&quot;Value 2&quot;,&quot;Value 3&quot;]">
                  <input type="hidden" id="apptStartTime"/>
                  <input type="hidden" id="apptEndTime"/>
                  <input type="hidden" id="apptAllDay" />
              </div>
          </div>
          <div class="control-group">
              <label class="control-label" for="when">When:</label>
              <div class="controls controls-row" id="when" style="margin-top:5px;">
              </div>
          </div>
      </form>
      </div>
      <div class="modal-footer">
          <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
          <button type="submit" class="btn btn-primary" id="submitButton">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import MasterView from "../../views/MasterView";

export default {
  name: "Calendar",
  extends: MasterView,
  data() {
    return {
      modal_id: "createEventModal"
    };
  },
  props: {
    selectCalendar: {
      type: Function
    },
    drop: {
      type: Function
    },
    resize: {
      type: Function
    },
    getEvent: {
      type: Array
    }
  },
  methods: {
    init() {
      const self = this;
      $(self.$refs.calendar).fullCalendar({
        header: {
          left: "prev,next",
          center: "title",
          right: "month,agendaWeek"
        },
        defaultDate: new Date(),
        defaultView: "agendaWeek",
        editable: true,
        selectable: true,
        select: function(start, end) {
          self.selectCalendar(start, end);
        },
        eventDrop: function(event, delta, revertFunc) {
          confirm("Bạn có chắc muốn thay đổi?")
            ? self.drop(event)
            : revertFunc();
        },
        eventResize: function(event, delta, revertFunc) {
          !confirm("Ban co chac muon thay doi?")
            ? revertFunc()
            : self.resize(event);
        },
        events: self.getEvent
      });
    },
    refreshEvent(event) {
      $(this.$refs.calendar).fullCalendar("renderEvent", event, true);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style type="sass" scoped>
</style>
