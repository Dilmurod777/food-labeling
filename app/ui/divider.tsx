export default function Divider({height = 1, heightUnits = "px", width=100,widthUnits="%", margin = 10, marginUnits = "px", color = "#000"}) {
    return <div
        className={`w-full`}
        style={{
            height: `${height}${heightUnits}`,
            width: `${width}${widthUnits}`,
            marginTop: `${margin}${marginUnits}`,
            marginBottom: `${margin}${marginUnits}`,
            backgroundColor: color
        }}
    />
}