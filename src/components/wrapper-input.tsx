interface WrapperInputProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

const WrapperInput = ({ label, children, error }: WrapperInputProps) => {
  return (
    <>
      <div className="relative border-2 border-dark-blue rounded-lg p-3 w-full">
        <label
          className="absolute inline-block bg-white top-[-10px] leading-none font-medium text-dark-blue px-1"
          htmlFor={label}
        >
          {label}
        </label>
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs -mt-2 font-semibold">{error}</p>
      )}
    </>
  );
};

export default WrapperInput;
