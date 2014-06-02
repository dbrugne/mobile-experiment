// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

  /* ---------------------------------- Local Variables ---------------------------------- */
  var homeTpl = Handlebars.compile($("#home-tpl").html());
  var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
  var adapter = new LocalStorageAdapter();
  adapter.initialize().done(function () {
    console.log("Data adapter initialized");
    renderHomeView();
  });

  /* --------------------------------- Event Registration -------------------------------- */
  document.addEventListener('deviceready', function () {
    FastClick.attach(document.body);
    if (navigator.notification) { // Override default HTML alert with native dialog
      window.alert = function (message) {
        navigator.notification.alert(
          message,    // message
          null,       // callback
          "Workshop", // title
          'OK'        // buttonName
        );
      };
    }
  }, false);

  /* ---------------------------------- Local Functions ---------------------------------- */
  function findByName() {
      adapter.findByName($('.search-key').val()).done(function (employees) {
        $('.employee-list').html(employeeLiTpl(employees));
      });
  }

  function renderHomeView() {
    $('body').html(homeTpl());
    $('.search-key').on('keyup', findByName);
  }

}());