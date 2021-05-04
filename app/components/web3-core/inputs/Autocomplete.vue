<template>
  <div style="position:relative">
    <validation-observer>
      <base-input
        :label="label"
        :name="name"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="updateValue($event)"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        :rules="rules"
      ></base-input>
    </validation-observer>
    <ul style="min-width: 100%;" class="dropdown-menu" :class="{ show: open }">
      <spinner v-if="loading" size="medium" />
      <li
        v-else
        class="dropdown-item"
        v-for="(suggestion, index) in matches"
        :key="index"
        v-bind:class="{ active: isActive(index) }"
        @click="suggestionClick(index)"
      >
        <span class="text-primary">
          {{ suggestion.name }} ({{suggestion.symbol}}) - {{ suggestion.address }}
          <small></small>
        </span>
      </li>
      <li v-if="noResultMessage" class="text-center">
        <span class="text-primary">No Results</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Spinner from "@/components/web3-core/spinner/Spinner";

export default {
  components: {
    Spinner
  },
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: "Label"
    },
    name: {
      type: String,
      default: "name"
    },
    type: {
      type: String,
      default: "text"
    },
    suggestions: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [String, Array, Object],
      default: ""
    }
  },
  data() {
    return {
      open: false,
      current: 0
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  computed: {
    noResultMessage() {
      return this.matches.length === 0 && !this.loading;
    },
    matches() {
      return this.suggestions.filter(obj =>
        Object.keys(obj).some(key =>
          key !== "blockNumber" && key !== "name" && key !== "symbol"
            ? obj[key].toLowerCase().includes(this.value.toLowerCase())
            : false
        )
      );
    }
  },
  methods: {
    updateValue(value) {
      if (this.open === false) {
        this.open = true;
        this.current = 0;
      }
      this.$emit("input", value);
    },
    enter(value) {
      const matched = this.matches[this.current];
      if (matched) {
        this.$emit("input", matched);
        this.$emit("complete", matched);
        this.open = false;
      }
    },
    up() {
      if (this.current > 0) {
        this.current--;
      }
    },
    down() {
      if (this.current < this.matches.length - 1) {
        this.current++;
      }
    },
    isActive(index) {
      return index === this.current;
    },
    suggestionClick(index) {
      const result = this.matches[index];
      this.$emit("complete", result);
      this.open = false;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.open = false;
        this.arrowCounter = -1;
      }
    }
  }
};
</script>

<style scoped>
.dropdown-item.active {
  background-color: #f6f9fc;
}
</style>
