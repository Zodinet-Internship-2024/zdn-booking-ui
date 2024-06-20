import Image from 'next/image';

type NearestImageProps = {
    sportField: SportField;
};
const NearestImage = ({ sportField }: NearestImageProps) => {
    const img = sportField.sportFieldImages.length > 0 ? sportField.sportFieldImages[0].url : '';
    return (
      <div className="relative mx-auto h-card-md w-full">
        <Image src={img} alt="" fill />
      </div>
    );
};
export default NearestImage;
