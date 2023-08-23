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

### Controlled implementation

Use the controlled implementation if you want your parent to maintain the visibility of the Overlay

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

### Uncontrolled implementation

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

---

## Props

### Instance

The following props are parsed out and any other props get passed-through

-   **classPrefix** | String | Default: _"overlay-"_ | Appended to all generated classes. For example: "overlay-container". If undefined, defaults to ReactOverlay.classPrefix
-   **container** | Node | Default: _undefined"_ | Container to put Overlays in when not shown. If undefined, defaults to ReactOverlay.container
-   **pageWrap** | Node | Default: _undefined_ | Container of main page content to disallow focus when Overlay is shown. If undefined, defaults to ReactOverlay.pageWrap
-   **isOpen** | Boolean | Default: _undefined_ | Sets the Overlay open state (makes component controlled)
-   **width** | String | Default: _undefined_ | Overrides the CSS width of the Overlay. For example: "50vw" or "400px" or "75%"
-   **height** | String | Default: _undefined_ | Overrides the CSS height of the Overlay. For example: "50vh" or "400px" or "75%"
-   **offsetX** | String | Default: _undefined_ | Overrides the CSS left of the Overlay. For example: "200px"
-   **offsetY** | String | Default: _undefined_ | Overrides the CSS top of the Overlay. For example: "200px"
-   **containerClass** | String | Default: _undefined_ | Class to append to the Overlay frame. For example: "slide-down"
-   **userClosable** | Boolean | Default: _undefined_ | Determines whether the user can close the Overlay by clicking outside of it or on the close button
-   **autoFocus** | Boolean | Default: _false_ | Automatically focus on the first focusable element inside the Overlay after shown
-   **immediate** | Boolean | Default _false_ | Fire events immediately, don't wait for transitions

### Callbacks

The following callbacks are parsed out and any other callbacks get passed-through

-   **onRequestClose** | Function | Params: (detail) | Fires when the user attempts to close an Overlay
-   **onBeforeShow** | Function | Params: (evt, detail) | Fires when Overlay begins to show but before transitions are complete
-   **onAfterShow** | Function | Params: (evt, detail) | Fires when Overlay is fully shown after transitions are complete
-   **onBeforeHide** | Function | Params: (evt, detail) | Fires when Overlay begins to hide but before transitions are complete
-   **onAfterHide** | Function | Params: (evt, detail) | Fires when Overlay is fully hidden after transitions are complete

---

## Static

### Static instance

By default a static instance is created on the window named **ReactOverlay**. You can override the default values below, just call **update** after.
Note, ReactOverlay instances will use these defaults if not defined on the instance.

-   **classPrefix** | String | Default: _"overlay-"_ | Appended to all generated classes. For example: "overlay-container"
-   **container** | Element | Default: _undefined_ | Container to put Overlays in when not shown
-   **pageWrap** | Element | Default: _undefined_ | Container of main page content to disallow focus when Overlay is shown
-   **requestCloseCallback** | Function | Default: _undefined_ | Called when a user attempts to close an Overlay. Return false to cancel
-   **show** | Function | Show an Overlay
-   **hide** | Function | Hide the currently shown Overlay
-   **update** | Function | Update the static instance with new defaults (classPrefix, container, pageWrap, requestCloseCallback)

---

## React-DOM 18

Note that if using React-DOM 18, you should specify the react root as the static container. This is because React-DOM 18 uses portals to render the Overlay outside of the root element.

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

import ReactOverlay from "@koga73/react-overlay";

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(<Example />);
//Specify the root element as the container when using React-DOM 18
ReactOverlay.update({container: rootEl});
```
