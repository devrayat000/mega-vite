type Props = {
  time: number;
  label: string;
};

const Time = ({ label, time }: Props) => {
  return (
    <li>
      <div className="relative isolate">
        <span className="absolute -z-10 h-5/6 bg-blue-black rounded -bottom-1 inset-x-1" />
        <div className="bg-blue-desaturated px-2 py-4 text-primary-soft-red font-bold text-4xl sm:text-5xl sm:px-3 rounded relative overflow-hidden">
          <span className="absolute h-1/2 bg-blue-black/25 top-0 inset-x-0" />
          <p className="min-w-time text-center">
            {time < 10 ? `0${time}` : time}
          </p>
          <span className="absolute h-2 w-2 rounded-full bg-blue-black top-1/2 left-0 -translate-y-1/2 -translate-x-1/2" />
          <span className="absolute h-2 w-2 rounded-full bg-blue-black top-1/2 right-0 -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
      <p className="text-[0.5rem] text-white text-center uppercase tracking-[0.35em] mt-3.5">
        {label}
      </p>
    </li>
  );
};

export default Time;
