export default function Tabs({activeTabIndex, tabs, onTabClick}: { activeTabIndex: number, tabs: string[], onTabClick: (index: number) => void }) {
    return <div className={"flex items-center justify-center w-full h-[45px] border-b-[1px] border-b-[#dbdbdb] mt-[1rem] mx-12 mb-6"}>
        {tabs.map((tab, ti) => {
            const isActive = ti == activeTabIndex;

            return <div
                key={`dashboard-tab-${ti}`}
                className={`text-sm text-normal py-2 px-6 cursor-pointer mt-[9px] border-b-[1px] hover:border-b-[1px] border-main-gray hover:text-hover-main-orange ${isActive ? "text-main-orange border-b-[1px] border-main-orange" :"text-black border-black"}`}
                onClick={() => onTabClick(ti)}
            >
                {tab}
            </div>
        })}
    </div>
}