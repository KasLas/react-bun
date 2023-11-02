import { count } from './signals/signals';

function NewComponent() {
  return <div>new components count - {count.value}</div>;
}

export default NewComponent;
