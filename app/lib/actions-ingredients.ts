export async function create(prevState: void | undefined, formData: FormData) {
    try {
        console.log("prevState:", prevState)
        console.log("formData:", Array.from(formData.entries()));
    } catch (error) {
        console.log("error: ", error)
        throw error;
    }
}