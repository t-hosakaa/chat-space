$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = `<div class="Contents">
                    <div class="User">
                      <p class="User__name">
                        ${message.user_name}
                      </p>
                      <p class="User__time">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="Message">
                      <p class="Message__text">
                        ${message.content}
                      </p>
                      <img class="Message__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="Contents">
                    <div class="User">
                      <p class="User__name">
                        ${message.user_name}
                      </p>
                      <p class="User__time">
                        ${message.created_at}
                      </p>
                    </div>
                    <div class="Message">
                      <p class="Message__text">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let url = $(this).attr('action');
    let formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-space').append(html)
      $('.Chat-space').animate({ scrollTop: $('.Chat-space')[0].scrollHeight });
      $('form')[0].reset();
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});