type SportFieldType = {
    id: string;
    name: string;
};

type SportFieldImage = {
  id?: string | '';
  name: string;
  url: string;
};

type SportField = {
  id: string;
  name: string;
  quantity: number;
  phone: string;
  startTime: string;
  endTime: string;
  price: number;
  rule: string | '';
  sportFieldTypeId: string;
  ownerId: string;
  sportFieldType: any;
  sportFieldImages: SportFieldImage[];
  location: LocationType;
  fields?: Field[];
};
