<template>
	<main>
		<section class="scene">
			<div class="container">
				<h2>Spin the wheel!</h2>
				<wheel
					class="wheel"
					:style="`transform:rotate(${get_degrees}deg);transition:${get_transition}`"
				></wheel>
			</div>
		</section>
		<control-panel></control-panel>
	</main>
</template>
<script>
import wheel from './wheel.vue'
import controlPanel from './control_panel.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
	components: {
		wheel,
		controlPanel
	},
	computed: {
		...mapGetters('wheel', ['get_degrees', 'get_transition'])
	}
}
</script>

<style lang="scss">
.scene {
	padding: 3rem;
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem;
		text-align: center;
	}
}
</style>
