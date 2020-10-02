import React from "react";
import PropTypes from "prop-types";

import Overlay from "@koga73/overlay";

const propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string,
	offsetX: PropTypes.string,
	offsetY: PropTypes.string,
	containerClass: PropTypes.string,
	userClosable: PropTypes.bool,
	autoFocus: PropTypes.bool,
	immediate: PropTypes.bool,
	onBeforeShow: PropTypes.func,
	onAfterShow: PropTypes.func,
	onBeforeHide: PropTypes.func,
	onAfterHide: PropTypes.func
};
const defaultProps = {
	id: null,
	children: null,
	className: null,
	width: undefined,
	height: undefined,
	offsetX: undefined,
	offsetY: undefined,
	containerClass: undefined,
	userClosable: undefined,
	autoFocus: undefined,
	immediate: undefined,
	onBeforeShow: undefined,
	onAfterShow: undefined,
	onBeforeHide: undefined,
	onAfterHide: undefined
};

class ReactOverlay extends React.Component {
	constructor(props) {
		super(props);

		this.handler_overlay_beforeShow = this.handler_overlay_beforeShow.bind(this);
		this.handler_overlay_afterShow = this.handler_overlay_afterShow.bind(this);
		this.handler_overlay_beforeHide = this.handler_overlay_beforeHide.bind(this);
		this.handler_overlay_afterHide = this.handler_overlay_afterHide.bind(this);
	}

	componentDidMount() {
		Overlay.addEventListener(Overlay.EVENT_BEFORE_SHOW, this.handler_overlay_beforeShow);
		Overlay.addEventListener(Overlay.EVENT_AFTER_SHOW, this.handler_overlay_afterShow);
		Overlay.addEventListener(Overlay.EVENT_BEFORE_HIDE, this.handler_overlay_beforeHide);
		Overlay.addEventListener(Overlay.EVENT_AFTER_HIDE, this.handler_overlay_afterHide);
	}
	componentWillUnmount() {
		Overlay.removeEventListener(Overlay.EVENT_BEFORE_SHOW, this.handler_overlay_beforeShow);
		Overlay.removeEventListener(Overlay.EVENT_AFTER_SHOW, this.handler_overlay_afterShow);
		Overlay.removeEventListener(Overlay.EVENT_BEFORE_HIDE, this.handler_overlay_beforeHide);
		Overlay.removeEventListener(Overlay.EVENT_AFTER_HIDE, this.handler_overlay_afterHide);
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
			width,
			height,
			offsetX,
			offsetY,
			containerClass,
			userClosable,
			autoFocus,
			immediate,
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
