import { computed } from '@preact/signals-react';
// import the exported state
import { count } from './signals/signals';

// returns a computed value automatically updated when the dependant signal changes.
// Auto detects the dependant signals no need for a dependancy array
const doubleCount = computed(() => {
  console.log('computed fires');
  return count.value * 2;
});

function NewComponent() {
  return <div>new components count - {doubleCount.value}</div>;
}

export default NewComponent;
