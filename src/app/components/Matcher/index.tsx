
import Image from 'next/image';

export default function Matcher(props: any) {
  
  const { firstImage, secondImage, disableBtn } = props;

  const renderImageBtn = (imageObj: any = {}) => {
    const { image, name, id } = imageObj;
    const { onSelect } = props;
    return id ? (
      <div className="mb-10 flex flex-col lg:mr-20 lg:mb-0 lg:last:mr-0">
        <Image
          className="w-40 h-40 object-cover object-top mx-auto"
          alt={name}
          width={40}
          height={40}
          src={`/images/${image}`}
        />
        <h5 className="text-center mb-5 mt-5 font-semibold">{name}</h5>
        <button
          disabled={disableBtn}
          className="bg-sky-500 hover:bg-sky-700 text-base rounded py-2 w-40 mx-auto"
          onClick={() => !disableBtn && onSelect(id, firstImage.id, secondImage.id)}
        >
          Stronger
        </button>
      </div>
    ) : null
  }

  return (
    <article className="flex align-center flex-col lg:flex-row lg:justify-center">
        {renderImageBtn(firstImage)}
        {renderImageBtn(secondImage)}
    </article>
  );
};
