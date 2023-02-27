import clsx from "clsx";
import PropTypes from "prop-types";
import styles from "./Icon.module.css";

export const ICON_TYPES = ["more", "add", "close", "checkbox"];

export const Icon = ({ className, width, height, fill, name }) => {
  switch (name) {
    default:
      return null;
    case "checkbox":
      return (
        <svg
          className={clsx(className, styles.iconCheckbox)}
          width={width}
          height={height}
          viewBox="0 0 11 9"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5791 1.08754C10.807 1.31535 10.807 1.68469 10.5791 1.9125L4.16248 8.32917C3.93467 8.55697 3.56533 8.55697 3.33752 8.32917L0.420854 5.4125C0.193049 5.18469 0.193049 4.81535 0.420854 4.58754C0.64866 4.35974 1.01801 4.35974 1.24581 4.58754L3.75 7.09173L9.75419 1.08754C9.98199 0.859736 10.3513 0.859736 10.5791 1.08754Z"
            fill={fill}
          />
        </svg>
      );
    case "more":
      return (
        <svg
          className={clsx(className, styles.iconMore)}
          width={width}
          height={height}
          viewBox="0 0 16 4"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z"
            fill={fill}
          />
        </svg>
      );
    case "add":
      return (
        <svg
          className={clsx(className, styles.iconAdd)}
          width={width}
          height={height}
          viewBox="0 0 28 28"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.666 2.33332C15.666 1.41285 14.9198 0.666656 13.9993 0.666656C13.0789 0.666656 12.3327 1.41285 12.3327 2.33332V12.3333H2.33268C1.41221 12.3333 0.666016 13.0795 0.666016 14C0.666016 14.9205 1.41221 15.6667 2.33268 15.6667H12.3327V25.6667C12.3327 26.5871 13.0789 27.3333 13.9993 27.3333C14.9198 27.3333 15.666 26.5871 15.666 25.6667V15.6667H25.666C26.5865 15.6667 27.3327 14.9205 27.3327 14C27.3327 13.0795 26.5865 12.3333 25.666 12.3333H15.666V2.33332Z"
            fill={fill}
          />
        </svg>
      );
    case "close":
      return (
        <svg
          className={clsx(className, styles.iconClose)}
          width={width}
          height={height}
          viewBox="0 0 14 14"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683418 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683418 -0.0976311 0.292893 0.292893C-0.0976311 0.683418 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683418 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
            fill={fill}
          />
        </svg>
      );
  }
};

Icon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  name: PropTypes.oneOf(ICON_TYPES).isRequired,
};
