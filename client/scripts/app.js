//Object that you send to the parse server
  var app = {
    // holderMessage: {
    //   username: app.username,
    //   text: '',
    //   roomname: ''
    // },
    username: (window.location.href).split('=')[1],
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    init: function() {
      $('.username').on('click', this.handleUsernameClick);
      $('.username').html(`<h3>Welcome back, ${app.username}!</h3>`);
      $('button .submit').on('click', this.handleOnSubmit);
      $('#roomselect').on('click', this.renderRooms);
      $('.go').on('click', this.handleRoomClick);
    },
    handleOnSubmit: function(event) {
      event.preventDefault();
      var text = $('input').val();
      var username = (window.location.href).split('=')[1];
      $('#chats').prepend(`<p>${username} ${text}</p>`);

      var obj = {};
      obj.username = username;
      obj.text = text;
      app.send(obj);
      $('input').val('');
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
    handleRoomClick: function() {
      var roomName = $('select').val();
      $('#chats').html('');
      return roomName;
    },
    renderMessage: function(message) {
      var username = message.username;
      var roomname = message.roomname;
      var text = message.text;

      $newNode = $(`<p></p>`);
      $newNode.text(username);
      $newNode.text(text);
      // $('#chats').append(`<p>${message.username} ${message.text}</p>`);
      $('#chats').append($newNode);
      console.log($('#chats'));
    },
    renderRooms: function(object) {
      for (var room in object) {
        if (typeof object[room] === 'string' && object[room] !== 'click' && object[room] !== '') {
          var node = (`<option value=${object[room]}>${object[room]}<option>`);
          $('#roomselect').append(node);
        }
      }
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
        error: function(message) {
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
        data: {'order': '-createdAt'},
        contentType: 'application/json',
        success: function (message) {
          var rooms = {};
          for (var i = 0; i < message.results.length; i++) {
            // console.log(message.results[i]);
              app.renderMessage(message.results[i]);
              rooms[message.results[i].roomname] = '' + message.results[i].roomname;  
          }
          app.renderRooms(rooms);
        },
        error: function (message) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', message);
        }
      });
    }
  };