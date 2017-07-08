// YOUR CODE HERE:
  // var message = {
  //   username: '',
  //   text: '',
  //   roomname:
  // };
//Object that you send to the parse server
  var app = {
    username: (window.location.href).split('=')[1],
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    init: function() {
      $('.username').on('click', this.handleUsernameClick);
      $('button').on('click', this.handleOnSubmit);
    },
    handleOnSubmit: function(event) {
      event.preventDefault();
      var text = $('input').val();
      var username = (window.location.href).split('=')[1];
      $('#chats').prepend(`<p>${username} ${text}</p>`);
    },
    handleUsernameClick: function(event) {
      var name = event.target.innerText;  
    },
    clearMessages: function() {
      var messages = $('#chats').children();
      for (var i = 0; i < messages.length; i++) {
        messages[i].remove();
      }
    },
    renderMessage: function(message) {
      var username = message.username;
      var roomname = message.roomname;
      var text = message.text;
      $('#chats').append(`<p>${message.username} ${message.text}</p>`);
    },
    
    renderRoom: function(ccRoom) {
      $('#roomSelect').append(`<div>${ccRoom}</div>`);
    },
    send: function(message) {
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: this.server,
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (message) {
          app.renderMessage(message);
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
        url: this.server,
        type: 'GET',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (message) {
          console.log(message);
          for (var i = 0; i < message.results.length; i++) {
            app.renderMessage(message.results[i]);
          }
        },
        error: function (message) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', message);
        }
      });
    }
  };