<template>
  <svg class="spinner">
    <circle>
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="-90;810"
        keyTimes="0;1"
        dur="2s"
        repeatCount="indefinite"
      ></animateTransform>
      <animate
        attributeName="stroke-dashoffset"
        values="0%;0%;-157.080%"
        calcMode="spline"
        keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
        keyTimes="0;0.5;1"
        dur="2s"
        repeatCount="indefinite"
      ></animate>
      <animate
        attributeName="stroke-dasharray"
        values="0% 314.159%;157.080% 157.080%;0% 314.159%"
        calcMode="spline"
        keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
        keyTimes="0;0.5;1"
        dur="2s"
        repeatCount="indefinite"
      ></animate>
    </circle>
  </svg>
</template>
<style scoped>
.spinner {
  --spinner-color: hsl(216, 100%, 68%);
}
.dark.spinner {
  --spinner-color: hsl(202, 100%, 68%);
}

.spinner {
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  padding: 3px;
  overflow: visible;
}
.spinner > circle {
  fill: none;
  stroke: var(--spinner-color);
  cx: 50%;
  cy: 50%;
  r: 50%;
  stroke-width: 6px;
  stroke-linecap: round;
  transform-origin: center;
}
</style>
