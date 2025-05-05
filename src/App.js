import BatchCoordinatesMessage from "./components/BatchCoordinatesMessage";

// import LiveCoordinateMarker from "./components/LiveMarker";

import MapWithPath from "./components/MapWithPath";
function App() {
  const batchId = "c46ebd14-b92b-4f5f-b79b-36d2e2a092c0";

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
