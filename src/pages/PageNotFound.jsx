export default function PageNotFound() {
  return (
    <div>
      <div className="flex items-center flex-col">
        <div className="bg-center bg-no-repeat bg-auto bg-[url('https://svgshare.com/i/11TG.svg')] lg:w-[1080px] lg:h-[500px] md:w-[750px] md:h-[400px] flex justify-center items-center">
          <h1 className="text-[#fff] text-[170px] font-bold mt-11">404</h1>
        </div>
        <div className="my-9 text-center">
          <h1 className="text-4xl font-bold text-darkBlue mb-8">
            Page not found
          </h1>
          <p className="max-w-[450px] mb-14">
            Looks like the page you requested for could not be found. Please
            check the URL box.
          </p>
          <button className="bg-[#04AA6D] text-[#fff] font-bold rounded-[30px] w-[294px] h-[47px]  p-[10px] gap-[10px]">
            Reload
          </button>
        </div>
      </div>
    </div>
  );
}
