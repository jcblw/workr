## Workr 

workr.js allow for event binding from web workers.

### Settup

Include the library, and then create a new workr.

##### on main thread

```javascript
var worker = new Workr({
	src : '/js/myworker.js', // your worker script
	script : '/js/workr.js' // path to workr lib
})
```
_note : I really want to get rid of this pathing back to this original file,
Ideas comments?_

##### in worker

there really isnt anything you need to setup inside the worker, just note that the `workr` variable is `global` and is what you need to bind to for events from main thread.

_this is also something i would like to change_

### Events

for workr we use the common `on` and `trigger` methods.

#### In main thread or worker

```javascript
// bind to event
workr.on('message', function( title, body ) {
	console.log("New message:", title, body );
	// you can pass arguments - no functions tho
	workr.trigger('reply', 'I got it!');
});
// even events trees
workr.on('doc', function ( state ){
	console.log('Document state: ' + state );
});
workr.trigger('doc:start');
workr.trigger('doc:processing');
workr.trigger('doc:done');
```
there is a bunch more event stuff built in with [Marrow.js](https://github.com/jacoblwe20/marrow) checkout that repo for more information on events






