import * as _ from "lodash";
import { Sprite, Texture, loader } from "pixi.js";

import { globalhandler } from "../handlers/index";
import { SCREEN_SIZE } from "../settings.const";

export class Spaceship extends Sprite {

	private velocity = 25;

	get name() {
		return "spaceship";
	}

	constructor() {
		super();
		this.texture = loader.resources[this.name].texture;
		this.pivot.set(this.width / 2, this.height / 2);
		this.position.set(
			SCREEN_SIZE.width / 2,
			SCREEN_SIZE.height - this.height / 2
		);
		globalhandler.onKeyPress()
			.do(x => this.move(_.toLower(String.fromCharCode(x.keyCode))))
			.subscribe();
	}

	private move(key: string) {
		switch (key) {
			case "a": {
				this.position.x -= this.velocity;
				break;
			}
			case "d": {
				this.position.x += this.velocity;
				break;
			}
		}
		if (this.position.x < 0) {
			this.position.x = SCREEN_SIZE.width;
		} else if (this.position.x > SCREEN_SIZE.width) {
			this.position.x = 0;
		}
	}
}