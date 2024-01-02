import ProgressHistoryLists from "./ProgressHistoryLists";

const ProgressHistory = () => {
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  return (
    <div className="mt-[220px] mb-14">
      <div>
        <h1 className="mt-8 text-darkBlue text-3xl text-center font-bold">
          ჩემი შედეგები / ისტორია
        </h1>
        <ProgressHistoryLists data={data} />
      </div>
    </div>
  );
};

export default ProgressHistory;
