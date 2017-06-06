import { Container, ticker } from "pixi.js";

import { SCREEN_SIZE } from "../../settings.const";
import { generateRandom } from "../../utils";
import { Asteroid } from "./asteroid.sprite";

export class AsteroidContainer extends Container {

	currentRunTime = 0;
	nextCreation = 20;
	constructor() {
		super();
		ticker.shared.add(delta => {
			if (this.nextCreation <= this.currentRunTime) {
				this.createAsteroid();
				this.nextCreation += generateRandom(50, 200);
			}
			this.currentRunTime += delta;
		});
	}

	createAsteroid() {
		const asteroid = new Asteroid();
		this.addChild(asteroid);
	}
}