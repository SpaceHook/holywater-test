import React from 'react';
import '../../styles/Header.scss';

type Props = {
  handlePrev: () => void,
  handleNext: () => void,
  today: any,
  setOpenModal: (status: boolean) => void,
  setTitle: (title: string) => void,
};

export const Header: React.FC<Props> = ({
  handlePrev,
  handleNext,
  today,
  setOpenModal
}) => {
  return (
    <div className="container">
      <header className='header'>
          <div className="header__button-add-wrapper">
            <div className="header__button-add" onClick={() => setOpenModal(true)}></div>
          </div>

          <div className="header__month-toggle">
            <div className="header__month-toggle-left" onClick={handlePrev}></div>
            <div className="">{today.format('MMMM')}</div>    
            <div className="header__month-toggle-right" onClick={handleNext}></div>
          </div>
      </header>
   </div>
  );
}
