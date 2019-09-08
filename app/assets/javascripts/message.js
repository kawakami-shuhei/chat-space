$(function() {
  function buildHTML(message) {
    var body = message.body ? `${ message.body }` : "";
    var img  = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.data}
                    </div>
                  </div>
                  <div class="message__upper-text">
                    <p class="lower-message__content">
                      ${body}
                    </p>
                    ${img}                
                  </div>
                </div>`   
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('create');
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_body').val('');
      $('#message_image').val('');
    })
    .fail(function(data) {
      alert('エラーが発生したためメッセージは送信できませんでした');
    })
    .always(function(data) {
      $('.submit-btn').prop('disabled', false);
    })
    .done(function scrollBottom(){
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
    })
  })
});