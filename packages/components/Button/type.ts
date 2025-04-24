export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  round?: boolean;
  circle?: boolean;
  plain?: boolean;
  text?: string;
  color?: string;
  autofocus?: boolean;
  nativeType?: 'button' | 'submit' | 'reset';
  icon?: string;
}

export interface ButtonInterface {
  ref: HTMLButtonElement | null;
}