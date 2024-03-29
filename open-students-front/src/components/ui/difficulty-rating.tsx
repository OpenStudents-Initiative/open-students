import { useState } from "react";

interface ModifyRatingProps {
  value: number;
  setValue: (value: number) => void;
}

// Remind me to not work with embedding SVGs for a while after this
const DifficultyRating: React.FC<ModifyRatingProps> = ({ value, setValue }) => {
  const [uiValue, setUiValue] = useState<number>(value - 1);

  return (
    <div className="flex -translate-x-1">
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        className={`hover:fill-red-500 ${
          uiValue === 0 ? "fill-red-500" : "fill-gray-600"
        }`}
        onMouseOver={() => setUiValue(0)}
        onMouseOut={() => setUiValue(value - 1)}
        onClick={() => setValue(1)}
      >
        <circle cx="15.5" cy="9.5" r="1.5"></circle>
        <circle cx="8.5" cy="9.5" r="1.5"></circle>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"></path>
      </svg>
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`hover:fill-orange-500 ${
          uiValue === 1 ? "fill-orange-500" : "fill-gray-600"
        }`}
        onMouseOver={() => setUiValue(1)}
        onMouseOut={() => setUiValue(value - 1)}
        onClick={() => setValue(2)}
      >
        <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
        <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" />
        <path d="M16.2425 14.9701C16.7783 14.8362 17.1041 14.2933 16.9701 13.7575C16.8362 13.2217 16.2933 12.8959 15.7575 13.0299L7.75746 15.0299C7.22167 15.1638 6.89591 15.7067 7.02986 16.2425C7.16381 16.7783 7.70674 17.1041 8.24254 16.9701L16.2425 14.9701Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
        />
      </svg>
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`hover:fill-yellow-500 ${
          uiValue === 2 ? "fill-yellow-500" : "fill-gray-600"
        }`}
        onMouseOver={() => setUiValue(2)}
        onMouseOut={() => setUiValue(value - 1)}
        onClick={() => setValue(3)}
      >
        <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
        <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" />
        <path d="M8 14C7.44772 14 7 14.4477 7 15C7 15.5523 7.44772 16 8 16H15.9991C16.5514 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14H8Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
        />
      </svg>
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`hover:fill-teal-500 ${
          uiValue === 3 ? "fill-teal-500" : "fill-gray-600"
        }`}
        onMouseOver={() => setUiValue(3)}
        onMouseOut={() => setUiValue(value - 1)}
        onClick={() => setValue(4)}
      >
        <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
        <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" />
        <path d="M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
        />
      </svg>
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`hover:fill-green-500 ${
          uiValue === 4 ? "fill-green-500" : "fill-gray-600"
        }`}
        onMouseOver={() => setUiValue(4)}
        onMouseOut={() => setUiValue(value - 1)}
        onClick={() => setValue(5)}
      >
        <path d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z" />
        <path d="M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.2 13C7.56149 13 6.9436 13.5362 7.01666 14.2938C7.06054 14.7489 7.2324 15.7884 7.95483 16.7336C8.71736 17.7313 9.99938 18.5 12 18.5C14.0006 18.5 15.2826 17.7313 16.0452 16.7336C16.7676 15.7884 16.9395 14.7489 16.9833 14.2938C17.0564 13.5362 16.4385 13 15.8 13H8.2ZM9.54387 15.5191C9.41526 15.3509 9.31663 15.1731 9.2411 15H14.7589C14.6834 15.1731 14.5847 15.3509 14.4561 15.5191C14.0981 15.9876 13.4218 16.5 12 16.5C10.5782 16.5 9.90187 15.9876 9.54387 15.5191Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z"
        />
      </svg>
    </div>
  );
};

export default DifficultyRating;
