import Image from "next/image";
import {GrLinkNext} from "react-icons/gr";
import Link from "next/link";

interface CaseStudy {
    img_url: string,
    url: string,
    feedback: string,
    name: string
}

export default function CaseStudies() {
    const caseStudies: CaseStudy[] = [
        {
            img_url: "slant-shack.svg",
            url: "/",
            feedback: "We couldn't find an affordable labeling option for all our flavors and Foodplanet was the solution.",
            name: "SlantShack"
        },
        {
            img_url: "frost-bites.png",
            url: "/",
            feedback: "Foodplanet took the fear factor out of getting intimidating nutrition facts done. It made sense and simplified the technical aspects.",
            name: "Frost Bites"
        },
        {
            img_url: "yumtum.png",
            url: "/",
            feedback: "Foodplanet customer service went above and beyond to create a custom label and triangulated tricky ingredient data for us.",
            name: "YumTum"
        },
        {
            img_url: "mason-jar.png",
            url: "/",
            feedback: "Other software wasn't user friendly. If Apple were to make nutrition label software it would look like Foodplanet.",
            name: "The Mason Jar CookieCo"
        }
    ]

    return <div className={"flex flex-col items-center text-black px-12 py-16"}>
        <h2 className={"font-bold text-4xl"}>Read our case studies</h2>
        <div className={"mt-12 w-full grid grid-cols-2 grid-rows-2 h-[400px]"}>
            <div className={"border-r-[1px] border-b-[1px] border-main-gray"}>
                <CaseStudyBlock caseStudy={caseStudies[0]}/>
            </div>
            <div className={"border-l-[1px] border-b-[1px] border-main-gray"}>
                <CaseStudyBlock caseStudy={caseStudies[1]}/>
            </div>
            <div className={"border-t-[1px] border-r-[1px] border-main-gray"}>
                <CaseStudyBlock caseStudy={caseStudies[2]}/>
            </div>
            <div className={"border-t-[1px] border-l-[1px] border-main-gray"}>
                <CaseStudyBlock caseStudy={caseStudies[3]}/>
            </div>
        </div>
    </div>
}

function CaseStudyBlock({caseStudy}: { caseStudy: CaseStudy }) {
    return <div className={"flex p-9 items-start gap-12"}>
        <Link href={caseStudy.url} className={"w-[250px] h-[90px] relative"}>
            <Image
                src={`/images/case-studies/${caseStudy.img_url}`}
                alt={caseStudy.name}
                fill
                style={{
                    objectFit: 'scale-down'
                }}
            />
        </Link>
        <div className={"flex flex-col items-start"}>
            <blockquote
                className={"text-[#6c6f7c] italic font-lg mb-6 font-normal"}
            >&quot;{caseStudy.feedback}&quot;</blockquote>

            <Link
                href={caseStudy.url}
                className={"group flex items-center text-main-blue hover:text-hover-main-blue"}
            >
                <span
                    className={"mr-2 group-hover:mr-4 transition-all font-bold text-sm"}
                >
                    Learn More About {caseStudy.name}
                </span>
                <GrLinkNext/>
            </Link>
        </div>
    </div>
}