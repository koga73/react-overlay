# react-overlay

A React implementation of [https://github.com/koga73/overlay](https://github.com/koga73/overlay)

-   A simple responsive modal system for the web
-   Fully accessible
-   Easy to style

---

## Accessibility

Overlay has been designed to be completely accessible. Features are as follows:

-   Fallback text for "X" icon reads "Close"
-   Escape key closes the Overlay
-   Focus is given to top-most Overlay shown if there are multiple
-   Traps keyboard focus so the user can't tab to the page behind the Overlay
-   Focus is restored to original element after Overlay is closed
-   Traps screen-reader in Overlay by giving page content z-index="-1" and aria-hidden="true"
-   Overlay is announced via "Dialog Start" when shown
-   Default aria-label "Overlay" is added unless element has aria-label or aria-labelledby

---

## Install

```bash
npm install @koga73/react-overlay
```

---

## Import

JSX

```jsx
import ReactOverlay from "@koga73/react-overlay";
```

SCSS

```scss
@import "@koga73/react-overlay";
```

---

## Usage

This component can be used in a controlled or uncontrolled manner - meaning the parent controls the Overlay open state (controlled) or not (uncontrolled)

###### Uncontrolled implementation

Use the uncontrolled implementation if you don't care about maintaining the Overlay shown state

<!-- prettier-ignore -->
```jsx
import React from "react";
import ReactOverlay from "@koga73/react-overlay";

 //Be sure to import Overlay styles in here: @import "@koga73/react-overlay"
 //Or customize, styles can be found here: https://github.com/koga73/overlay/tree/master/css
import "./example.scss";

class App extends React.Component {
	render() {
		return (
			<div>
				<div data-overlay-page-wrap>
					<h1>Page content</h1>
					<button onClick={evt => ReactOverlay.show("myOverlay")}>Show Overlay</button>
				</div>

				<div style={{display: "none"}}>
					<ReactOverlay id="myOverlay">
						<p>Some content</p>
					</ReactOverlay>
				</div>
			</div>
		);
	}
}
```

###### Controlled implementation (Class based)

Use the controlled implementation if you want your parent to maintain the visibility of the Overlay. This implementation is shown using a standard React class.

<!-- prettier-ignore -->
```jsx
import React from "react";
import ReactOverlay from "@koga73/react-overlay";

 //Be sure to import Overlay styles in here: @import "@koga73/react-overlay"
 //Or customize, styles can be found here: https://github.com/koga73/overlay/tree/master/css
import "./example.scss";

class App extends React.Component {
	constructor(props) {
		this.super(props);

		this.state = {
			isOpen: false //You can pass in an initial value here
		};
	}

	render() {
		return (
			<div>
				<div data-overlay-page-wrap>
					<h1>Page content</h1>
					<button onClick={evt => this.setState({isOpen: true})}>Show Overlay</button>
				</div>

				<div style={{display: "none"}}>
					<ReactOverlay
						id="myOverlay"
						isOpen={isOpen}
						onRequestClose={detail => this.setState({isOpen: false})}
					>
						<p>Some content</p>
					</ReactOverlay>
				</div>
			</div>
		);
	}
}
```

###### Controlled implementation (Function based)

Use the controlled implementation if you want your parent to maintain the visibility of the Overlay. This implementation uses a function instead of class and state hooks.

<!-- prettier-ignore -->
```jsx
import React, {useState} from "react";
import ReactOverlay from "@koga73/react-overlay";

 //Be sure to import Overlay styles in here: @import "@koga73/react-overlay"
 //Or customize, styles can be found here: https://github.com/koga73/overlay/tree/master/css
import "./example.scss";

() => {
	const [stateIsOpen, setStateIsOpen] = useState(); //You can pass in an initial value here

	return (
		<div>
			<div data-overlay-page-wrap>
				<h1>Page content</h1>
				<button onClick={evt => this.setStateIsOpen(true)}>Show Overlay</button>
			</div>

			<div style={{display: "none"}}>
				<ReactOverlay
					id="myOverlay"
					isOpen={isOpen}
					onRequestClose={detail => this.setStateIsOpen(false)}
				>
					<p>Some content</p>
				</ReactOverlay>
			</div>
		</div>
	);
};
```

---

## Props

The following props are parsed out and any other props get passed-through

-   **classPrefix** | String | Default: _"overlay-"_ | Appended to all generated classes. For example: "overlay-container"
-   **isOpen** | Boolean | Default: _undefined_ | Sets the Overlay open state (makes component controlled)
-   **width** | String | Default: _undefined_ | Overrides the CSS width of the Overlay. For example: "50vw" or "400px" or "75%"
-   **height** | String | Default: _undefined_ | Overrides the CSS height of the Overlay. For example: "50vh" or "400px" or "75%"
-   **offsetX** | String | Default: _undefined_ | Overrides the CSS left of the Overlay. For example: "200px"
-   **offsetY** | String | Default: _undefined_ | Overrides the CSS top of the Overlay. For example: "200px"
-   **containerClass** | String | Default: _undefined_ | Class to append to the Overlay frame. For example: "slide-down"
-   **autoFocus** | Boolean | Default: _false_ | Automatically focus on the first focusable element inside the Overlay after shown
-   **immediate** | Boolean | Default _false_ | Fire events immediately, don't wait for transitions

###### Callbacks

The following callbacks are parsed out and any other callbacks get passed-through

-   **onRequestClose** | Function | Params: (detail) | Fires when the user attempts to close an Overlay
-   **onBeforeShow** | Function | Params: (evt, detail) | Fires when Overlay begins to show but before transitions are complete
-   **onAfterShow** | Function | Params: (evt, detail) | Fires when Overlay is fully shown after transitions are complete
-   **onBeforeHide** | Function | Params: (evt, detail) | Fires when Overlay begins to hide but before transitions are complete
-   **onAfterHide** | Function | Params: (evt, detail) | Fires when Overlay is fully hidden after transitions are complete
