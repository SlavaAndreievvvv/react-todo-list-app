import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
import { ICON_TYPES } from "../Icon";
import { Icon } from "../Icon";

export const Button = ({
  className,
  onClick,
  children,
  disabled,
  variant,
  icon,
  size,
  fluid,
}) => {
  return (
    <button
      type={onClick ? "button" : "submit"}
      onClick={onClick}
      className={clsx(
        className,
        styles.button,
        styles[`variant-${variant}`],
        styles[`button-${size}`],
        { [styles.fluid]: fluid }
      )}
      disabled={disabled}
    >
      {!!icon && (
        <Icon
          name={icon}
          className={clsx(styles.icon, {
            [styles.hasIcon]: icon && variant !== "icon",
          })}
        />
      )}
      {variant !== "icon" && <span>{children}</span>}
    </button>
  );
};

Button.propType = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["primary", "text", "icon", "danger", "dashed"]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
  icon: PropTypes.oneOf(ICON_TYPES),
  fluid: PropTypes.string,
};

Button.defaultProps = {
  variant: "primary",
};
