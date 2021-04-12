const Card = (
  <div className="my-3 font-title rounded-lg text-sm font-bold w-44 flex-col bg-purple-300 overflow-hidden">
    <div className="bg-success flex justify-around items-center h-8">
      <div className="tracking-wider">#1031</div>
    </div>

    <div className="bg-mupurple flex justify-between px-4 py-1">
      <div>Epic</div>
      <div>100 kcal</div>
    </div>
    <div>
      <img
        className="max-w-full"
        src="images/pete-card.jpg"
        alt="Voiceover Pete"
      />
    </div>
    <div className="bg-phantasmablue flex justify-between px-4 py-1">
      <div>120 SOUL</div>
      <div>$42.69</div>
    </div>
  </div>
);

export default function Cards() {
  return (
    <div className="mt-7 grid md:grid-cols-3 2xl:grid-cols-6 xl:grid-cols-4 mx-auto gap-10">
      {[...Array(12).keys()].map(() => Card)}
    </div>
  );
}