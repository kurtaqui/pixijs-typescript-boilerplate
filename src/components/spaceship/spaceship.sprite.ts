import * as _ from "lodash";
import { Sprite, Texture, loader, Point, ticker } from "pixi.js";
import { Emitter } from "pixi-particles";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

import {
	collisionHandler,
	globalhandler,
	Direction,
	DIRECTION
} from "../../handlers/index";
import { SCREEN_SIZE } from "../../settings.const";
import { degreesToRadians } from "../../utils";
import { ParticleImage } from "../../assets/index";
import { explosionParticleConfig } from "./spaceship.const";

export class Spaceship extends Sprite {

	private particleEmitter: Emitter;
	private speed = 30;
	private direction: Direction;
	private keyCommands = {
		w: DIRECTION.up,
		s: DIRECTION.down
	};

	get name() {
		return "spaceship";
	}

	constructor() {
		super();
		this.init();

		let particleElapsed = Date.now();

		ticker.shared.add(() => {
			if (this.direction) {
				this.moveAction(this.direction);
			}
			const now = Date.now();
			this.particleEmitter.update((now - particleElapsed) * 0.001);
			particleElapsed = now;
		});

		const collisionHandler$ = collisionHandler.setPlayer(this)
			.throttle(x => Observable.timer(500))
			.do(() => this.particleEmitter.emit = true);

		const onKeyDown$ = globalhandler.onKeyDown()
			.map(x => _.toLower(String.fromCharCode(x.keyCode)))
			.map(x => this.keyCommands[x])
			.filter(x => x)
			.do(x => this.direction = x);

		const onKeyUp$ = globalhandler.onKeyUp()
			.do(() => this.direction = null);

		const data$$ = Observable.merge(
			collisionHandler$,
			onKeyDown$,
			onKeyUp$
		).subscribe();
	}

	private init() {
		this.texture = loader.resources[this.name].texture;
		this.pivot.set(this.width / 2, this.height / 2);
		const config = {
			...explosionParticleConfig, ...{
				pos: {
					x: this.width / 2,
					y: this.height / 2
				}
			}
		};
		this.particleEmitter = new Emitter(
			this,
			Texture.fromImage(ParticleImage),
			config
		);
		this.particleEmitter.emit = false;
		this.position.set(this.height + 10, (SCREEN_SIZE.height / 2));
		this.rotation = degreesToRadians(90);
	}

	private moveAction(direction: Direction) {
		switch (direction) {
			case DIRECTION.up: {
				this.position.y -= this.speed;
				break;
			}
			case DIRECTION.down: {
				this.position.y += this.speed;
				break;
			}
		}
		if (this.position.y < 0) {
			this.position.y = SCREEN_SIZE.height;
		} else if (this.position.y > SCREEN_SIZE.height) {
			this.position.y = 0;
		}
	}

}