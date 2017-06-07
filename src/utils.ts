import { SCREEN_SIZE } from "./settings.const";

export function generateRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function degreesToRadians(degrees: number) {
	return degrees * (Math.PI / 180);
}