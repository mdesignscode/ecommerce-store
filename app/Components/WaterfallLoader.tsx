import "@/styles/loading.css";

export default function WaterfallLoader({ text }: { text: string }) {
  return (
    <div>
      <p className="text-center m-4">{text} Loading...</p>
      <div className="waterfall">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
