import "./scss/main.scss";
import "bootstrap/js/dist/collapse";
import Vue from 'vue';


Vue.directive('scroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

// main
new Vue({
    el: '#app',
    data: {
        show: false
    },

    methods: {
        handleScroll(evt, el) {
            if (window.scrollY > 50) {
                el.setAttribute(
                    'style',
                    'background-color: #222222'
                )
            }
            return window.scrollY > 100
        },

        scrollMeTo(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;

            window.scrollTo(0, top);
        },
    }
})
