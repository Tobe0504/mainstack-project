const Toast = ({ t }) => {
  return (
    <div
      className={`px-4 py-2 rounded shadow text-white font-medium slideDown ${
        t.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{
        animation: "slideDown 0.3s ease-out",
      }}
    >
      {t.message}
    </div>
  );
};

export default Toast;
