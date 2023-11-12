import Vue from "vue";

import VueHighlightJS from 'vue-highlight.js';

import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import vue from 'vue-highlight.js/lib/languages/vue';
// import 'highlight.js/styles/monokai.css';
import '~/assets/css/git-dark.css';

Vue.use(VueHighlightJS, {
	// Register only languages that you want
	languages: {
		css,
		javascript,
		vue
	}
});
