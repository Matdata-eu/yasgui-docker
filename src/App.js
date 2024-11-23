import React, { useEffect } from "react";
import Yasgui from "@zazuko/yasgui";
import "@zazuko/yasgui/build/yasgui.min.css";

export default function App() {
  useEffect(() => {
    const yasgui = new Yasgui(document.getElementById("yasgui"));
    return () => {};
  }, []);

  return <div id="yasgui" />;
}