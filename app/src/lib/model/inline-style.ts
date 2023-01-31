import type { CSSObject } from '@emotion/css';

const keyWithPx: (keyof CSSObject)[] = [
	'width',
	'maxWidth',
	'minWidth',
	'height',
	'minHeight',
	'maxHeight',
	'top',
	'bottom',
	'left',
	'right',
	'fontSize',
	'padding',
	'margin',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'borderRadius',
	'outlineOffset'
];

export const styleToString = (style: CSSObject) => {
	return Object.keys(style).reduce((acc, key) => {
		const value = style[key];
		const styleKey = key
			.split(/(?=[A-Z])/)
			.join('-')
			.toLowerCase();

		return (
			acc +
			(value != null
				? styleKey + ':' + typeof value === 'number' && keyWithPx.includes(key)
					? `${value}px`
					: value + ';'
				: '')
		);
	}, '');
};

export class Style {
	cssObject: CSSObject;

	constructor(cssObject?: CSSObject) {
		this.cssObject = cssObject ?? {};
	}

	toString() {
		return styleToString(this.cssObject);
	}
}
