import { Sprite, loader, ticker } from "pixi.js";

import { generateRandom } from "../utils";
import { SCREEN_SIZE } from "../settings.const";

export class Asteroid extends Sprite {

	private speed = 15;
	private ticker$: ticker.Ticker;

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