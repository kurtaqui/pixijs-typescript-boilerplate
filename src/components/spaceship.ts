import { Sprite, Texture, loader } from "pixi.js";

import { SCREEN_SIZE } from "../settings.const";

export class Spaceship extends Sprite {

	get name() {
		return "spaceship";
	}

	constructor() {
		super();
		this.texture = loader.resources[this.name].texture;
		this.pivot.set(
			this.width / 2,
			this.height / 2
		);
		this.position.set(
			SCREEN_SIZE.width / 2,
			SCREEN_SIZE.height - this.height / 2
		);
	}
}