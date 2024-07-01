import React from 'react';
import { getSportFieldById } from '../../api/sportField.api';
// import InfoFieldDetail from '../components/infoFieldDetail';
import FieldMap from '../components/FieldMap';

type FieldDetailPageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function page({ params }: FieldDetailPageProps) {
  const res = await getSportFieldById(params.id);

  const sportField = res?.data || {};

  console.log(sportField, 'sportField');
  return (
    <div className="">
      <FieldMap sportField={sportField} />
    </div>
  );
}
