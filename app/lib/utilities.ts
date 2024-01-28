import {Recipe} from "@/app/lib/models";
import {
    DAILY_ADDED_CALCIUM,
    DAILY_ADDED_CARBOHYDRATE,
    DAILY_ADDED_CHOLESTEROL, DAILY_ADDED_DIETARY_FIBER,
    DAILY_ADDED_FAT, DAILY_ADDED_IRON, DAILY_ADDED_POTASSIUM,
    DAILY_ADDED_SATURATED_FAT,
    DAILY_ADDED_SODIUM, DAILY_ADDED_SUGAR,
    DAILY_ADDED_VITAMIN_D
} from "@/app/lib/constants";

export function overflowText(text: string, max_length = 30): string {
    if (text.length <= max_length) return text;

    return text.substring(0, max_length) + "...";
}

export function convertToHumanReadableTime(time: number): string {
    let unit = "seconds";

    time = time / 1000;

    if (time > 60) {
        time = time / 60;
        unit = "minute(s)";
    }

    if (time > 60) {
        time = time / 60;
        unit = "hour(s)";
    }

    if (time > 24) {
        time = time / 24;
        unit = "day(s)";
    }

    if (time > 30) {
        time = time / 30;
        unit = "month(s)";
    }

    if (time > 12) {
        time = time / 12;
        unit = "year(s)";
    }

    time = Math.round(time);
    if (time == 0) return "now";

    return `${time} ${unit} ago`;
}

export function getTotalGrams(quantity: number, unit: number, waste: number, recipe: Recipe){
    return parseFloat((quantity * unit * (100 - waste) / 100 * (100 - (recipe.waste || 0)) / 100).toFixed(1))
}

export function getTotalNutrients(recipe: Recipe, param: string){
    if(!recipe.recipe_items) return "0";

    const ssp = recipe.serving_per_package || 1;
    const packages = recipe.packages || 1;
    const value = (recipe.recipe_items?.reduce((sum, item) => {
        let paramValue = 0;
        if(param == "calories"){
            paramValue = parseFloat(item.ingredient.calories) || 0;
        }

        if(param == "fat"){
            paramValue = parseFloat(item.ingredient.fat) || 0;
        }

        if(param == "saturated-fat"){
            paramValue = parseFloat(item.ingredient.saturated_fat) || 0;
        }

        if(param == "trans-fat"){
            paramValue = parseFloat(item.ingredient.trans_fat) || 0;
        }

        if(param == "cholesterol"){
            paramValue = parseFloat(item.ingredient.cholesterol) || 0;
        }

        if(param == "sodium"){
            paramValue = parseFloat(item.ingredient.sodium) || 0;
        }

        if(param == "carbohydrate"){
            paramValue = parseFloat(item.ingredient.carbohydrate) || 0;
        }

        if(param == "dietary-fiber"){
            paramValue = parseFloat(item.ingredient.dietary_fiber) || 0;
        }

        if(param == "sugar"){
            paramValue = parseFloat(item.ingredient.sugar) || 0;
        }

        if(param == "added-sugar"){
            paramValue = parseFloat(item.ingredient.added_sugar) || 0;
        }

        if(param == "protein"){
            paramValue = parseFloat(item.ingredient.protein) || 0;
        }

        if(param == "vitamin-d"){
            paramValue = parseFloat(item.ingredient.vitamin_d) || 0;
        }

        if(param == "calcium"){
            paramValue = parseFloat(item.ingredient.calcium) || 0;
        }

        if(param == "iron"){
            paramValue = parseFloat(item.ingredient.iron) || 0;
        }

        if(param == "potassium"){
            paramValue = parseFloat(item.ingredient.potassium) || 0;
        }

        return sum + paramValue * item.quantity * (100 - (recipe.waste || 0)) / 100;
    }, 0) || 0) / (ssp * packages)

    return value.toFixed(1)
}

export function getDailyNutrients(recipe: Recipe, param: string){
    const totalValue = parseFloat(getTotalNutrients(recipe, param));
    let dailyValue = 1;

    if(param == "fat"){
        dailyValue = DAILY_ADDED_FAT;
    }

    if(param == "saturated-fat"){
        dailyValue = DAILY_ADDED_SATURATED_FAT;
    }

    if(param == "cholesterol"){
        dailyValue = DAILY_ADDED_CHOLESTEROL;
    }

    if(param == "sodium"){
        dailyValue = DAILY_ADDED_SODIUM;
    }

    if(param == "carbohydrate"){
        dailyValue = DAILY_ADDED_CARBOHYDRATE;
    }

    if(param == "dietary-fiber"){
        dailyValue = DAILY_ADDED_DIETARY_FIBER;
    }

    if(param == "added-sugar"){
        dailyValue = DAILY_ADDED_SUGAR;
    }

    if(param == "vitamin-d"){
        dailyValue = DAILY_ADDED_VITAMIN_D;
    }

    if(param == "calcium"){
        dailyValue = DAILY_ADDED_CALCIUM;
    }

    if(param == "iron"){
        dailyValue = DAILY_ADDED_IRON;
    }


    if(param == "potassium"){
        dailyValue = DAILY_ADDED_POTASSIUM;
    }

    return (100 * totalValue / dailyValue).toFixed(1);
}