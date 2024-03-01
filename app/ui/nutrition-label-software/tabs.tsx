export default function Tabs({
  activeTabIndex,
  tabs,
  onTabClick,
}: {
  activeTabIndex: number;
  tabs: string[];
  onTabClick: (index: number) => void;
}) {
  return (
    <div
      className={
        "mx-12 mb-6 mt-[1rem] flex h-[45px] w-full items-center justify-center border-b-[1px] border-b-[#dbdbdb]"
      }
    >
      {tabs.map((tab, ti) => {
        const isActive = ti == activeTabIndex;

        return (
          <div
            key={`dashboard-tab-${ti}`}
            className={`text-normal mt-[9px] cursor-pointer border-b-[1px] border-main-gray px-6 py-2 text-sm hover:border-b-[1px] hover:text-hover-main-orange ${isActive ? "border-b-[1px] border-main-orange text-main-orange" : "border-black text-black"}`}
            onClick={() => onTabClick(ti)}
          >
            {tab}
          </div>
        );
      })}
    </div>
  );
}
