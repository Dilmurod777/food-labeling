import {IRecipe, Recipe} from "@/app/lib/models";
import Title from "@/app/ui/recipes/recipe-page/title";
import {IoIosArrowForward} from "react-icons/io";
import RecipeLabel from "@/app/ui/labels/recipe-label";
import html2canvas from "html2canvas";


interface Props {
    recipe: Recipe,
    updateRecipe: (data: IRecipe) => void
}

export default function LabelPage({recipe, updateRecipe}: Props) {
    const downloadRecipe = () => {
        const recipeDiv = document.getElementById("recipe-label");
        console.log(recipeDiv)
        if (!recipeDiv) return;

        html2canvas(recipeDiv, {})
            .then((canvas) => {
                const data = canvas.toDataURL('image/png');
                const link = document.createElement('a');

                if (typeof link.download === 'string') {
                    link.href = data;
                    link.download = `${recipe.name}.png`;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    window.open(data);
                }
                // const imgData = canvas.toDataURL('image/png');
                // const pdf = new JsPDF('p', 'mm', 'a4', true);
                // const imgWidth = canvas.width;
                // const imgHeight = canvas.height;
                // pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                // pdf.save(`${recipe.name}.pdf`);
            })
    }

    return <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col items-start"}>
            <Title
                recipe={recipe}
                updateRecipe={updateRecipe}
                editable={false}
            />
        </div>

        <div className={"flex gap-8"}>
            <div className={"flex flex-col gap-4 w-[300px]"}>
                <div
                    className={"flex justify-between items-center px-4 py-3 bg-main-green hover:bg-hover-main-green text-white rounded-md cursor-pointer"}>
                    <span className={"text-base font-bold"}>Label sections</span>
                    <IoIosArrowForward className={"text-xl"}/>
                </div>

                <div
                    className={"flex justify-between items-center px-4 py-3 bg-main-green hover:bg-hover-main-green text-white rounded-md cursor-pointer"}>
                    <span className={"text-base font-bold"}>Label style</span>
                    <IoIosArrowForward className={"text-xl"}/>
                </div>

                <div
                    className={"flex justify-between items-center px-4 py-3 bg-main-green hover:bg-hover-main-green text-white rounded-md cursor-pointer"}>
                    <span className={"text-base font-bold"}>Optional nutrients</span>
                    <IoIosArrowForward className={"text-xl"}/>
                </div>

                <div
                    className={"flex justify-between items-center px-4 py-3 bg-main-green hover:bg-hover-main-green text-white rounded-md cursor-pointer"}>
                    <span className={"text-base font-bold"}>Optional vitamins</span>
                    <IoIosArrowForward className={"text-xl"}/>
                </div>

                <div
                    className={"flex justify-between items-center px-4 py-3 bg-main-green hover:bg-hover-main-green text-white rounded-md cursor-pointer"}>
                    <span className={"text-base font-bold"}>Default label settings</span>
                    <IoIosArrowForward className={"text-xl"}/>
                </div>
            </div>

            <div className={"flex flex-col gap-2 flex-grow"}>
                <p className={"text-lg font-thin"}>Label Type</p>
                <select className={"h-[50px] w-[300px] border-[1px] border-main-gray px-2 py-1"}>
                    <option value="0">New Vertical (default)</option>
                    <option value="1">New Tabular</option>
                    <option value="2">New Linear</option>
                    <option value="3">New As Packaged/As Prepared</option>
                    <option value="4">New Infant (0-12 mths)</option>
                    <option value="5">New Child (1-3 yrs)</option>
                    <option value="6">Canadian New Vertical</option>
                    <option value="7">Canadian New Linear</option>
                    <option value="8">Old Vertical FDA</option>
                    <option value="9">Old Tabular FDA</option>
                    <option value="10">Old Linear FDA</option>
                    <option value="11">Old As Packaged/As Prepared FDA</option>
                    <option value="12">Old Infant (0-2 yrs) FDA</option>
                    <option value="13">Old Child (2-4 yrs) FDA</option>
                </select>

                <RecipeLabel recipe={recipe}/>

                <div className={"w-fit flex flex-col gap-2 items-start bg-[#fafafa] border-[1px] border-main-gray rounded-md px-2 pt-2 pb-10"}>
                    <p className={"text-sm font-bold text-black"}>File Format</p>

                    <select className={"h-[50px] w-[300px] border-[1px] border-main-gray px-2 py-1 text-sm"}>
                        <option value="0">PDF</option>
                        <option value="1">PNG</option>
                        <option value="2">Embed</option>
                    </select>

                    <div
                        className={"self-end bg-main-green hover:bg-hover-main-green px-6 py-2 text-white rounded-md cursor-pointer"}
                        onClick={downloadRecipe}
                    >
                        Download
                    </div>
                </div>
            </div>
        </div>
    </div>
}