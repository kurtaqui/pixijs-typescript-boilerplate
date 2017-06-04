import { Observable } from "rxjs/Observable";

class ResizeHandler {

	private resize$: Observable<Event>;

	constructor() {
		this.resize$ = Observable.fromEvent(window, "resize");
	}

	get(): Observable<Event> {
		return this.resize$;
	}

}

export const resizeHandler = new ResizeHandler();