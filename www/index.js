import "babel-polyfill";
import React from "react";
import { render } from "react-dom";

render(<div>This is only a test.</div>, document.getElementById("app"));
