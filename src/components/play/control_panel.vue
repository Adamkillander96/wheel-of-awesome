<template>
	<article class="panel">
		<header class="header">
			<h3>Controls</h3>
		</header>
		<section class="section">
			<div class="group">
				<button
					class="button"
					:class="[pressing_status && 'pressed', spin_status && 'rainbow']"
					:disabled="!spin_status"
					id="spin_the_wheel"
					@mousedown="press()"
					@mouseup="release()"
				>
					<span v-if="pressing_status" class="text">Charging the wheel...</span>
					<span v-else-if="spin_status" class="text">Spin the wheel</span>
					<span v-else class="text">Waiting</span>
				</button>
			</div>
		</section>
	</article>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	computed: {
		...mapGetters('wheel', ['spin_status', 'pressing_status'])
	},
	methods: {
		...mapActions('wheel', ['press', 'release'])
	}
}
</script>

<style lang="scss">
.panel {
	background: #f1f1f1;
	padding: 3rem;
	.header {
		text-align: center;
		color: #444;
	}
	.section {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
	}
}
.group {
	height: 100px;
	display: flex;
	.button {
		cursor: pointer;
		&:disabled {
			cursor: not-allowed;
			filter: grayscale(0.75);
		}
		&.rainbow {
			.text {
				color: white;
				text-shadow: 0px 2px 4px #333;
			}
			&:after {
				content: '';
				height: 100%;
				width: 100%;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				position: absolute;
				background: linear-gradient(
					220deg,
					#e81d1d,
					#e8b71d,
					#1de840,
					#2b1de8,
					#dd00f3
				);
				background-size: 500% 500%;
				animation: rainbow 30s ease infinite;
			}
			&.pressed {
				cursor: progress;
				&:after {
					animation: rainbow 5s ease infinite;
				}
			}
		}
		flex-grow: 1;
		position: relative;
		.text {
			position: relative;
			z-index: 1;
			font-size: 2rem;
			font-weight: 600;
		}
	}
}

@keyframes rainbow {
	0% {
		background-position: 0% 82%;
	}
	50% {
		background-position: 100% 19%;
	}
	100% {
		background-position: 0% 82%;
	}
}
</style>
