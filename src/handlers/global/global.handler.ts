import { Observable } from "rxjs/Observable";

class GlobalHandler {
	onKeyDown(): Observable<KeyboardEvent> {
		return Observable.fromEvent(document, "keydown");
	}

	onKeyUp(): Observable<KeyboardEvent> {
		return Observable.fromEvent(document, "keyup");
	}

	onResize(): Observable<Event> {
		return Observable.fromEvent(window, "resize");
	}
}

export const globalhandler = new GlobalHandler();