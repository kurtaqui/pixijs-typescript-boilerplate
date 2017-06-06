import { Sprite, ticker } from "pixi.js";

export interface EnemySprite extends Sprite {
	ticker$: ticker.Ticker;
}