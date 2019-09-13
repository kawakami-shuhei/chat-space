$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var img  = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
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
                      ${message.body}
                    </p>
                    ${img}                
                  </div>
                </div>`   
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message_data) {
      var html = buildHTML(message_data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data) {
      alert('エラーが発生したためメッセージは送信できませんでした');
    })
    .always(function(data) {
      $('.submit-btn').prop('disabled', false);
    })  
  })
  
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);       
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});