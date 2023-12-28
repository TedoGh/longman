import ProgressHistoryLists from "./ProgressHistoryLists";

const ProgressHistory = () => {
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
  return (
    <div className="my-6 max-w-[500px]">
      <div className="p-5">
        <h1 className="mt-8 text-darkBlue text-3xl font-bold">
          ჩემი შედეგები / ისტორია
        </h1>
        <ProgressHistoryLists data={data} />
      </div>
    </div>
  );
};

export default ProgressHistory;
