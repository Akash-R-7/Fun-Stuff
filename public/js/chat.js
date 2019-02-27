var socket = io();          //initiating a request from clent to server to make a web socket and keep it open
   
   function scrollToBottom(){
    //selectors
    var messages = jQuery('#messages');
    var newMessages = messages.children('li:last-child');
    //height vars
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessages.innerHeight();
    var lastMessageHeight = newMessages.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
        messages.scrollTop(scrollHeight);   //setting to total height
   }

    socket.on('connect', function(){
    	console.log('Connected to the server');
        var params = jQuery.deparam(window.location.search);
        socket.emit('join', params, function(err){    //emits the event for creating private room
             if(err)
             {
                alert(err);
                window.location.href = '/';
             }
             else
                console.log('No error');
        });
    	// socket.emit('createMessage',{
     //        from : 'akash@smart.com',
     //        text : 'Marjaa jaake'
    	// });
    });  

    socket.on('disconnect', function(){
    	console.log('Disconnected from the server');
    });

    socket.on('updatedUserList', (users)=>{
        console.log('Users list', users);
        var ol =jQuery('<ol></ol>');
        users.forEach(function(user){
            ol.append(jQuery('<li></li>').text(user));
        });
        jQuery('#users').html(ol);
    });

    socket.on('newMessage', function(message){
    	console.log(message.text);
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            from : message.from,
            text : message.text,
            createdAt : formattedTime
        });
        jQuery('#messages').append(html);
        scrollToBottom();
        // var li = jQuery('<li></li>');
        // li.text(`${message.from} ${formattedTime} : ${message.text}`);
        // jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function(message){                // io.emit of location 
           var formattedTime = moment(message.createdAt).format('h:mm a');
           var template = jQuery('#location-template').html();
        var html = Mustache.render(template, {
            from : message.from,
            createdAt : formattedTime,
            url : message.url
        });
        jQuery('#messages').append(html);  
        scrollToBottom();

          // var li = jQuery('<li></li>');
          // var a = jQuery('<a target="_blank">My current location</a>') //blank opens link in new tab
          // li.text(`${message.from} ${formattedTime}`);
          // a.attr('href', message.url);    
          // li.append(a);
          // jQuery('#messages').append(li);   

    });

    jQuery('#message-form').on('submit', function(e){
        e.preventDefault();
        var messageTextBox = jQuery('[name = message]');
        socket.emit('createMessage',{
            text : messageTextBox.val()
        }, function(){
            messageTextBox.val('');
        }
        );
    });

    var locationButton = jQuery('#send-location');
    locationButton.on('click', function(){
        if(!navigator.geolocation){
            return alert('Geolocation feature not supported by your browser');
        }
        locationButton.attr('disabled', 'disabled').text('Sending location...');
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage',{
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
        }, function(){
            locationButton.removeAttr('disabled').text('Send location');
             alert('Unable to fetch location');
        });
    });