import { Sprite, loader, ticker } from "pixi.js";

import { generateRandom, degreesToRadians } from "../../utils";
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
		const yPosition = generateRandom(this.height, SCREEN_SIZE.height - this.height / 2);
		this.position.set(SCREEN_SIZE.width, yPosition);
		this.ticker$ = new ticker.Ticker().add(this.startMoving.bind(this));
		this.ticker$.start();
		collisionHandler.pushEnemy(this);
	}

	private startMoving() {
		this.rotation += degreesToRadians(5);
		this.position.x -= this.speed;

		if (this.position.x < 0) {
			this.onDestroy();
		}
	}

	private onDestroy() {
		this.ticker$.stop();
		this.destroy();
	}
}