<template>
  <div class="card">
    <interview-modal v-if="isShow" :prop-interview="interview" :is-create="isCreate" :start="start" :end="end"/>
    <div class="calendar">
      <calendar v-if="show" ref="calendar" :select-calendar="addInterview" :get-event="interviews" :drop="drop" :resize="resize"/>
    </div>
  </div>
</template>

<script>
import MasterView from '@/views/MasterView'
import rf from '@/api/commons/RequestFactory'
import InterviewModal from '@/components/commons/RecruitmentModal/InterviewModal'
import Calendar from '@/components/commons/Calendar'
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'InterviewLayout',
  components: {
    InterviewModal,
    Calendar
  },
  extends: MasterView,
  data() {
    return {
      interview: {
        candidate_id: '',
        started_at: '',
        ended_at: '',
        interviewer: '',
        address: '',
        id: ''
      },
      isShow: false,
      isCreate: true,
      modal_id: 'interview-modal',
      importText: 'Import file...',
      start: '',
      end: '',
      events: [],
      interviews: [],
      show: false
    }
  },
  created() {
    this.getInterviews()
  },
  mounted() {
    this.onListener()
  },
  methods: {
    getInterviews() {
      rf.getRequest('InterviewRequest')
        .getList()
        .then(res => {
          _.each(res.data, v => {
            const event = {
              start: v.started_at,
              end: v.ended_at,
              title: v.name,
              event_id: v.id
            }
            this.interviews.push(event)
          })
          this.show = true
        })
    },
    addInterview(start, end) {
      this.start = $.fullCalendar.formatDate(start, 'YYYY-MM-DD HH:mm')
      this.end = $.fullCalendar.formatDate(end, 'YYYY-MM-DD HH:mm')
      this.isCreate = true
      this.isShow = true
      this.addEventShowModal()
    },
    drop(event) {
      const params = {
        started_at: moment(event.start).format('YYYY-MM-DD HH:mm'),
        ended_at: moment(event.end).format('YYYY-MM-DD HH:mm'),
        id: event.event_id
      }
      rf.getRequest('InterviewRequest')
        .update(params)
        .then(() => {})
    },
    resize(event) {
      const params = {
        started_at: moment(event.start).format('YYYY-MM-DD HH:mm'),
        ended_at: moment(event.end).format('YYYY-MM-DD HH:mm'),
        id: event.event_id
      }
      rf.getRequest('InterviewRequest')
        .update(params)
        .then(() => {})
    },
    importData(e) {
      this.importText = e.target.files[0].name
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      rf.getRequest('InterviewRequest')
        .importExcelData(formData)
        .then(() => {})
    },
    updateInterview(interview) {
      this.isCreate = false
      Object.assign(this.interview, this.setData(this.interview, interview))
      this.isShow = true
      this.addEventShowModal()
    },
    clearData() {
      this.interview = this.emptyData(this.interview)
    },
    tableRefresh() {
      this.$refs.datatable.refresh()
      this.isShow = false
    },
    refreshEvent(event) {
      const refreshEvent = {
        title: event.name,
        start: event.started_at,
        end: event.ended_at,
        event_id: event.id
      }
      this.$refs.calendar.refreshEvent(refreshEvent)
    },
    onListener() {
      window.EventBus.$on('add-interview', res => this.refreshEvent(res))
      window.EventBus.$on('update-interview', () => this.tableRefresh())
    }
  }
}
</script>

<style lang="sass">
.calendar
  width: 96%
  margin: 0 auto 0 auto
  padding-top: 20px
.input-file-container
  position: relative
  width: 225px
.js
  .input-file-trigger
    display: block
    padding: 14px 45px
    background: #39D2B4
    color: #fff
    font-size: 1em
    transition: all .4s
    cursor: pointer
  .input-file
    position: absolute
    top: 0; left: 0
    width: 225px
    opacity: 0
    padding: 14px 0
    cursor: pointer
  .file-return
    font-style: italic
    font-size: .9em
    font-weight: bold
    &:not(:empty):before
      content: "Selected file: "
      font-style: normal
      font-weight: normal
  .input-file:hover + .input-file-trigger,
  .input-file:focus + .input-file-trigger,
  .input-file-trigger:hover,
  .input-file-trigger:focus
    background: #34495E
    color: #39D2B4
.file-return
  margin: 0
  &:not(:empty)
    margin: 1em 0
.epm-tb-header
  margin-bottom: 15px
  a
    cursor: pointer
    &.button-add
      height: 58px
      margin-right: 10px
table
  thead
    th
      font-size: 13px
      line-height: 40px !important
      &.sort:after,
      &.sort:before
        top: 0 !important
      &:last-child:after,
      &:last-child:before
        content: unset !important
  tbody
    tr
      cursor: pointer
</style>
