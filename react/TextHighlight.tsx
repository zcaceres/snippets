const TextHighlight: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <span className="bg-[--neon-yellow] text-black px-1 -ml-1">
      {children}
    </span>
  );
};

export default TextHighlight;
