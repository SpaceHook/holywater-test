import React, { useState } from 'react';
import { Occurrent } from '../../types/Occurrent';

type Props = {
  occurrents: Occurrent[],
  selectedOccurentId: number,
  setSelectedOccurentId: (selectedOccurentId: number) => void,
  editOccurrent: (occurrentId: number, selectedOccurrent: Occurrent) => void,
  deleteOccurrent: (occurrentId: number) => void,
}

export const EditModal: React.FC<Props> = ({
  occurrents,
  selectedOccurentId,
  setSelectedOccurentId,
  editOccurrent,
  deleteOccurrent,
}) => {
  const selectOccurrent = occurrents.find(occurrent => occurrent.id === selectedOccurentId);
  const [title, setTitle] = useState(selectOccurrent?.title || '');
  const [description, setDescription] = useState(selectOccurrent?.description || '');
  const [date, setDate] = useState(selectOccurrent?.date || '');
  const [time, setTime] = useState(selectOccurrent?.time);

  const onEditOccurrent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editedOccurrent: Occurrent = {
      title,
      description,
      date,
      time,
    }
    setSelectedOccurentId(0);
    editOccurrent(selectedOccurentId, editedOccurrent);
  }

  const onDeleteOccurrent = () => {
    deleteOccurrent(selectedOccurentId);
    setSelectedOccurentId(0);

  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__header-title">
            Edit event
          </h2>
          <div
            className="modal__header-close"
            onClick={() => setSelectedOccurentId(0)}
          ></div>
        </div>

        <form className="form" onSubmit={event => onEditOccurrent(event)}>
            <div className="form__content">
              <div className="form__event-title">
              <p className="form__event-title-name">New title</p>
                <input 
                  type="text" 
                  className="form__event-title-field form__input" 
                  placeholder='Enter title'
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  maxLength={15}
                  required
                />
              </div>

              <div className="form__description">
                <p className="form__event-title-name">New Description</p>
                <textarea
                  className='form__description-field form__input'
                  name="description"
                  placeholder='Enter description'
                  value={description}
                  onChange={event => setDescription(event.target.value)}
                ></textarea>
              </div>

              <div className="form__date">
                <input
                  type="date"
                  className="form__date-field form__input"
                  value={date}
                  onChange={event => setDate(event.target.value)}
                  required
                />
                <input
                  type="time" 
                  className="form__date-time form__input"
                  value={time}
                  onChange={event => setTime(event.target.value)}
                />
              </div>
            </div>

            <div className="form__footer">
              <div className="form__delete" onClick={onDeleteOccurrent}></div>
              <input type="submit" className="form__submit" value='Save' />
            </div>
          </form>
      </div>
    </div>
  )
}
