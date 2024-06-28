//

import DatePickerComponent from '@/components/common/DatePickerComponent';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import AccentButton from '@/components/common/components/AccentButton';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import styles from './styles/Booking.module.scss';
import moment from 'moment';

interface SuggestBookingItemProps {
  startTime?: string;
  endTime?: string;
  fieldId?: string;
  fieldName?: string;
  isFirstChild?: boolean;
  onClick: (value: any) => void;
}

const SuggestBookingItem: React.FC<SuggestBookingItemProps> = (props) => {
  const { startTime, endTime, fieldId, fieldName, isFirstChild, onClick } =
    props;

  const handleClick = (value: any) => {
    console.log('click');
  };

  return (
    <div
      className={`flex flex-col justify-between gap-3 sm:flex-row sm:items-center ${styles.itemContainer}`}
    >
      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-natural-700 ${isFirstChild ? '' : 'hidden'}`}
        >
          Sân
        </span>
        <Input
          readOnly
          value={fieldName ? fieldName : ''}
          type="text"
          className="body-4 text-natural-700"
        />
      </div>
      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-natural-700 ${isFirstChild ? '' : 'hidden'}`}
        >
          Ngày
        </span>
        <DatePickerComponent
          defaultValue={
            startTime ? moment(startTime).utc().format('DD/MM/YYYY') : undefined
          }
          disabled={true}
        />
      </div>
      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-natural-700 ${isFirstChild ? '' : 'hidden'}`}
        >
          Khung giờ
        </span>
        <RangePickerComponent
          defaultValue={
            startTime
              ? [
                  moment(startTime).utc().format('HH:mm'),
                  moment(endTime).utc().format('HH:mm'),
                ]
              : undefined
          }
          disabled={true}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-white ${isFirstChild ? '' : 'hidden'}`}
        >
          Action
        </span>
        <AccentButton
          disabled={false}
          key={1}
          label={<PlusOutlined style={{ fontSize: '20px', padding: '10px' }} />}
          value={fieldId ? fieldId : ''}
          isActive={false}
          onClick={() => onClick([fieldId, fieldName])}
        />
      </div>
    </div>
  );
};

export default SuggestBookingItem;
