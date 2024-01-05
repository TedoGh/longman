import ProgressHistoryList from "./ProgressHistoryList";

const ProgressHistory = () => {
  return (
    <div className="mt-[220px] mb-14">
      <div>
        <h1 className="my-8 text-darkBlue text-3xl text-center font-bold">
          ჩემი შედეგები / ისტორია
        </h1>
        <ProgressHistoryList />
      </div>
    </div>
  );
};

export default ProgressHistory;
