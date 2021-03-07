import { createStore, createLogger } from 'vuex'

import wheel from './wheel'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	modules: {
		wheel
	},
	strict: debug,
	plugins: debug ? [createLogger()] : []
})
