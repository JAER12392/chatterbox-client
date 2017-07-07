// YOUR CODE HERE:

//Object that you send to the parse server
  var app = {
    friendList: [],
    init: function() {
    },
    handleUsernameClick: function() {
      var name = $('.username').html();
      this.friendList.push(name);
      
      // friendsList.push(event.data.value);
    },
    clearMessages: function() {
      var messages = $('#chats').children();
      for (var i = 0; i < messages.length; i++) {
        messages[i].remove();
      }
    },
    renderMessage: function(message) {
      $('#chats').append(`<p>${message}</p>`);
    },
    
    renderRoom: function(ccRoom) {
      $('#roomSelect').append(`<div>${ccRoom}</div>`);
    },
    send: function(message) {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (message) {
          console.log('chatterbox: Message sent');
        },
        error: function (message) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', message);
        }
      });
    },
    fetch: function(message) {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: undefined,
        type: 'GET',
        data: {
          format: 'json'
        },
        // contentType: 'application/json',
        success: function(data) {
          $('#chats').append(`<div>${data}</div>`);
        },
        error: function () {
          $('body').html('<p>An error has occurred</p>');
        },
        dataType: 'json'
      });
    }
  };

  