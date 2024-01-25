import Image, {StaticImageData} from "next/image";
import FifoLotTracing from "@/public/images/inventory/fifo-lot-tracing-full-size.png";
import ExecuteRecall from "@/public/images/inventory/execute-recall.png";
import TrackInventoryAndCash from "@/public/images/inventory/track-inventory-and-cash-full-size.png";
import ProductionPlanning from "@/public/images/inventory/production-planning-full-size.png";
import MultiUserAccess from "@/public/images/inventory/multi-user-access.png";
import DataFingertips from "@/public/images/inventory/data-fingertips-full-size.png";
import Divider from "@/app/ui/divider";


interface Feature {
    image: StaticImageData,
    title: string,
    description: string,
    type: 'left' | 'right'
}

export default function Features() {
    const features: Feature[] = [
        {
            image: FifoLotTracing,
            title: "Automated <strong>FIFO lot tracing</strong>",
            description: "Track inventory from receipt of raw materials, through production, and shipment of finished goods. <strong>Move beyond manual entry on paper and spreadsheets.</strong> Invest in your own time and take back the day.",
            type: "left"
        },
        {
            image: ExecuteRecall,
            title: "<strong>Execute a recall</strong> in minutes",
            description: "Whether a mock or actual recall, <strong>you don't need any added stress</strong> searching through old notebooks or figuring out spreadsheets. When every transaction is in Foodplanet, it's just a click away.",
            type: "right"
        },
        {
            image: TrackInventoryAndCash,
            title: "<strong>Track inventory and cash</strong>",
            description: "Automatically update inventory after production and know how much you have at all times. See not only amounts, but also <strong>how much cash you have tied up</strong> in each item based on your costs.",
            type: "left"
        },
        {
            image: ProductionPlanning,
            title: "Simple <strong>production planning</strong>",
            description: "Plan ahead to figure out how much inventory and cash you need to <strong>produce for the next week, month, or even year,</strong> and better plan your purchasing and production.",
            type: "right"
        },
        {
            image: MultiUserAccess,
            title: "Role-based <strong>multi-user access</strong>",
            description: "<strong>Work alongside your co-packer,</strong> receiving, and production teams, providing access to just what they need to see and no more.",
            type: "left"
        },
        {
            image: DataFingertips,
            title: "<strong>Data</strong> at your fingertips",
            description: "With every inventory transaction logged, you have all the data to <strong>analyze important stats and better run your business.</strong> View it in Foodplanet or export to a spreadsheet to run your own analysis and optimize your business.",
            type: "right"
        }
    ]

    return <div className={"flex flex-col w-full px-12 py-8"}>
        {features.map((feature, i) => <div
            key={`feature-${i}`}
            className={"flex flex-col px-12"}
        >
            <div
                className={"flex items-center justify-center gap-16"}
                style={{
                    flexDirection: feature.type == "left" ? "row" : "row-reverse"
                }}
            >
                <div
                    className={"flex flex-col items-start gap-4 w-3/5"}
                >
                    <h2
                        className={"font-normal text-4xl mb-8"}
                        dangerouslySetInnerHTML={{__html: feature.title}}
                    />

                    <p className={"text-lg text-black text-normal"} dangerouslySetInnerHTML={{__html: feature.description}}/>
                </div>

                <Image
                    src={feature.image}
                    alt={feature.title}
                    width={275}
                    height={275}
                />
            </div>

            <Divider height={1} heightUnits={"px"} color={"#e7ecef"} margin={3} marginUnits={"rem"}/>
        </div>)}
    </div>
}