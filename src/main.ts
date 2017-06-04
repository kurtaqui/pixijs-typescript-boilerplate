import { Application, IApplicationOptions, loader } from "pixi.js";

import { SpaceshipImage } from "./assets/index";
import { Spaceship } from "./components/index";
import { ResizeHandler } from "./handlers/index";
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
		new ResizeHandler().get()
			.startWith({})
			.subscribe(() => this.resize());

		document.body.appendChild(this.app.view);

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