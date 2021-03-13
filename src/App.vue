<template>
	<play />
</template>

<script setup>
import play from './components/play/index.vue'
</script>

<style lang="scss">
:root {
	--white: #f1f1f1;
	--black: #222;
	--blue: #2364aa;
	--red: #d63230;
	--green: #82d173;
	--yellow: #ffc857;
	--orange: #f39237;
	--sky: #40bcd8;
	--purple: #5b1865;
	--pink: #d664be;
	--sea: #03cea4;
	--free: #3d8b2d;
}
*,
*:after,
*:before {
	box-sizing: border-box;
}
body {
	margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
}
button {
	margin: 0;
	padding: 0.6rem 0.9rem;
	border: 1px solid #d7d7d7;
	border-radius: 0;
	color: #444;
	background: #d7d7d7;
}
.wheel-of-awesome {
	position: relative;
	min-height: 100vh;
	> * {
		position: relative;
		z-index: 1;
	}
	&:before {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		background: #4b79a1; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to top,
			#283e51,
			#0a2342
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to top,
			#283e51,
			#0a2342
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background: -olinear-gradient(to top, #283e51, #0a2342);
		height: 100vh;
	}
	&:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: block;
		background: url('./src/assets/img/stars.png') repeat top center;
		z-index: 0;
	}
}
</style>
