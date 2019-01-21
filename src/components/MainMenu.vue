<template>
    <div class="sidebar-menu">
      <div class="sidebar-header">
          <div class="logo">
              <a href="/">
                <img src="assets/images/icon/hr-admin.png" alt="logo">
              </a>
          </div>
      </div>
      <div class="main-menu">
          <div class="menu-inner">
              <nav>
                  <ul class="metismenu" id="menu" ref="metismenu">
                    <li>
                      <a class="no-sub" href="/">
                        <i class="ti-home"></i>
                        <span>Trang chu</span>
                      </a>
                    </li>
                    <li class="active">
                      <a href="javascript:void(0)" class="has-sub" aria-expanded="true">
                        <i class="ti-dashboard"></i>
                        <span>Nhân viên</span>
                      </a>
                      <ul class="collapse">
                        <li class="active">
                          <a href="/employees">Danh sách nhân viên</a>
                        </li>
                        <li>
                          <a href="/employee-add">Thêm mới nhân viên</a>
                        </li>
                      </ul>
                    </li>
                      <li>
                          <a href="javascript:void(0)" class="has-sub" aria-expanded="true">
                            <i class="ti-layout-sidebar-left"></i>
                            <span>Phòng ban</span>
                          </a>
                          <ul class="collapse">
                              <li><a href="/company">Công ty</a></li>
                              <li><a href="/departments">Phòng ban</a></li>
                          </ul>
                      </li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true" class="has-sub">
                            <i class="ti-pie-chart"></i>
                            <span>Charts</span>
                          </a>
                          <ul class="collapse">
                              <li><a href="barchart.html">bar chart</a></li>
                              <li><a href="linechart.html">line Chart</a></li>
                              <li><a href="piechart.html">pie chart</a></li>
                          </ul>
                      </li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true" class="has-sub"><i class="ti-palette"></i><span>Bảo hiểm</span></a>
                          <ul class="collapse">
                              <li><a href="/insurances">Hồ sơ bảo hiểm</a></li>
                              <li><a href="/insurance-payment">Thanh toán bảo hiểm</a></li>
                          </ul>
                      </li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true" class="has-sub">
                            <i class="ti-slice"></i><span>Tuyển dụng</span>
                          </a>
                          <ul class="collapse">
                              <li><a href="/recruitment">Kế hoạch tuyển dụng</a></li>
                              <li><a href="/candidates">Ứng tuyển</a></li>
                              <li><a href="/interviews">Phỏng vấn</a></li>
                          </ul>
                      </li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true"><i class="fa fa-table"></i>
                              <span>Tables</span></a>
                          <ul class="collapse">
                              <li><a href="table-basic.html">basic table</a></li>
                              <li><a href="table-layout.html">table layout</a></li>
                              <li><a href="datatable.html">datatable</a></li>
                          </ul>
                      </li>
                      <li><a href="maps.html"><i class="ti-map-alt"></i> <span>maps</span></a></li>
                      <li><a href="invoice.html"><i class="ti-receipt"></i> <span>Invoice Summary</span></a></li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true"><i class="ti-layers-alt"></i> <span>Pages</span></a>
                          <ul class="collapse">
                              <li><a href="login.html">Login</a></li>
                              <li><a href="login2.html">Login 2</a></li>
                              <li><a href="login3.html">Login 3</a></li>
                              <li><a href="register.html">Register</a></li>
                              <li><a href="register2.html">Register 2</a></li>
                              <li><a href="register3.html">Register 3</a></li>
                              <li><a href="register4.html">Register 4</a></li>
                              <li><a href="screenlock.html">Lock Screen</a></li>
                              <li><a href="screenlock2.html">Lock Screen 2</a></li>
                              <li><a href="reset-pass.html">reset password</a></li>
                              <li><a href="pricing.html">Pricing</a></li>
                          </ul>
                      </li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true"><i class="fa fa-exclamation-triangle"></i>
                              <span>Error</span></a>
                          <ul class="collapse">
                              <li><a href="404.html">Error 404</a></li>
                              <li><a href="403.html">Error 403</a></li>
                              <li><a href="500.html">Error 500</a></li>
                          </ul>
                      </li>
                      <li>
                          <a href="javascript:void(0)" aria-expanded="true"><i class="fa fa-align-left"></i> <span>Multi
                                  level menu</span></a>
                          <ul class="collapse">
                              <li><a href="#">Item level (1)</a></li>
                              <li><a href="#">Item level (1)</a></li>
                              <li><a href="#" aria-expanded="true">Item level (1)</a>
                                  <ul class="collapse">
                                      <li><a href="#">Item level (2)</a></li>
                                      <li><a href="#">Item level (2)</a></li>
                                      <li><a href="#">Item level (2)</a></li>
                                  </ul>
                              </li>
                              <li><a href="#">Item level (1)</a></li>
                          </ul>
                      </li>
                  </ul>
              </nav>
          </div>
      </div>
    </div>
</template>

<script>
import MetisMenu from "metismenu";

export default {
  methods: {
    init() {
      const config = {};
      const menu = new MetisMenu(this.$refs.metismenu, config);
      menu.init();
    }
    // isPageActive(routeName) {
    //   const reg = new RegExp("/" + routeName + '/');
    //   let path = this.$route.path;
    //   if (path === PathRoot.path) {
    //     path = '/' + PathRoot.redirect.name + '/';
    //   }
    //   return reg.test(path);
    // }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="sass" scoped>
.metismenu
  li
    a
      padding: 0
      line-height: 55px
      span
        font-size: 18px
      i
        font-size: 23px
      &.has-sub:after
        top: 0
      &.no-sub:after
        content: ""
</style>
