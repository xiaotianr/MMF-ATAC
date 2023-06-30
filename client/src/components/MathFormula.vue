<template>
    <span ref="formulaContainer" v-html="processedFormula"></span>
  </template>

  <script>
  export default {
    props: {
      formula: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        processedFormula: ''
      };
    },
    watch: {
      formula() {
        this.renderFormula();
      }
    },
    mounted() {
      this.renderFormula();
    },
    methods: {
      renderFormula() {
        this.processedFormula = this.formula;
        this.$nextTick(() => {
          if (window.MathJax) {
            window.MathJax.typesetPromise([this.$refs.formulaContainer]);
          }
        });
      }
    }
  };
  </script>
  