import Card from "./components/Card";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <NavBar />
      </div>

      <div>
        <Card title="Iphone 17 Pro" description="Random" price="150000 Rs." />
        <Card
          title="Apple MackBook Pro M4"
          description="Best Macbook in the Market"
          price="250000 Rs."
        />
        <Card
          title="Bose Headphones"
          description="Best headphones in the Market"
          price="25000 Rs."
        />
        <Card
          title="Apple Airpods"
          description="Best airpods in the Market"
          price="30000 Rs."
        />
      </div>
    </div>
  );
}

export default App;
