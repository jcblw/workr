workr.on('ping', function ( ) {
	console.log('ping');
	workr.trigger('pong');
});

workr.on('message', function ( msg ) {
	console.log( 'you sent: ' + msg );
});

workr.on('typeof', function ( mixed ) {
	console.log( typeof mixed );
})

workr.on('length', function ( ) {
	console.log( arguments.length );
})
