import { Sprite, loader, ticker } from "pixi.js";

import { generateRandom } from "../../utils";
import { collisionHandler} from "../../handlers/index";
import { SCREEN_SIZE } from "../../settings.const";
import { EnemySprite } from "../sprite.model";

export class Asteroid extends Sprite implements EnemySprite {

	ticker$: ticker.Ticker;
	private speed = 15;

	get name() {
		return "asteroid";
	}

	constructor() {
		super();
		this.texture = loader.resources[this.name].texture;
		this.pivot.set(this.width / 2, this.height / 2);
		const xPosition = generateRandom(this.width / 2, SCREEN_SIZE.width - this.width / 2);
		this.position.set(xPosition, -this.height);
		this.ticker$ = new ticker.Ticker().add(this.startMoving.bind(this));
		this.ticker$.start();
		collisionHandler.pushEnemy(this);
	}

	private startMoving() {
		this.rotation += 5 * (Math.PI / 180);
		this.position.y += this.speed;

		if (this.position.y > SCREEN_SIZE.height) {
			this.onDestroy();
		}
	}

	private onDestroy() {
		this.ticker$.stop();
		this.destroy();
	}
}