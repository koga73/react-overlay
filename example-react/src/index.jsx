import React from "react";
import ReactDOM from "react-dom/client";

import ReactOverlay from "@koga73/react-overlay";

import "./index.scss";

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
		//Specify the the container and pageWrap element when using React-DOM 18
		ReactOverlay.update({
			container: document.getElementById("root"),
			pageWrap: document.getElementById("page")
		});

		/* Trigger overlay programmatically on load */
		var div = document.createElement("div");
		div.innerHTML = "Triggered programmatically";
		ReactOverlay.show(div, {
			containerClass: "slide-up"
			//width:"50%",
			//height:"50%",
			//userClosable:false
		});

		setInterval(
			function () {
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
			<React.Fragment>
				<main id="page">
					<a href="#myOverlay1" onClick={(evt) => this.setState({isOpen: true})}>
						Slide Down
					</a>
				</main>

				{/* This container serves as a place for your overlays to live when they are not open */}
				<div style={{display: "none"}}>
					{/* Each overlay needs an id */}
					<ReactOverlay
						id="myOverlay1"
						containerClass="slide-down"
						isOpen={this.state.isOpen}
						onRequestClose={(detail) => this.handler_overlay_requestClose(detail)}
						onBeforeShow={(evt, detail) => this.handler_overlay_beforeShow(evt, detail)}
						onAfterShow={(evt, detail) => this.handler_overlay_afterShow(evt, detail)}
						onBeforeHide={(evt, detail) => this.handler_overlay_beforeHide(evt, detail)}
						onAfterHide={(evt, detail) => this.handler_overlay_afterHide(evt, detail)}
					>
						<h1 onClick={(evt) => this.setState({isOpen: false})}>Slide Down</h1>
						<p>{this.state.counter}</p>
						<button onClick={(evt) => this.setState({isOpen: false})}>Close</button>
					</ReactOverlay>
				</div>
			</React.Fragment>
		);
	}
}

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<Example />);
