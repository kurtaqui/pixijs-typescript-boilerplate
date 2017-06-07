import { extras, ticker, loader } from "pixi.js";

import { SCREEN_SIZE } from "../../settings.const";

export class BackgroundTilingSprite extends extras.TilingSprite {

	get name() {
		return "background";
	}

	constructor() {
		const texture = loader.resources[BackgroundTilingSprite.prototype.name].texture;
		super(texture, SCREEN_SIZE.width, SCREEN_SIZE.height);
		this.resize();
		this.position.set(0, 0);
		this.tilePosition.set(0, 0);
		ticker.shared.add(() => {
			this.tilePosition.x -= 3;
		});
	}

	private resize() {
		const ratio = Math.max(SCREEN_SIZE.width / this.texture.width,
			SCREEN_SIZE.height / this.texture.height);
		this.tileScale.x = this.tileScale.y = ratio;
	}
}