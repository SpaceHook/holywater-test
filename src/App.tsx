import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DaysList } from './components/DaysList/DaysList';
import { Header } from './components/Header/Header';
import { AddModal } from './components/AddModal/AddModal';
import { Occurrent } from './types/Occurrent';
import { EditModal } from './components/EditModal/EditModal';
import './styles/App.scss'
import './styles/Normalize.scss'
import './styles/Reset.scss'

const useLocalStorage = () => {
  const occurrentsFromLocal = localStorage.getItem('occurrents');

  try {
    return occurrentsFromLocal ? JSON.parse(occurrentsFromLocal) : [];
  } catch (error) {
    return [];
  }
};

export const App: React.FC = () => {
  const [today, setToday] = useState(moment());
  const [isOpenModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [occurrents, setOccurrents] = useState<Occurrent[]>(useLocalStorage);
  const [selectedOccurentId, setSelectedOccurentId] = useState(0);
  const startDay = today.clone().startOf('month').startOf('week');

  useEffect(() => {
    localStorage.setItem('occurrents', JSON.stringify(occurrents));
    setOccurrents(occurrents);
  }, [occurrents]);

  const handlePrev = () => {
    setToday(prev => prev.clone().subtract(1, 'month'));
  }

  const handleNext = () => {
    setToday(prev => prev.clone().add(1, 'month'));
  }

  const editOccurrent = (occurrentId: number, selectedOccurrent: Occurrent) => {
    setOccurrents(occurrents.map(occurrent => {
      if (occurrentId === occurrent.id) {
        return {
          ...occurrent,
          ...selectedOccurrent,
        };
      }

      return occurrent;
    }));
  };

  const deleteOccurrent = (occurrentId: number,) => {
    const occurentsWithoutDeleted = occurrents
    .filter(occurrent => occurrent.id !== occurrentId);

    setOccurrents(occurentsWithoutDeleted);
  };

  return (
    <div className="app">
      <Header
        handlePrev={handlePrev} 
        handleNext={handleNext} 
        today={today}
        setOpenModal={setOpenModal} 
        setTitle={setTitle}
      />
      <DaysList
        startDay={startDay}
        today={today}
        occurrents={occurrents}
        setSelectedOccurentId={setSelectedOccurentId}
      />
      {isOpenModal && 
        <AddModal 
          setOccurrents={setOccurrents}
          setOpenModal={setOpenModal}
          occurrents={occurrents}
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          time={time}
          setTime={setTime}
        />}
      {selectedOccurentId && 
        <EditModal 
          occurrents={occurrents} 
          selectedOccurentId={selectedOccurentId}
          setSelectedOccurentId={setSelectedOccurentId}
          editOccurrent={editOccurrent}
          deleteOccurrent={deleteOccurrent}
        />}
    </div>
  );
}

export default App;
