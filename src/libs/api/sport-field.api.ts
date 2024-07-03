import axiosInstance from '../axios';

type GetSportFieldParams = {
  page?: number;
  size?: number;
  query?: string;
  typeId?: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getSportFields = async ({
  page = 1,
  size = 12,
  query = '',
  typeId = 'all',
}: GetSportFieldParams) => {
  if (isNaN(page) || isNaN(size)) {
    page = 1;
  }

  // const accessToken = cookies().get('access_token')?.value;
  const sportFieldTypeParam =
    typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
  const res = await axiosInstance.get(
    `/sport-field?page=${page - 1}&size=${size}&filter=name:${query}${sportFieldTypeParam}`,
  );

  return res.data;
};

export const getSportFieldById = async (id: string) => {
  // const accessToken = cookies().get('access_token')?.value;

  const res = await axiosInstance.get(`${API_HOST}/sport-field/${id}`);

  return res.data;
};
