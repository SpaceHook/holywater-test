import React from 'react';
import { Occurrent } from '../../types/Occurrent';
import '../../styles/Form.scss'
import '../../styles/Modal.scss'

type Props = {
  setOpenModal: (status: boolean) => void,
  setOccurrents: (occurrents: Occurrent[]) => void,
  occurrents: Occurrent[],
  title: string,
  setTitle: (title: string) => void,
  date: string,
  setDate: (date: string) => void,
  description: string,
  setDescription: (description: string) => void,
  time: any,
  setTime: (time: any) => void,

};

export const AddModal: React.FC<Props> = ({
  setOpenModal,
  occurrents,
  setOccurrents,
  title,
  setTitle,
  date,
  setDate,
  description,
  setDescription,
  time,
  setTime,
}) => {
  const addNewOccurrent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOccurrent: Occurrent = {
      id: occurrents.length + 1,
      title,
      description,
      date,
      time,
    };

    setOccurrents([...occurrents, newOccurrent]);
    setOpenModal(false);
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__header-title">
            Add event
          </h2>
          <div
            className="modal__header-close"
            onClick={handleCloseModal}
          ></div>
        </div>

        <form className="form" onSubmit={event => addNewOccurrent(event)}>
          <div className="form__content">
            <div className="form__event-title">
            <p className="form__event-title-name">Title*</p>
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
              <p className="form__event-title-name">Description</p>
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
          <input type="submit" className="form__submit" value='Save' />
        </form>
      </div>
    </div>
  );
}
