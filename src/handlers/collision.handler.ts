import { Sprite } from "pixi.js";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { EnemySprite } from "../components/index";

export class CollisionHandler {

	private player: Sprite;
	private isHit$ = new Subject<boolean>();

	setPlayer(player: Sprite): Observable<boolean> {
		this.player = player;
		return this.isHit$.asObservable();
	}

	pushEnemy(enemy: EnemySprite) {
		this.startCollisionChecking(enemy);
	}

	private startCollisionChecking(enemy: EnemySprite) {
		enemy.ticker$.add(delta => {
			if (enemy.ticker$.started) {
				const isHit = this.collisionDetection(this.player, enemy);
				if (isHit) {
					this.isHit$.next(isHit);
				}
			}
		});
	}

	private collisionDetection(spriteA: Sprite, spriteB: Sprite): boolean {
		const combinedHalfWidth = (spriteA.width / 2) + (spriteB.width / 2);
		const combinedHalfHeight = (spriteA.height / 2) + (spriteB.height / 2);
		const distanceX = spriteA.x - spriteB.x;
		const distanceY = spriteA.y - spriteB.y;

		if ((Math.abs(distanceX) < combinedHalfWidth) &&
			(Math.abs(distanceY) < combinedHalfHeight)) {
			return true;
		}

		return false;
	}
}

export const collisionHandler = new CollisionHandler();