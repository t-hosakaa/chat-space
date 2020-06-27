$(function(){
  function buildHTML(user){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    return html;
  }

  function buildErrMsgHTML(){
    let html = `<div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>`;
    return html;
  }

  $('#UserSearch__field').on('keyup', function(){
    let input = $('#UserSearch__field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users){
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          $("#UserSearchResult").append(buildHTML(user));
        })
      } else if (input.length == 0) {
        return false;
      } else {
        $("#UserSearchResult").append(buildErrMsgHTML());
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $('form').on('click', '.ChatMember__add', function(){
    let UserName = $(this).data('user-name');
    let UserId = $(this).data('user-id');
    let html = `<div class="ChatMember">
                  <p class="ChatMember__name">${UserName}</p>
                  <input name="group[user_ids][]" type="hidden" value="${UserId}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>`;
    $(this).parent().remove();
    $('.ChatMembers').append(html);
  });

  $('form').on('click', '.ChatMember__remove', function(){
    $(this).parent().remove();
  });

});