var __this = this,
	Workr = Marrow( function Workr( options ){
		options = options || {};
		this.options = options;
		this.isWorker = !( 'document' in __this );
		this.support = ( 'Worker' in __this );
		if ( !this.isWorker ) { 
			if ( !this.support ) {
				return this.emit('error', new Error('Current Enviroment' +
					' does not support webworkers'));
			}

			this.worker = new Worker( options.script );
		} 
		this.startListening( );
	},{
		trigger : function ( ) {
			var args = [].slice.call( arguments );
			args = this.serialize( args );
			if ( this.isWorker ) {
				return __this.postMessage( args );
			}
			this.worker.postMessage( args );
		},
		isValid : function ( _event ) {
			if ( typeof _event !== 'object') return;
			if ( typeof _event[0] !== 'string' ) return;
			return true;
		},
		startListening : function ( ) {
			var _this = this;
			function handler ( msg ) {
				var _event = _this.deserialize( msg.data ),
					isEvent = _this.isValid( _event );
				if ( isEvent ) {
					_this.emit.apply( _this, _event );
				}
			}
			if ( this.isWorker ) {
				__this.onmessage = handler;
				this.on( 'loadScript', function ( src ) {
					if ( typeof src === 'string' ) {
						importScripts( src );
					}
				});
				return;
			}
			this.worker.onmessage = handler;
			this.trigger('loadScript', this.options.src );
		},
		serialize : function ( data ) {
			var value;
			try {	
				value = JSON.stringify( data );
			} catch ( e ) {
				value = data;
			}
			return value;
		},
		deserialize : function ( data ) {
			var value;
			try {	
				value = JSON.parse( data );
			} catch ( e ) {
				value = data;
			}
			return value;
		}
	});

if ( !( 'document' in __this ) ) {
	// i dont know about this
	__this.workr = new Workr( );
}