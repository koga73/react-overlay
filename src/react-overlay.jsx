import React from "react";
import PropTypes from "prop-types";

import Overlay from "@koga73/overlay";

import "./react-overlay.scss";

const propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	classPrefix: PropTypes.string,
	container: PropTypes.node,
	pageWrap: PropTypes.node,
	isOpen: PropTypes.bool,
	width: PropTypes.string,
	height: PropTypes.string,
	offsetX: PropTypes.string,
	offsetY: PropTypes.string,
	containerClass: PropTypes.string,
	userClosable: PropTypes.bool,
	autoFocus: PropTypes.bool,
	immediate: PropTypes.bool,
	onRequestClose: PropTypes.func,
	onBeforeShow: PropTypes.func,
	onAfterShow: PropTypes.func,
	onBeforeHide: PropTypes.func,
	onAfterHide: PropTypes.func
};
const defaultProps = {
	id: null,
	children: null,
	className: null,
	classPrefix: undefined,
	container: undefined,
	pageWrap: undefined,
	isOpen: undefined,
	width: undefined,
	height: undefined,
	offsetX: undefined,
	offsetY: undefined,
	containerClass: undefined,
	userClosable: undefined,
	autoFocus: undefined,
	immediate: undefined,
	onRequestClose: undefined,
	onBeforeShow: undefined,
	onAfterShow: undefined,
	onBeforeHide: undefined,
	onAfterHide: undefined
};

class ReactOverlay extends React.Component {
	constructor(props) {
		super(props);

		this.handler_overlay_requestClose = this.handler_overlay_requestClose.bind(this);
		this.handler_overlay_beforeShow = this.handler_overlay_beforeShow.bind(this);
		this.handler_overlay_afterShow = this.handler_overlay_afterShow.bind(this);
		this.handler_overlay_beforeHide = this.handler_overlay_beforeHide.bind(this);
		this.handler_overlay_afterHide = this.handler_overlay_afterHide.bind(this);

		this.state = {overlay: null};
	}

	componentDidMount() {
		const {classPrefix, container, pageWrap} = this.props;

		//New instance
		const overlay = new Overlay();
		overlay.classPrefix = classPrefix || ReactOverlay.classPrefix;
		overlay.container = container || ReactOverlay.container;
		overlay.pageWrap = pageWrap || ReactOverlay.pageWrap;
		overlay.init();
		this.setState({overlay});

		overlay.requestCloseCallback = this.handler_overlay_requestClose;
		overlay.addEventListener(Overlay.EVENT_BEFORE_SHOW, this.handler_overlay_beforeShow);
		overlay.addEventListener(Overlay.EVENT_AFTER_SHOW, this.handler_overlay_afterShow);
		overlay.addEventListener(Overlay.EVENT_BEFORE_HIDE, this.handler_overlay_beforeHide);
		overlay.addEventListener(Overlay.EVENT_AFTER_HIDE, this.handler_overlay_afterHide);
	}
	componentWillUnmount() {
		const overlay = this.state.overlay;
		if (!overlay) {
			return;
		}
		overlay.requestCloseCallback = null;
		overlay.removeEventListener(Overlay.EVENT_BEFORE_SHOW, this.handler_overlay_beforeShow);
		overlay.removeEventListener(Overlay.EVENT_AFTER_SHOW, this.handler_overlay_afterShow);
		overlay.removeEventListener(Overlay.EVENT_BEFORE_HIDE, this.handler_overlay_beforeHide);
		overlay.removeEventListener(Overlay.EVENT_AFTER_HIDE, this.handler_overlay_afterHide);

		//Clean up instance
		overlay.destroy();
		this.setState({overlay: null});
	}

	componentDidUpdate(prevProps) {
		//NOTE: Should we check classPrefix for update and reinitialize?
		if (this.props.isOpen != prevProps.isOpen) {
			const overlay = this.state.overlay;
			if (this.props.isOpen) {
				overlay.show(this.props.id);
			} else {
				overlay.hide();
			}
		}
	}

	handler_overlay_requestClose(detail) {
		const {id, isOpen, onRequestClose} = this.props;
		if (typeof isOpen !== typeof undefined) {
			if (detail === id && onRequestClose) {
				onRequestClose.call(this, id);
				return false;
			}
		}
		return true;
	}

	handler_overlay_beforeShow(evt, detail) {
		const {id, onBeforeShow} = this.props;
		if (detail.content === id && onBeforeShow) {
			onBeforeShow.call(this, evt, id);
		}
	}
	handler_overlay_afterShow(evt, detail) {
		const {id, onAfterShow} = this.props;
		if (detail.content === id && onAfterShow) {
			onAfterShow.call(this, evt, id);
		}
	}
	handler_overlay_beforeHide(evt, detail) {
		const {id, onBeforeHide} = this.props;
		if (detail.content === id && onBeforeHide) {
			onBeforeHide.call(this, evt, id);
		}
	}
	handler_overlay_afterHide(evt, detail) {
		const {id, onAfterHide} = this.props;
		if (detail.content === id && onAfterHide) {
			onAfterHide.call(this, evt, id);
		}
	}

	render() {
		const {
			id,
			children,
			className,
			classPrefix,
			container,
			pageWrap,
			isOpen,
			width,
			height,
			offsetX,
			offsetY,
			containerClass,
			userClosable,
			autoFocus,
			immediate,
			onRequestClose,
			onBeforeShow,
			onAfterShow,
			onBeforeHide,
			onAfterHide,
			...props
		} = this.props;

		return (
			<div
				id={id}
				className={className}
				data-overlay-width={width}
				data-overlay-height={height}
				data-overlay-offset-x={offsetX}
				data-overlay-offset-y={offsetY}
				data-overlay-container-class={containerClass}
				data-overlay-user-closable={userClosable}
				data-overlay-auto-focus={autoFocus}
				data-overlay-immediate={immediate}
				{...props}
			>
				{children}
			</div>
		);
	}
}
ReactOverlay.propTypes = propTypes;
ReactOverlay.defaultProps = defaultProps;
//Expose public API
for (let prop in Overlay) {
	ReactOverlay[prop] = Overlay[prop];
}
export default ReactOverlay;

//Expose "update" method to pass values to singleton
ReactOverlay.update = function () {
	Overlay.classPrefix = ReactOverlay.classPrefix;
	Overlay.container = ReactOverlay.container;
	Overlay.pageWrap = ReactOverlay.pageWrap;
	Overlay.requestCloseCallback = ReactOverlay.requestCloseCallback;
	Overlay.destroy();
	Overlay.init();
};
