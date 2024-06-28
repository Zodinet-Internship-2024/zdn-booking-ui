import Item from '@/components/common/Item';
import { useEffect } from 'react';

interface TransactionProps {
  filter?: any;
}

const Transaction: React.FC<TransactionProps> = (filter) => {
  // useEffect({}, [filter]);
  return (
    <div className="flex flex-col gap-3">
      <Item data={''} label="booking" />
      <Item data={''} label="transaction" />
    </div>
  );
};

export default Transaction;
