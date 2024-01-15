export default function Tabs({activeTabIndex, tabs, onTabClick}: { activeTabIndex: number, tabs: string[], onTabClick: (index: number) => void }) {
    return <div className={"flex items-center justify-center h-[45px] border-b-[1px] border-b-[#dbdbdb] mt-[1rem] mx-12 mb-6"}>
        {tabs.map((tab, ti) => {
            const isActive = ti == activeTabIndex;
            const extraStyles: { [key: string]: string } = {}

            if (isActive) {
                extraStyles["borderBottomWidth"] = "1px";
                extraStyles["color"] = "#408abf";
            }

            return <div
                key={`dashboard-tab-${ti}`}
                className={"text-sm text-normal text-black py-2 px-6 cursor-pointer mt-[9px] border-b-[0px] hover:border-b-[1px] hover:text-[#3f4a56]"}
                style={{
                    borderBottomStyle: "solid",
                    borderBottomColor: isActive ? "#408abf" : "#000",
                    ...extraStyles
                }}
                onClick={() => onTabClick(ti)}
            >
                {tab}
            </div>
        })}
    </div>
}