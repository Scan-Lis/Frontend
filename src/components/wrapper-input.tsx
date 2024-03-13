interface WrapperInputProps {
  label: string;
  children: React.ReactNode;
}

const WrapperInput = ({ label, children }: WrapperInputProps) => {
  return (
    <div className="relative border-2 border-dark-blue rounded-lg p-3 w-full">
      <label
        className="absolute inline-block bg-white top-[-10px] leading-none font-medium text-dark-blue px-1"
        htmlFor="">
        {label}
      </label>
      {children}
    </div>
  );
};

export default WrapperInput;
