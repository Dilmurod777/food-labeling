export interface FAQItem {
    question: string,
    answer: string
}

export interface Input {
    type: "radio" | "paragraph" | "number",
    value?: string,
    key: string,
    text: string,
    checked?: boolean,
    required?: boolean,
    tooltip_enabled?: boolean,
    tooltip_title?: string,
    tooltip_content?: string,
    children?: Input[]
}