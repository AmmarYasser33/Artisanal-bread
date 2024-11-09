import { IconMathMinus, IconPlusLg } from "../Icons";

const NumberControl = ({ value, setValue, min = 1, max = 10 }) => {
  const handleIncrement = () => {
    if (value < max) setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) setValue(value - 1);
  };

  return (
    <div className="flex h-full items-center max-md:mt-3 max-[500px]:justify-center">
      <div className="flex h-full items-center">
        <button
          onClick={handleDecrement}
          className="group flex items-center justify-center rounded-l-xl border border-gray-200 px-3 py-[14px] shadow-sm shadow-transparent transition-all duration-500 focus-within:outline-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-300 md:px-5 md:py-[18px]"
        >
          <IconMathMinus className="h-5 w-5 text-black transition-all duration-200" />
        </button>
        <input
          type="text"
          className="max-w-[73px] border-y border-gray-200 bg-transparent py-[12px] text-center text-base font-semibold text-gray-900 outline-none placeholder:text-gray-900 md:w-full md:min-w-[60px] md:py-[14px] md:text-lg"
          value={value}
          // readOnly
          disabled
        />
        <button
          onClick={handleIncrement}
          className="group flex items-center justify-center rounded-r-xl border border-gray-200 px-3 py-[14px] shadow-sm shadow-transparent transition-all duration-500 focus-within:outline-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-300 md:px-5 md:py-[18px]"
        >
          <IconPlusLg className="h-5 w-5 text-black transition-all duration-200" />
        </button>
      </div>
    </div>
  );
};

export default NumberControl;
