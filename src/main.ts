import { Application, IApplicationOptions, loader } from "pixi.js";

import { SpaceshipImage } from "./assets";
import { Spaceship } from "./components";
import { SCREEN_SIZE } from "./settings.const";

export class Main {
	private app: Application;
	private settings: IApplicationOptions = {
		backgroundColor: 0x000000,
		antialias: true,
		autoResize: true,
		resolution: window.devicePixelRatio
	};

	constructor() {
		this.app = new Application(SCREEN_SIZE.width, SCREEN_SIZE.height, this.settings);
		this.resize();
		document.body.appendChild(this.app.view);
		window.onresize = this.resize.bind(this);
		loader.add(Spaceship.prototype.name, SpaceshipImage)
			.load(this.setup.bind(this));
	}

	private setup() {
		const spaceship = new Spaceship();
		this.app.stage.addChild(spaceship);
	}

	private resize() {
		const ratio = Math.min(window.innerWidth / SCREEN_SIZE.width,
			window.innerHeight / SCREEN_SIZE.height);
		this.app.stage.scale.x = this.app.stage.scale.y = ratio;
		this.app.renderer.resize(Math.ceil(SCREEN_SIZE.width * ratio),
			Math.ceil(SCREEN_SIZE.height * ratio));
	}
}