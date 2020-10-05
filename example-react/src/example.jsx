import React from "react";
import ReactDOM from "react-dom";

import ReactOverlay from "@koga73/react-overlay";

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			counter: 0
		};

		this.handler_overlay_requestClose = this.handler_overlay_requestClose.bind(this);
		this.handler_overlay_beforeShow = this.handler_overlay_beforeShow.bind(this);
		this.handler_overlay_afterShow = this.handler_overlay_afterShow.bind(this);
		this.handler_overlay_beforeHide = this.handler_overlay_beforeHide.bind(this);
		this.handler_overlay_afterHide = this.handler_overlay_afterHide.bind(this);
	}

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

		setInterval(
			function() {
				this.setState({counter: this.state.counter + 1});
			}.bind(this),
			1000
		);
	}

	handler_overlay_requestClose(detail) {
		console.log("example::handler_overlay_requestClose", detail);

		this.setState({isOpen: false});
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
					<a href="#myOverlay1" onClick={evt => this.setState({isOpen: true})}>
						Slide Down
					</a>
				</div>

				{/* This container serves as a place for your overlays to live when they are not open */}
				<div style={{display: "none"}}>
					{/* Each overlay needs an id */}
					<ReactOverlay
						id="myOverlay1"
						containerClass="slide-down"
						isOpen={this.state.isOpen}
						onRequestClose={detail => this.handler_overlay_requestClose(detail)}
						onBeforeShow={(evt, detail) => this.handler_overlay_beforeShow(evt, detail)}
						onAfterShow={(evt, detail) => this.handler_overlay_afterShow(evt, detail)}
						onBeforeHide={(evt, detail) => this.handler_overlay_beforeHide(evt, detail)}
						onAfterHide={(evt, detail) => this.handler_overlay_afterHide(evt, detail)}
					>
						<h1 onClick={evt => ReactOverlay.hide()}>Slide Down</h1>
						<p>{this.state.counter}</p>
					</ReactOverlay>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Example />, document.getElementById("root"));
