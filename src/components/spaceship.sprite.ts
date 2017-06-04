import * as _ from "lodash";
import { Sprite, Texture, loader, Point, ticker } from "pixi.js";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { globalhandler, Direction, DIRECTION } from "../handlers/index";
import { SCREEN_SIZE } from "../settings.const";

export class Spaceship extends Sprite {

	private speed = 30;
	private direction: Direction;
	private keyCommands = {
		a: DIRECTION.left,
		d: DIRECTION.right
	};

	get name() {
		return "spaceship";
	}

	constructor() {
		super();
		this.texture = loader.resources[this.name].texture;
		this.pivot.set(this.width / 2, this.height / 2);
		this.position.set(SCREEN_SIZE.width / 2, (SCREEN_SIZE.height - this.height / 2) + 10);
		ticker.shared.add(() => {
			if (this.direction) {
				this.moveAction(this.direction);
			}
		});
		globalhandler.onKeyDown()
			.map(x => _.toLower(String.fromCharCode(x.keyCode)))
			.map(x => this.keyCommands[x])
			.filter(x => x)
			.do(x => this.direction = x)
			.subscribe();

		globalhandler.onKeyUp()
			.subscribe(() => this.direction = null);
	}

	private moveAction(direction: Direction) {
		switch (direction) {
			case DIRECTION.left: {
				this.position.x -= this.speed;
				break;
			}
			case DIRECTION.right: {
				this.position.x += this.speed;
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