<template>
	<article>
		<section class="scene">
			<div class="container">
				<wheel
					class="wheel"
					:style="`transform:rotate(${get_degrees}deg);transition:${get_transition}`"
				/>
			</div>
		</section>
		<control-panel />
	</article>
</template>
<script>
import wheel from './wheel/index.vue'
import controlPanel from './control_panel.vue'

import { mapGetters } from 'vuex'

export default {
	name: 'Play',
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
		max-width: 40rem;
		margin: 0 auto;
		padding: 1rem;
		text-align: center;
		overflow: hidden;
	}
}
</style>
