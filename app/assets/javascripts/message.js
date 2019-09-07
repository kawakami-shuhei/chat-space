$(function() {
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    console.log(this)
    var message = new FormDate(this);
    var url = $(this).attr('create')
    $.ajax({
      url: url,
      type: "POST",
      date: formdate,
      datetype: 'json',
      processDate: false,
      contentType: false
    })
  })
});