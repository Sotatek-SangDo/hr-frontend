<template>
  <div>
    <div class="page-container">
      <div id="preloader">
        <div class="loader"/>
      </div>
      <!-- sidebar menu area start -->
      <main-menu/>
      <!-- sidebar menu area end -->
      <!-- main content area start -->
      <div class="main-content">
        <!-- header area start -->
        <div class="header-area">
          <div class="row align-items-center">
            <!-- nav and search button -->
            <div class="col-md-6 col-sm-8 clearfix">
              <div class="nav-btn pull-left">
                <span/>
                <span/>
                <span/>
              </div>
            </div>
            <!-- profile info & task notification -->
            <div class="col-md-6 col-sm-4 clearfix">
              <ul class="notification-area pull-right">
                <li class="dropdown">
                  <i class="ti-bell dropdown-toggle" data-toggle="dropdown">
                    <span>2</span>
                  </i>
                  <div class="dropdown-menu bell-notify-box notify-box">
                    <span class="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                    <div class="nofity-list">
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-key btn-danger"/></div>
                        <div class="notify-text">
                          <p>You have Changed Your Password</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-comments-smiley btn-info"/></div>
                        <div class="notify-text">
                          <p>New Commetns On Post</p>
                          <span>30 Seconds ago</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-key btn-primary"/></div>
                        <div class="notify-text">
                          <p>Some special like you</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-comments-smiley btn-info"/></div>
                        <div class="notify-text">
                          <p>New Commetns On Post</p>
                          <span>30 Seconds ago</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-key btn-primary"/></div>
                        <div class="notify-text">
                          <p>Some special like you</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-key btn-danger"/></div>
                        <div class="notify-text">
                          <p>You have Changed Your Password</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb"><i class="ti-key btn-danger"/></div>
                        <div class="notify-text">
                          <p>You have Changed Your Password</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li class="dropdown">
                  <i class="fa fa-envelope-o dropdown-toggle" data-toggle="dropdown"><span>3</span></i>
                  <div class="dropdown-menu notify-box nt-enveloper-box">
                    <span class="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                    <div class="nofity-list">
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img1.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">Hey I am waiting for you...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img2.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">When you can connect with me...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img3.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">I missed you so much...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img4.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">Your product is completely Ready...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img2.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">Hey I am waiting for you...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img1.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">Hey I am waiting for you...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                      <a href="#" class="notify-item">
                        <div class="notify-thumb">
                          <img src="assets/images/author/author-img3.jpg" alt="image">
                        </div>
                        <div class="notify-text">
                          <p>Aglae Mayer</p>
                          <span class="msg">Hey I am waiting for you...</span>
                          <span>3:15 PM</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li class="settings-btn">
                  <i class="ti-settings"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- header area end -->
        <!-- page title area start -->
        <div class="page-title-area">
          <div class="row align-items-center">
            <div class="col-sm-6">
              <div class="breadcrumbs-area clearfix">
                <h4 class="page-title pull-left">{{ headerTitle }}</h4>
                <ul class="breadcrumbs pull-left">
                  <li>
                    <a href="/">Trang chủ</a>
                  </li>
                  <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                    <a v-if="breadcrumb.href" :href="breadcrumb.href" v-text="breadcrumb.title"/>
                    <span v-else v-text="breadcrumb.title"/>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-sm-6 clearfix">
              <div class="user-profile pull-right">
                <img class="avatar user-thumb" src="assets/images/author/avatar.png" alt="avatar">
                <h4 class="user-name dropdown-toggle" data-toggle="dropdown">{{ username }}<i class="fa fa-angle-down"/></h4>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Message</a>
                  <a class="dropdown-item" href="#">Settings</a>
                  <a class="dropdown-item" href="#" @click="logout()">Đăng xuất</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot name="main-content"/>
      </div>
      <!-- main content area end -->
      <!-- footer area start-->
      <footer>
        <div class="footer-area">
          <p>© Copyright 2018. All right reserved. Template by <a href="#">Sang Do</a>.</p>
        </div>
      </footer>
      <!-- footer area end-->
    </div>
    <div class="offset-area">
      <div class="offset-close"><i class="ti-close"/></div>
      <ul class="nav offset-menu-tab">
        <li><a class="active" data-toggle="tab" href="#activity">Activity</a></li>
        <li><a data-toggle="tab" href="#settings">Settings</a></li>
      </ul>
      <div class="offset-content tab-content">
        <div id="activity" class="tab-pane fade in show active">
          <div class="recent-activity">
            <div class="timeline-task">
              <div class="icon bg1">
                <i class="fa fa-envelope"/>
              </div>
              <div class="tm-title">
                <h4>Rashed sent you an email</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg2">
                <i class="fa fa-check"/>
              </div>
              <div class="tm-title">
                <h4>Added</h4>
                <span class="time"><i class="ti-time"/>7 Minutes Ago</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg2">
                <i class="fa fa-exclamation-triangle"/>
              </div>
              <div class="tm-title">
                <h4>You missed you Password!</h4>
                <span class="time"><i class="ti-time"/>09:20 Am</span>
              </div>
            </div>
            <div class="timeline-task">
              <div class="icon bg3">
                <i class="fa fa-bomb"/>
              </div>
              <div class="tm-title">
                <h4>Member waiting for you Attention</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg3">
                <i class="ti-signal"/>
              </div>
              <div class="tm-title">
                <h4>You Added Kaji Patha few minutes ago</h4>
                <span class="time"><i class="ti-time"/>01 minutes ago</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg1">
                <i class="fa fa-envelope"/>
              </div>
              <div class="tm-title">
                <h4>Ratul Hamba sent you an email</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
              <p>Hello sir , where are you, i am egerly waiting for you.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg2">
                <i class="fa fa-exclamation-triangle"/>
              </div>
              <div class="tm-title">
                <h4>Rashed sent you an email</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg2">
                <i class="fa fa-exclamation-triangle"/>
              </div>
              <div class="tm-title">
                <h4>Rashed sent you an email</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
            </div>
            <div class="timeline-task">
              <div class="icon bg3">
                <i class="fa fa-bomb"/>
              </div>
              <div class="tm-title">
                <h4>Rashed sent you an email</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
              </p>
            </div>
            <div class="timeline-task">
              <div class="icon bg3">
                <i class="ti-signal"/>
              </div>
              <div class="tm-title">
                <h4>Rashed sent you an email</h4>
                <span class="time"><i class="ti-time"/>09:35</span>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
              </p>
            </div>
          </div>
        </div>
        <div id="settings" class="tab-pane fade">
          <div class="offset-settings">
            <h4>General Settings</h4>
            <div class="settings-list">
              <div class="s-settings">
                <div class="s-sw-title">
                  <h5>Notifications</h5>
                  <div class="s-swtich">
                    <input id="switch1" type="checkbox" >
                    <label for="switch1">Toggle</label>
                  </div>
                </div>
                <p>Keep it 'On' When you want to get all the notification.</p>
              </div>
              <div class="s-settings">
                <div class="s-sw-title">
                  <h5>Show recent activity</h5>
                  <div class="s-swtich">
                    <input id="switch2" type="checkbox" >
                    <label for="switch2">Toggle</label>
                  </div>
                </div>
                <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
              </div>
              <div class="s-settings">
                <div class="s-sw-title">
                  <h5>Show your emails</h5>
                  <div class="s-swtich">
                    <input id="switch3" type="checkbox" >
                    <label for="switch3">Toggle</label>
                  </div>
                </div>
                <p>Show email so that easily find you.</p>
              </div>
              <div class="s-settings">
                <div class="s-sw-title">
                  <h5>Show Task statistics</h5>
                  <div class="s-swtich">
                    <input id="switch4" type="checkbox" >
                    <label for="switch4">Toggle</label>
                  </div>
                </div>
                <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
              </div>
              <div class="s-settings">
                <div class="s-sw-title">
                  <h5>Notifications</h5>
                  <div class="s-swtich">
                    <input id="switch5" type="checkbox" >
                    <label for="switch5">Toggle</label>
                  </div>
                </div>
                <p>Use checkboxes when looking for yes or no answers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth.js'
import MainMenu from './MainMenu.vue'

export default {
  components: {
    MainMenu
  },
  props: {
    headerTitle: {
      type: String,
      default: 'Dashbroad'
    },
    breadcrumbs: {
      type: Array
    }
  },
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    logout() {
      auth.logout()
    },
    init() {
      const user = window.config.getUser()
      this.username = user.email
    }
  }
}
</script>
<style scoped lang="sass">
.demo-header
  background-color: rgb(63, 81, 181) !important
.mdl-layout__header-row
  color: white
.page-title-area
  border-bottom: 1px solid #dae4e8
  margin-bottom: 20px
.page-title
  line-height: 43px
.header-area
  .notification-area
    margin-bottom: 0
</style>
