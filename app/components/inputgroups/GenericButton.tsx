interface GenericButtonProps {
  text: string;
  type: "button" | "reset" | "submit" | undefined;
}

const GenericButton: React.FC<GenericButtonProps> = ({ text, type }) => {
  return (
    <button type={type} className="btn btn-secondary btn-sm">
      {text}
    </button>
  );
};

export default GenericButton;
