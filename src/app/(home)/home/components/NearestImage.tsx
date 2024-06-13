import Image from 'next/image';

type NearestImageProps = {
    sportField: SportField;
};
const NearestImage = ({ sportField }: NearestImageProps) => {
    const img = sportField.sportFieldImages.length > 0 ? sportField.sportFieldImages[0].url : '';
    return (
        <div className="w-card h-card-md relative mx-auto">
            <Image src={img} alt="" fill />
        </div>
    );
};
export default NearestImage;
