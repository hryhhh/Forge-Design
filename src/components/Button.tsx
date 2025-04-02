import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

// 定义默认属性
interface BaseButtonProps {
  children?: React.ReactNode;
  size?: ButtonSize;
  btnType?: ButtonType;
  disabled?: boolean;
  className?: string; // 修正为 string 类型
  href?: string;
}

// 设置默认值
const defaultProps: BaseButtonProps = {
  size: ButtonSize.Medium,
  btnType: ButtonType.Primary,
  disabled: false,
};

const Button: React.FC<BaseButtonProps> = ({
  children,
  size = defaultProps.size,
  btnType = defaultProps.btnType,
  disabled = defaultProps.disabled,
  className,
  href,
}) => {
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType === ButtonType.Link && disabled,
  });

  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
};

export default Button;