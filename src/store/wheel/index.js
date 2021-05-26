const state = () => ({
	can_spin: true,
	is_pressing: false,
	strength: 0,
	spin_power: 0,
	degrees: 0,
	transition: 'none',
	message: {},
	hold: null
})

const getters = {
	spin_status: (state) => state.can_spin,
	pressing_status: (state) => state.is_pressing,
	get_strength: (state) => state.strength,
	get_spin_power: (state) => state.spin_power,
	get_degrees: (state) => state.degrees,
	get_transition: (state) => state.transition,
	get_message: (state) => state.message,
	get_hold: (state) => state.hold
}

const mutations = {
	set_can_spin(state, status) {
		return (state.can_spin = status)
	},
	set_pressed(state, status) {
		return (state.is_pressing = status)
	},
	set_strength(state, force = {}) {
		if (force.increase) {
			return (state.strength += force.increase)
		}
		return (state.strength = 0)
	},
	set_spin_power(state, power) {
		return (state.spin_power = power)
	},
	set_degrees(state, { deg, reset }) {
		if (reset) {
			return (state.degrees = deg)
		}
		return (state.degrees += deg)
	},
	set_transition(state, transition) {
		return (state.transition = transition)
	},
	set_message(state, message) {
		return (state.message = message)
	},
	set_hold(state, interval) {
		return (state.hold = interval)
	}
}

const actions = {
	press({ commit, getters }) {
		commit('set_pressed', true)
		commit(
			'set_hold',
			setInterval(() => {
				if (getters.get_strength === 100) {
					return clearInterval(getters.get_hold)
				}
				commit('set_strength', { increase: 2 })
			}, 50)
		)
	},
	release({ commit, dispatch, getters }) {
		commit('set_can_spin', false)
		commit('set_pressed', false)
		clearInterval(getters.get_hold)
		dispatch('spin_the_wheel').then(() => {
			const deg = getters.get_degrees
			const wedge_index = Number((deg / 15).toFixed(0))
			const positive_deg = deg > 0
			let index
			console.log(wedge_index)
			if (positive_deg) {
				index = 25 - wedge_index
			} else {
				const make_it_positive = ('' + wedge_index).replace('-', '')
				index = make_it_positive
			}
			console.log(index)
			const { money, special } = document.querySelector(
				`.wedge[data-index="${index}"]`
			).dataset
			commit('set_message', {
				text: money || special
			})
		})
	},
	/**
	 * The function that makes the wheel spin and stop.
	 * @description First we take the strength, which is 2.5-100, times 10, times a randomized number.
	 * We use this as the degres the wheel spins. 360 is one full spin.
	 *
	 * Then we add CSS transition to the wheel element.
	 * After this we set the stance variable, which is bound to the transform rotate deg in the html. We also reset the strength variable.
	 *
	 * At this stage, we see the wheel spin across 6 seconds. This is a todo, because I want dynamic spin times based on the strength the user has.
	 *
	 * After 6 seconds, we remove the CSS transition property. And then set the stance value the lowest possible equivalent deg.
	 * Ie: if its 540, we should set it to 180. Because thats the same visually.
	 * We do this because in the longrun, the deg could be really high, when it really does not need to.
	 */
	spin_the_wheel({ commit, getters }) {
		return new Promise((resolve, reject) => {
			const deg = getters.get_strength * 10 * (Math.random() + 2)
			commit('set_transition', '6s ease-out')
			commit('set_degrees', { deg: deg || 2 })
			commit('set_strength')
			try {
				setTimeout(() => {
					commit('set_transition', 'none')

					const remove_the_full_nr = getters.get_degrees / 360
					const deg_without_the_full_nr = Number(remove_the_full_nr.toFixed(0))
					const the_decimals = remove_the_full_nr - deg_without_the_full_nr

					commit('set_degrees', { deg: 360 * the_decimals, reset: true })
					commit('set_can_spin', true)
					resolve()
				}, 6000)
			} catch (err) {
				reject(err)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
