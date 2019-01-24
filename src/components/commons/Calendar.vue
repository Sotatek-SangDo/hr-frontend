<template>
  <div>
    <div ref="calendar" class="my-calendar"/>
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
              <input id="patientName" type="text" name="patientName" tyle="margin: 0 auto;" data-provide="typeahead" data-items="4" data-source="[&quot;Value 1&quot;,&quot;Value 2&quot;,&quot;Value 3&quot;]">
              <input id="apptStartTime" type="hidden">
              <input id="apptEndTime" type="hidden">
              <input id="apptAllDay" type="hidden" >
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="when">When:</label>
            <div id="when" class="controls controls-row" style="margin-top:5px;"/>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
        <button id="submitButton" type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import MasterView from '../../views/MasterView'

export default {
  name: 'Calendar',
  extends: MasterView,
  props: {
    selectCalendar: {
      type: Function,
      default: () => {}
    },
    drop: {
      type: Function,
      default: () => {}
    },
    resize: {
      type: Function,
      default: () => {}
    },
    getEvent: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      modal_id: 'createEventModal'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const self = this
      $(self.$refs.calendar).fullCalendar({
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,agendaWeek'
        },
        defaultDate: new Date(),
        defaultView: 'agendaWeek',
        editable: true,
        selectable: true,
        select: function(start, end) {
          self.selectCalendar(start, end)
        },
        eventDrop: function(event, delta, revertFunc) {
          confirm('Bạn có chắc muốn thay đổi?')
            ? self.drop(event)
            : revertFunc()
        },
        eventResize: function(event, delta, revertFunc) {
          !confirm('Ban co chac muon thay doi?')
            ? revertFunc()
            : self.resize(event)
        },
        events: self.getEvent
      })
    },
    refreshEvent(event) {
      $(this.$refs.calendar).fullCalendar('renderEvent', event, true)
    }
  }
}
</script>

<style type="sass" scoped>
</style>
