import React from 'react';
import { getSportFieldById } from '../../api/sportField.api';
import InfoFieldDetail from '../components/infoFieldDetail';

type FieldDetailPageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function page({ params }: FieldDetailPageProps) {
  const res = await getSportFieldById(params.id);

  const sportField = res?.sportField || {};
  return (
    <div className="">
      <InfoFieldDetail sportField={sportField} />
    </div>
  );
}
