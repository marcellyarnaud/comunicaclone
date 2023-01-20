<template>
    <span :class="badge && 'badge-wrapper'">
        <i></i>
        <span
            v-if="badge"
            class="icon-badge"
        >
            {{ badge }}
        </span>
    </span>
  </template>
  <script>
  import { iconRetriever } from './app-icon-chooser';
  
  export default {
    name: 'AppIcon',
    props: {
      name: {
        type: String,
        required: true
      },
      badge: {
        type: [String, Number],
        default: null
      },
      fillColor: {
        type: String,
        default: null
      }
    },
    methods: {
      iconRetriever
    }
  };
  </script>
  
  <style scoped>
  .badge-wrapper {
    height: min-content;
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .icon-badge {
    --inner-size: var(--size-2);
    --size: calc(var(--inner-size) * 1.5);
    --offset: calc(var(--size) / -3.5);
    position: absolute;
    font-size: var(--inner-size);
    height: var(--size);
    width: var(--size);
    top: var(--offset);
    right: var(--offset);
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: var(--serpro-warning);
    color: white;
    font-weight: var(--font-weight-bold);
  }
  </style>
  