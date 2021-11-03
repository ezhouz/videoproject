<template>
  <div class="search-wrapper">
    <div class="input-group">
      <i class="icon icon-search"></i>
      <input
          v-bind:placeholder="placeholder"
          v-bind:value="searchTerm"
          v-on:change="onChange($event.target.value)"
          v-on:keyup="onKeyup($event)"
          type="search" class="form-control rounded"
          aria-label="Search"
          aria-describedby="search-addon"/>
      <button type="button" class="btn btn-primary" v-on:click="$emit('search', searchTerm)">Search</button>
    </div>

  </div>
</template>

<script>
export default {
  model: {
    prop: 'searchTerm',
    event: 'search'
  },
  props: ['placeholder'],
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    onChange(val){
      this.searchTerm = val.trim();
    },
    onKeyup(event){
      if (event.keyCode === 13) {
        this.$emit('search', this.searchTerm);
      }
    }
  }
};
</script>

<style scoped>
.search-wrapper {
  padding: 2rem 6rem;
}
.search-wrapper .btn.btn-primary {
  background-color: #699AF1;
  width: 150px;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  font-size: 1.4rem;
  border: none;
  box-shadow: 0 0.25rem 1rem #eee;

  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 5;
}
.search-wrapper input {
  padding: 4rem 4rem 4rem 6rem;
  border-radius: 1rem !important;
  box-shadow: 0 0.25rem 1rem #eee;
}
.icon-search {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
}
</style>
