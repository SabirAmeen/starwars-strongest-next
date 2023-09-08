import Image from 'next/image';

export default function Loader() {

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <Image width={40} height={40} src="/tail-spin.svg" alt='loader' />
    </div>
  );
};
