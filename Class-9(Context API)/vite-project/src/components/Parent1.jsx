import Child1 from "./Child1";
import Child2 from "./Child2";

function Parent1() {
  return (
    <>
      <div className="parent">Parent 1</div>
      <Child1 />
      <Child2 />
    </>
  );
}

export default Parent1;
