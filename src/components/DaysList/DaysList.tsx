import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import '../../styles/DaysList.scss';
import { Occurrent } from '../../types/Occurrent';

type Props = {
  startDay: any,
  today: any,
  occurrents: Occurrent[],
  setSelectedOccurentId: (occurrent: number) => void
}

export const DaysList: React.FC<Props> = ({
  startDay,
  today,
  occurrents,
  setSelectedOccurentId
}) => {
  const day = startDay.clone().subtract(1, 'day');
  const days = [...Array(42)].map(() => day.add(1, 'day').clone());

  return (
    <div className="container">
      <div className='calendar'>
        {days.map(day => (
          <div
            key={day}
            className={classNames('calendar__day',
              {'calendar__day--is-weekend': !today.isSame(day, 'month')}
            )}
          >
            <div className='calendar__day-number'>
              <div
                className={classNames({
                  'calendar__day--is-current': moment().isSame(day, 'day'),
                })}
              >
                {day.format('D')}
              </div>
              <div>
                {day.format('dd')}
              </div>
            </div>

            <div className="calendar__occurrents" >
              <ul className='calendar__occurrents-list'>
                {occurrents.filter(occurrent => occurrent.date === day.format('YYYY-MM-DD')).map(occurrent => (
                  <li
                    key={occurrent.id}
                    className='calendar__occurrents-list-element'
                    onClick={() => {
                      setSelectedOccurentId(occurrent.id || 0);
                    }}
                  >
                    {occurrent.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
