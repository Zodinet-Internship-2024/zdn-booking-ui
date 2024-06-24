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
  id?: string;
  name: string;
  quantity: number;
  phone: string;
  startTime: Date;
  endTime: Date;
  price: number;
  rule: string | '';
  sportFieldType: SportFieldType;
  ownerId: string;
  sportFieldImages: SportFieldImage[];
  location: LocationType;
  fields?: Field[];
};
