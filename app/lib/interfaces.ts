export interface FAQItem {
    question: string,
    answer: string
}

export interface Input {
    type: "radio" | "paragraph",
    value?: string,
    key?: string,
    text: string,
    tooltip_enabled?: boolean,
    tooltip_title?: string,
    tooltip_content?: string,
    children?: Input[]
}