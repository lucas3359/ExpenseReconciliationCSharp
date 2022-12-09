import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  title,
  children,
  link,
}: {
  title?: string;
  children: any;
  link?: string | boolean;
}) => {
  const renderTitle = () => {
    if (title) {
      return (
        <div className="mx-2 pt-4 text-lg font-semibold text-gray-800">
          {title}
        </div>
      );
    } else {
      return;
    }
  };

  const renderChild = () => {
    return (
      <div
        style={{ backgroundColor: 'rgba(250, 250, 250, 0.75)' }}
        className={`rounded-xl px-2 py-3 mx-2 w-16rem h-10rem filter drop-shadow-md text-blue-400 ${
          link ? 'cursor-pointer hover:bg-blue-400 hover:text-white' : ''
        }`}
      >
        {renderTitle()}
        <div className="mx-2 py-2 text-justify">{children}</div>
      </div>
    );
  };

  if (typeof link === 'string') {
    return <Link to={link}>{renderChild()}</Link>;
  } else {
    return <>{renderChild()}</>;
  }
};

export default Card;
