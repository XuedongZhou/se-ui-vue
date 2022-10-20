import type { PropType, ExtractPropTypes, CSSProperties } from 'vue';
import type { SizeType } from '../config-provider/type';

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export const buttonProps = () => ({
  style: {
    type: Object as PropType<CSSProperties>
  },
  type: { type: String as PropType<ButtonType>, default: 'default' },
  href: { type: String },
  target: { type: String },
  shape: String as PropType<ButtonShape>,
  size: {
    type: String as PropType<SizeType>
  },
  htmlType: { type: String as PropType<ButtonHTMLType>, default: 'button' },
  ghost: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
  disabled: { type: Boolean, default: undefined },
  loading: { type: Boolean, default: undefined },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>
  }
});

export type ButtonProps = ExtractPropTypes<ReturnType<typeof buttonProps>>;
