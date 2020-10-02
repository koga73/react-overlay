import React from "react";
import ReactDOM from "react-dom";

import ReactOverlay from "@koga73/react-overlay";

class Example extends React.Component {
	componentDidMount() {
		/* Trigger overlay programmatically on load */
		var div = document.createElement("div");
		div.innerHTML = "Triggered programmatically";
		Overlay.show(div, {
			containerClass: "slide-up"
			//width:"50%",
			//height:"50%",
			//userClosable:false
		});
	}

	handler_overlay_beforeShow(evt, detail) {
		console.log("example::handler_overlay_beforeShow", evt, detail);
	}
	handler_overlay_afterShow(evt, detail) {
		console.log("example::handler_overlay_afterShow", evt, detail);
	}
	handler_overlay_beforeHide(evt, detail) {
		console.log("example::handler_overlay_beforeHide", evt, detail);
	}
	handler_overlay_afterHide(evt, detail) {
		console.log("example::handler_overlay_afterHide", evt, detail);
	}

	render() {
		return (
			<div>
				{/* Page content. Buttons to trigger overlays. "data-overlay-page-wrap" is used for trapping focus inside the overlay as an accessibility enhancement */}
				<div id="container" data-overlay-page-wrap>
					<a href="#myOverlay1" onClick={evt => ReactOverlay.show(evt.target.href)}>
						Slide Down
					</a>
				</div>

				{/* This container serves as a place for your overlays to live when they are not open */}
				<div style={{display: "none"}}>
					{/* Each overlay needs an id */}
					<ReactOverlay
						id="myOverlay1"
						containerClass="slide-down"
						onBeforeShow={(evt, detail) => this.handler_overlay_beforeShow(evt, detail)}
						onAfterShow={(evt, detail) => this.handler_overlay_afterShow(evt, detail)}
						onBeforeHide={(evt, detail) => this.handler_overlay_beforeHide(evt, detail)}
						onAfterHide={(evt, detail) => this.handler_overlay_afterHide(evt, detail)}
					>
						<h1>Slide Down</h1>
					</ReactOverlay>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Example />, document.getElementById("root"));
