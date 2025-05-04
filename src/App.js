import BatchCoordinatesMessage from "./components/BatchCoordinatesMessage";

// import LiveCoordinateMarker from "./components/LiveMarker";

import MapWithPath from "./components/MapWithPath";
function App() {
  const batchId = "1d16c100-f95d-4b46-8faf-5f8a2ca93f27";

  return (
    <div style={{ padding: "20px" }}>
      <BatchCoordinatesMessage batchId={batchId} />
      <br />
      <br />
      <br />
      {/* <LiveCoordinateMarker /> */}
      <MapWithPath />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
