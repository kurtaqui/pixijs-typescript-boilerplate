import { Observable } from "rxjs/Observable";

class GlobalHandler {
	onKeyPress(): Observable<KeyboardEvent> {
		return Observable.fromEvent(document, "keypress");
	}

	onResize(): Observable<Event> {
		return Observable.fromEvent(window, "resize");
	}
}

export const globalhandler = new GlobalHandler();