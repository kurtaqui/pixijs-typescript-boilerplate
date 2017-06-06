export const explosionParticleConfig = {
	alpha: {
		start: 0.74,
		end: 0
	},
	scale: {
		start: 6,
		end: 1.2
	},
	color: {
		start: "ffdfa0",
		end: "100f0c"
	},
	speed: {
		start: 700,
		end: 0
	},
	startRotation: {
		min: 0,
		max: 360
	},
	rotationSpeed: {
		min: 0,
		max: 200
	},
	lifetime: {
		min: 0.5,
		max: 1
	},
	blendMode: "normal",
	ease: [
		{
			s: 0,
			cp: 0.329,
			e: 0.548
		},
		{
			s: 0.548,
			cp: 0.767,
			e: 0.876
		},
		{
			s: 0.876,
			cp: 0.985,
			e: 1
		}
	],
	frequency: 0.001,
	emitterLifetime: 0.1,
	maxParticles: 100,
	pos: {
		x: 0,
		y: 0
	},
	addAtBack: true,
	spawnType: "point"
};