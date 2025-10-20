import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const HomeChart = ({ transactions }) => {
  const data =
    transactions?.length > 0 &&
    transactions?.map((tx) => ({
      date: tx.date,
      value: tx.amount,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#F26B21"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#222",
          padding: 8,
          borderRadius: 8,
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: "#8A2BE2",
              borderRadius: "50%",
              width: 24,
              height: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 6,
            }}
          >
            A
          </div>
          <span>${payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default HomeChart;
