import React from "react";
import PropTypes from "prop-types";

import Overlay from "@koga73/overlay";

const propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
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

		//New instance per Overlay
		const overlay = new Overlay();
		overlay.init();
		this.state = {overlay: overlay};
	}

	componentDidMount() {
		const overlay = this.state.overlay;
		overlay.requestCloseCallback = this.handler_overlay_requestClose;
		overlay.addEventListener(Overlay.EVENT_BEFORE_SHOW, this.handler_overlay_beforeShow);
		overlay.addEventListener(Overlay.EVENT_AFTER_SHOW, this.handler_overlay_afterShow);
		overlay.addEventListener(Overlay.EVENT_BEFORE_HIDE, this.handler_overlay_beforeHide);
		overlay.addEventListener(Overlay.EVENT_AFTER_HIDE, this.handler_overlay_afterHide);
	}
	componentWillUnmount() {
		const overlay = this.state.overlay;
		overlay.requestCloseCallback = null;
		overlay.removeEventListener(Overlay.EVENT_BEFORE_SHOW, this.handler_overlay_beforeShow);
		overlay.removeEventListener(Overlay.EVENT_AFTER_SHOW, this.handler_overlay_afterShow);
		overlay.removeEventListener(Overlay.EVENT_BEFORE_HIDE, this.handler_overlay_beforeHide);
		overlay.removeEventListener(Overlay.EVENT_AFTER_HIDE, this.handler_overlay_afterHide);
	}

	componentDidUpdate(prevProps) {
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

/*
//requestCloseHandlers
const requestCloseHandlers = [];
Overlay.requestCloseCallback = function(detail) {
	var result = true;
	var requestCloseHandlersLen = requestCloseHandlers.length;
	for (var i = 0; i < requestCloseHandlersLen; i++) {
		result &= requestCloseHandlers[i](detail);
	}
	return !!result; //Convert to boolean
};
function addRequestCloseHandler(method) {
	requestCloseHandlers.push(method);
}
function removeRequestCloseHandler(method) {
	var requestCloseHandlersLen = requestCloseHandlers.length;
	for (var i = 0; i < requestCloseHandlersLen; i++) {
		if (requestCloseHandlers[i] === method) {
			requestCloseHandlers.splice(i, 1);
			break;
		}
	}
}
*/
